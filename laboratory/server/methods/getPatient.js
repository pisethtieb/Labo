//Meteor.methods({
//    getPatient: function (id) {
//        return Laboratory.Collection.Patient.findOne(id)
//    }
//});
Meteor.methods({
    findPatient: function (id) {
        return Laboratory.Collection.Patient.findOne(id)
    }
});
