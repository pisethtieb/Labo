// Publication
Meteor.publish('laboratory_orderByCustomer', function (customerId) {
    if (this.userId) {
        return Laboratory.Collection.Order.find({zId: customerId}, {removed: true});
    }
});
