Mongo.Collection.prototype.cacheArrayField = function (arrayFields) {
    var cacheArrayField;
    if (!_.isArray(arrayFields)) {
        cacheArrayField = [arrayFields];
    } else {
        cacheArrayField = arrayFields;
    }

    check(cacheArrayField, [String]);

    var thisCollection = this;

    /********** Before Insert This Collection **********/
    thisCollection.before.insert(function (userId, doc) {
        _.each(cacheArrayField, function (field) {
            // Check exist
            if (!_.isUndefined(doc[field])) {
                var items = [];

                _.each(doc[field], function (obj) {
                    if (!_.isNull(obj)) {
                        items.push(obj);
                    }
                });

                doc[field] = items;
            }
        });

        //console.log('ArrayField->' + thisCollection._name + '.before.insert()');
    });

    /********** Before Update This Collection **********/
    thisCollection.before.update(function (userId, doc, fieldNames, modifier, options) {
        modifier.$set = modifier.$set || {};

        _.each(cacheArrayField, function (field) {
            // Check exist
            if (!_.isUndefined(modifier.$set[field])) {
                var items = [];

                _.each(modifier.$set[field], function (obj) {
                    if (!_.isNull(obj)) {
                        items.push(obj);
                    }
                });

                modifier.$set[field] = items;
            }
        });

        //console.log('ArrayField->' + thisCollection._name + '.before.update()');
    });
};