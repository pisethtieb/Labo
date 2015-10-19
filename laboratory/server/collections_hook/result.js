Laboratory.Collection.Result.before.insert(function (userId, doc) {
    var prefix = StateLabo.get('labo');
    // var prefix = doc.branchId + '-';
    var id = doc._id;
    doc._id = idGenerator.genWithPrefix(Laboratory.Collection.Result, prefix, 8);
    ReactiveState.set(id, doc._id);
});