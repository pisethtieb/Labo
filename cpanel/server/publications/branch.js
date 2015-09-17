/*
 Branch
 */
Meteor.publish('cpanel_branch', function () {
    if (this.userId) {
        Meteor._sleepForMs(1000);
        return Cpanel.Collection.Branch.find();
    } else {
        return [];
    }
});
