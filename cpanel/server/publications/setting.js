/* Setting */
Meteor.publish('cpanel_setting', function () {
    if (this.userId) {
        return Cpanel.Collection.Setting.find();
    }
});
