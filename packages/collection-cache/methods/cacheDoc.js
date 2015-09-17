Mongo.Collection.prototype.cacheDoc = function (fieldName, collection, collectionFields, options) {
    check(fieldName, String);
    check(collection, Mongo.Collection);
    check(collectionFields, [String]);

    if (!Match.test(options, Object)) {
        options = {};
    }

    if (Match.test(fieldName, String)) {
        _.defaults(options, {
            cacheField: '_' + fieldName,
            refField: fieldName + 'Id'
        });
    }

    var cacheField = options.cacheField;
    var refField = options.refField;
    var thisCollection = this;
    var refCollection = collection;
    var fieldsToCopy = collectionFields;

    //Fields specifier for Mongo.Collection.find
    var fieldsInFind = {_id: 0};
    _.each(fieldsToCopy, function (field) {
        fieldsInFind[field] = 1;
    });

    /********** This Collection After Insert **********/
    thisCollection.after.insert(function (userId, doc) {
        Meteor.defer(function () {
            // Get reference doc
            var selector = {
                _id: doc[refField]
            };
            var getRefDoc = refCollection.findOne(selector, {fields: fieldsInFind});

            // Check getRefDoc is undefined
            if (!_.isUndefined(getRefDoc)) {
                var fieldsInUpdate = {};
                fieldsInUpdate[cacheField] = getRefDoc;

                thisCollection.direct.update(doc._id, {$set: fieldsInUpdate});
            }

            //console.log('Doc->' + thisCollection._name + '.after.insert()');
        });
    });


    /********** This Collection Before Update **********/
    thisCollection.after.update(function (userId, doc, fieldNames, modifier, options) {
        Meteor.defer(function () {
            modifier.$set = modifier.$set || {};

            // Check ref field is updated
            if (!_.isUndefined(modifier.$set[refField])) {
                // Get new reference doc
                var selector = {
                    _id: modifier.$set[refField]
                };

                var getRefDoc = refCollection.findOne(selector, {fields: fieldsInFind});

                // Check getRefDoc is undefined
                if (!_.isUndefined(getRefDoc)) {
                    var fieldsInUpdate = {};
                    fieldsInUpdate[cacheField] = getRefDoc;

                    thisCollection.direct.update(doc._id, {$set: fieldsInUpdate});
                }
            }

            //console.log('Doc->' + thisCollection._name + '.before.update()');
        });
    });

    /********** Reference Collection After Update **********/
    refCollection.after.update(function (userId, doc, fieldNames, modifier, options) {
        Meteor.defer(function () {
            modifier.$set = modifier.$set || {};

            // Set selector
            var selector = {};
            selector[refField] = doc._id;

            //Fields specifier for Mongo.Collection.update
            var fieldsInUpdate = {};
            fieldsInUpdate[refField] = doc._id;

            // Attach soft remove
            thisCollection.attachBehaviour('softRemovable');
            if (_.isUndefined(doc.removedAt)) {
                if (_.isUndefined(doc.restoredAt)) {
                    thisCollection.update(selector, {$set: fieldsInUpdate}, {multi: true});
                } else {
                    thisCollection.restore(selector);
                }
            } else {
                thisCollection.softRemove(selector);
            }

            //console.log('Doc->' + refCollection._name + '.after.update()');
        });
    });

    /********** Reference Collection After Remove **********/
    refCollection.after.remove(function (userId, doc) {
        Meteor.defer(function () {
            // Set selector
            var selector = {};
            selector[refField] = doc._id;

            thisCollection.remove(selector);

            //console.log('Doc->' + refCollection._name + '.after.remove()');
        });
    });
};