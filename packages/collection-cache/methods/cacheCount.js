Mongo.Collection.prototype.cacheCount = function (fieldName, collection, refField) {
    check(fieldName, String);
    check(collection, Mongo.Collection);
    check(refField, String);

    var cacheField = '_' + fieldName;
    var thisCollection = this;
    var refCollection = collection;

    /********** After Insert Reference Collection **********/
    refCollection.after.insert(function (userId, doc) {
        Meteor.defer(function () {
            // Set selector
            var selector = {};
            selector._id = doc[refField];

            //Fields specifier for Mongo.Collection.update
            var fieldsInUpdate = {};
            fieldsInUpdate[cacheField] = 1;

            //console.log('Count->' + refCollection._name + '.after.insert()');

            thisCollection.direct.update(selector, {$inc: fieldsInUpdate});
        });
    });

    /********** After Update Reference Collection **********/
    refCollection.after.update(function (userId, doc, fieldNames, modifier, options) {
        var self = this;

        Meteor.defer(function () {
            modifier.$set = modifier.$set || {};

            //console.log('Count->' + refCollection._name + '.after.update()');

            var selectorDec = {},
                fieldsInUpdateDec = {},
                selectorInc = {},
                fieldsInUpdateInc = {};

            // Check soft remove and restore
            if (_.isUndefined(modifier.$set.removed)) {
                if (_.isUndefined(doc.restoredAt)) {
                    /********** Dec **********/
                    selectorDec._id = self.previous[refField];

                    //Fields specifier of decrease for Mongo.Collection.update
                    fieldsInUpdateDec[cacheField] = -1;

                    thisCollection.direct.update(selectorDec, {$inc: fieldsInUpdateDec});

                    /********** Inc **********/
                    selectorInc._id = modifier.$set[refField];

                    //Fields specifier of decrease for Mongo.Collection.update
                    fieldsInUpdateInc[cacheField] = 1;

                    thisCollection.direct.update(selectorInc, {$inc: fieldsInUpdateInc});
                } else {
                    if (!_.isEmpty(modifier.$set) && _.isUndefined(modifier.$set.restoredAt)) {
                        /********** Dec **********/
                        selectorDec._id = self.previous[refField];

                        //Fields specifier of decrease for Mongo.Collection.update
                        fieldsInUpdateDec[cacheField] = -1;

                        thisCollection.direct.update(selectorDec, {$inc: fieldsInUpdateDec});

                        /********** Inc **********/
                        selectorInc._id = modifier.$set[refField];

                        //Fields specifier of decrease for Mongo.Collection.update
                        fieldsInUpdateInc[cacheField] = 1;

                        thisCollection.direct.update(selectorInc, {$inc: fieldsInUpdateInc});
                    }
                }
            }
        });
    });

    /********** After Remove Reference Collection **********/
    refCollection.after.remove(function (userId, doc) {
        Meteor.defer(function () {
            // Set selector
            var selector = {};
            selector._id = doc[refField];

            //Fields specifier for Mongo.Collection.update
            var fieldsInUpdate = {};
            fieldsInUpdate[cacheField] = -1;

            //console.log('Count->' + refCollection._name + '.after.remove()');

            thisCollection.direct.update(selector, {$inc: fieldsInUpdate});
        });
    });
};