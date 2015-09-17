// Publication
Meteor.publish('laboratory_customer', function (branchId) {
    if (this.userId) {
        var selector = {};
        if (!_.isUndefined(branchId)) {
            selector.cpanel_branchId = branchId;
        }

        return Laboratory.Collection.Customer.find(selector, {removed: true});
    }
});

Meteor.publish('laboratory_customerById', function (id) {
    if (this.userId) {
        return Laboratory.Collection.Customer.find(id, {removed: true});
    }
});
