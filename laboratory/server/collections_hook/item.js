Laboratory.Collection.Items.before.insert(function (userId, doc) {
    var prefix = StateLabo.get('labo');
    // var prefix = doc.branchId + '-';
    doc._id = idGenerator.genWithPrefix(Laboratory.Collection.Items, prefix, 6);
});