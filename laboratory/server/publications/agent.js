// Publication
Meteor.publish('laboratory_agent', function (branchId) {
    if (this.userId) {
        var selector = {};
        if (!_.isUndefined(branchId)) {
            selector.cpanel_branchId = branchId;
        }

        return Laboratory.Collection.Agent.find(selector, {removed: true});
    }
});

Meteor.publish('laboratory_agentById', function (id) {
    if (this.userId) {
        return Laboratory.Collection.Agent.find(id, {removed: true});
    }
});
