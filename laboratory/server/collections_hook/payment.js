Laboratory.Collection.Payment.before.insert(function (userId, doc) {
    var prefix = StateLabo.get('labo');
    // var prefix = doc.branchId + '-';
    doc._id = idGenerator.genWithPrefix(Laboratory.Collection.Payment, prefix, 8);
});