// Publication
Meteor.publish('laboratory_patient', function (branchId) {
    if (this.userId) {
        var selector = {};
        if (!_.isUndefined(branchId)) {
            selector.cpanel_branchId = branchId;
        }

        return Laboratory.Collection.Patient.find(selector, {removed: true});
    }
});

Meteor.publish('laboratory_patientByBranch', function (branchId) {
    if (this.userId) {
        return Laboratory.Collection.Patient.find({cpanel_branchId: branchId});
    }
});
