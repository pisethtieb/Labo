// Publication
Meteor.publish('laboratory_items', function (branchId) {
    if (this.userId) {
        var selector = {};
        if (!_.isUndefined(branchId)) {
            selector.cpanel_branchId = branchId;
        }

        return Laboratory.Collection.Items.find(selector, {removed: true});
    }
});

Meteor.publish('laboratory_itemsById', function (id) {
    if (this.userId) {
        return Laboratory.Collection.Items.find(id, {removed: true});
    }
});
