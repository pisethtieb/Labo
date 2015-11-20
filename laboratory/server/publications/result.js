// Publication
Meteor.publish('laboratory_result', function (branchId) {
    if (this.userId) {
        var selector = {};
        if (!_.isUndefined(branchId)) {
            selector.cpanel_branchId = branchId;
        }

        return Laboratory.Collection.Result.find(selector, {removed: true});
    }
});

