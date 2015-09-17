/*
 Currency
 */
Meteor.publish('cpanel_currency', function () {
    if (this.userId) {
        return Cpanel.Collection.Currency.find();
    }
});
