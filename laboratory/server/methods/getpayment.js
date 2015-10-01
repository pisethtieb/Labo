//Meteor.methods({
//    getPatient: function (id) {
//        return Laboratory.Collection.Patient.findOne(id)
//    }
//});
Meteor.methods({
    findPayment: function (id) {
        return Laboratory.Collection.Payment.findOne(id);
        // lastPayment = Laboratory.Collection.Payment.findOne(id);
        //if (lastPayment.status == 'Full') {
        //    return true;
        //}
        //return false;

    }
});
