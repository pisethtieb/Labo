/////**
//// * Created by pisethsomaly on 9/17/15.
//// */
//Laboratory.Collection.Labo.before.insert(function (userId, doc) {
//    var prefix = doc.branchId + '';
//    var id = doc._id;
//    // var prefix = doc.branchId + '-';
//    doc._id = idGenerator.genWithPrefix(Laboratory.Collection.Labo, prefix, 4);
//});
Laboratory.Collection.Labo.before.insert(function (userId, doc) {
    var prefix = StateLabo.get('labo');
    // var prefix = doc.branchId + '-';
    doc._id = idGenerator.genWithPrefix(Laboratory.Collection.Labo, prefix, 8);
});