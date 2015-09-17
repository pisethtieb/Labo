// Publication
Meteor.publish('sample_address', function () {
    if (this.userId) {
        this.unblock();
        return Sample.Collection.Address.find({}, {removed: true});
    }
});
