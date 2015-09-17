// Publication
Meteor.publish('sample_customer', function (branchId) {
    if (this.userId) {
        var selector = {};
        if (!_.isUndefined(branchId)) {
            selector.cpanel_branchId = branchId;
        }

        return Sample.Collection.Customer.find(selector, {removed: true});
    }
});

Meteor.publish('sample_customerById', function (id) {
    if (this.userId) {
        return Sample.Collection.Customer.find(id, {removed: true});
    }
});
