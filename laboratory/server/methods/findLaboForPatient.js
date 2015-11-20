Meteor.methods({
    checkLaboForPatient: function (id) {
        var result = Laboratory.Collection.Labo.findOne({patientId: id});
        return {
            labo: result,
            id: id
        }
    }
});