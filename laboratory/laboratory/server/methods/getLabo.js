//Meteor.methods({
//    getPatient: function (id) {
//        return Laboratory.Collection.Patient.findOne(id)
//    }
//});
Meteor.methods({
    findLabo: function (id) {
        return Laboratory.Collection.Labo.findOne(id)
    }
});
