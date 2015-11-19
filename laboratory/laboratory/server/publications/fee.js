// Publication
Meteor.publish('laboratory_fee', function (branchId) {
    if (this.userId) {
        var selector = {};
        if (!_.isUndefined(branchId)) {
            selector.cpanel_branchId = branchId;
        }
        return Laboratory.Collection.Fee.find(selector, {removed: true});
    }
});
Meteor.publish('laboratory_feeByAgent', function (agentId) {
    if (this.userId) {
        return Laboratory.Collection.Fee.find({agentId: agentId});
    }
});
