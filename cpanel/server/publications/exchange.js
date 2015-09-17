/* Exchange */
Meteor.publish('cpanel_exchange', function () {
    if (this.userId) {
        return Cpanel.Collection.Exchange.find();
    }
});
