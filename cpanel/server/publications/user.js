/*
 User
 */
Meteor.publish('cpanel_user', function () {
    return Meteor.users.find();
});

/*
 Roles
 */
Meteor.publish(null, function () {
    return Meteor.roles.find();
});
