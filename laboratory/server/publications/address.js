// Publication
Meteor.publish('laboratory_address', function () {
    if (this.userId) {
        this.unblock();
        return Laboratory.Collection.Address.find({}, {removed: true});
    }
});
