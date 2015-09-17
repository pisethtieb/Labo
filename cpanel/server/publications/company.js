/*
 Company
 */
Meteor.publish('cpanel_company', function () {
    if (this.userId) {
        return Cpanel.Collection.Company.find();
    }
});
