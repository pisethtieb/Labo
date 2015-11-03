// Publication
Meteor.publish('cpanel_exchange', function (branchId) {
    if (this.userId) {
        var selector = {};
        if (!_.isUndefined(branchId)) {
            selector.cpanel_branchId = branchId;
        }
    }
});


