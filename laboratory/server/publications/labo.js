// Publication
Meteor.publish('laboratory_labo', function (id) {
    if (this.userId) {
        id = _.isUndefined(id) ? {} : id;
        return Laboratory.Collection.Labo.find(id);
    }
});
// Publication laboByPatient
Meteor.publish('laboratory_laboByPatient', function (patientId) {
    if (this.userId) {
        return Laboratory.Collection.Labo.find({patientId: patientId});
    }

});
// Publication laboByAgent
Meteor.publish('laboratory_laboByAgent', function (agentId) {
    if (this.userId) {
        return Laboratory.Collection.Labo.find({agentId: agentId});
    }

});

