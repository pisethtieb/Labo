// Publication
Meteor.publish('laboratory_staff', function (branchId) {
    if (this.userId) {
        var selector = {};
        if (!_.isUndefined(branchId)) {
            selector.cpanel_branchId = branchId;
        }

        return Laboratory.Collection.Staff.find(selector, {removed: true});
    }
});

Meteor.publish('laboratory_staffById', function (id) {
    if (this.userId) {
        return Laboratory.Collection.Staff.find(id, {removed: true});
    }
});
