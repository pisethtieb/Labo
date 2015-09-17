Laboratory.Collection.Staff.before.insert(function (userId, doc){
    debugger;
   var prefix = StateLabo.get('labo');
    // var prefix = doc.branchId + '-';
    doc._id = idGenerator.genWithPrefix(Laboratory.Collection.Staff, prefix, 4);
});