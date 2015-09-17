// Config Account UI
Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL",

    //Custom
    requestPermissions: {},
    extraSignupFields: [
        {
            fieldName: 'fullName',
            fieldLabel: 'Full name',
            inputType: 'text',
            visible: true,
            validate: function (value, errorFunction) {
                var fullName = s.trim(value);

                if (!fullName) {
                    errorFunction("Please write your full name");
                    return false;
                } else {
                    return true;
                }
            },
            saveToProfile: true
        }
    ]
});

// Events user login/out
Accounts.onLogin(function () {
    // Set current user id
    Session.setPersistent('currentUserId', Meteor.userId());

    Events.track({
        type: 'Login'
    });
});

accountsUIBootstrap3.logoutCallback = function (error) {
    if (!error) {
        FlowRouter.go('cpanel.welcome');

        Events.track({
            type: 'Logout',
            userId: Session.get('currentUserId')
        });

        // Clear persistent session of user id
        Session.clearPersistent();
    }
};
