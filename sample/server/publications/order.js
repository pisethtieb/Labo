// Publication
Meteor.publish('sample_orderByCustomer', function (customerId) {
    if (this.userId) {
        return Sample.Collection.Order.find({customerId: customerId}, {removed: true});
    }
});
