Laboratory.Collection.Category.before.insert(function (userId, doc){
   var prefix = StateLabo.get('labo');
    // var prefix = doc.branchId + '-';
    doc._id = idGenerator.genWithPrefix(Laboratory.Collection.Category, prefix, 4);
});