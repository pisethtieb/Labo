// Publication
Meteor.publish('laboratory_payment', function (branchId) {
    if (this.userId) {
        var selector = {};
        if (!_.isUndefined(branchId)) {
            selector.cpanel_branchId = branchId;
        }

        return Laboratory.Collection.Payment.find(selector);
    }
});

Meteor.publish('laboratory_paymentByLabo', function (laboId) {
    if (this.userId) {
        return Laboratory.Collection.Payment.find({laboId: laboId});
    }
});
