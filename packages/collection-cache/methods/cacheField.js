Mongo.Collection.prototype.cacheField = function (fieldName, collectionFields, valueFunction) {
    var value;
    if (_.isUndefined(valueFunction)) {
        value = function (doc, fields) {
            var glue = ', ';

            return _.compact(_.map(fields, function (field) {
                return doc[field];
            })).join(glue);
        };
    } else {
        value = valueFunction;
    }

    check(fieldName, String);
    check(collectionFields, [String]);
    check(value, Function);


    var cacheField = '_' + fieldName;
    var thisCollection = this;

    /********** Before Insert This Collection **********/
    thisCollection.before.insert(function (userId, doc) {

        doc[cacheField] = value(doc, collectionFields);

        //console.log('Field->' + thisCollection._name + '.before.insert()');
    });

    /********** Before Update This Collection **********/
    thisCollection.before.update(function (userId, doc, fieldNames, modifier, options) {
        modifier.$set = modifier.$set || {};

        modifier.$set[cacheField] = value(modifier.$set, collectionFields);

        //console.log('Field->' + thisCollection._name + '.before.update()');
    });
};