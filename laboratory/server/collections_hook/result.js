Laboratory.Collection.Result.before.insert(function (userId, doc) {
    var prefix = StateLabo.get('labo');
    // var prefix = doc.branchId + '-';
    doc._id = idGenerator.genWithPrefix(Laboratory.Collection.Result, prefix, 8);
});