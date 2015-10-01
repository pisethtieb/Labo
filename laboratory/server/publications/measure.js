// Publication
Meteor.publish('laboratory_measure', function (branchId) {
    if (this.userId) {
        var selector = {};
        if (!_.isUndefined(branchId)) {
            selector.cpanel_branchId = branchId;
        }
        return Laboratory.Collection.Measure.find(selector, {removed: true});
    }
});

