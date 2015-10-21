// Publication
Meteor.publish('laboratory_category', function (branchId) {
    if (this.userId) {
        var selector = {};
        if (!_.isUndefined(branchId)) {
            selector.cpanel_branchId = branchId;
        }

        return Laboratory.Collection.Category.find(selector, {removed: true});
    }
});

