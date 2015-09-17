Meteor.startup(function () {
    if (Meteor.users.find().count() == 0) {
        // Insert super
        var id = Accounts.createUser(
            {
                username: 'super',
                email: 'rabbit_tc@gmail.com',
                password: 'super123',
                profile: {
                    fullName: 'Rabbit TC'
                }
            }
        );
        Roles.addUsersToRoles(id, ['super'], 'Cpanel');
        Meteor.users.update({_id: id}, {$set: {rolesBranch: ['001']}});
    }
});