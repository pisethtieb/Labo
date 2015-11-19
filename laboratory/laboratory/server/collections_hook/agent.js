Laboratory.Collection.Agent.before.insert(function (userId, doc) {

    console.log(doc._id);
    var id = doc._id;
    var prefix = StateLabo.get('labo');
    // var prefix = doc.branchId + '-';
    doc._id = idGenerator.genWithPrefix(Laboratory.Collection.Agent, prefix, 4);
    //State.set(id, doc);
    

});