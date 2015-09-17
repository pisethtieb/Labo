// Declare template
var indexTpl = Template.cpanel_user,
    insertTpl = Template.cpanel_userInsert,
    updateTpl = Template.cpanel_userUpdate,
    showTpl = Template.cpanel_userShow;

// Index
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'User',
        description: 'Description for this page'
    });
});

indexTpl.onRendered(function () {
    // Create new  alertify
    createNewAlertify("user");
});

indexTpl.events({
    'click .insert': function (e, t) {
        alertify.user(fa("plus", "User"), renderTemplate(insertTpl))
            .maximize();
    },
    'click .update': function (e, t) {
        var id = this._id;
        var data = Meteor.users.findOne(id);

        data.password = 'the same';
        data.confirmPassword = 'the same';

        if (typeof data.emails !== 'undefined') {
            data.email = data.emails[0].address;
        }

        var roles = [];
        var getGroup = Roles.getGroupsForUser(id);
        _.each(getGroup, function (group) {
            var getRole = Roles.getRolesForUser(id, group);
            _.each(getRole, function (role) {
                roles.push(group + ':' + role);
            });
        });

        data.roles = roles;

        alertify.user(fa("pencil", "User"), renderTemplate(updateTpl, data))
            .maximize();
    },
    'click .remove': function (e, t) {
        var id = this._id;

        alertify.confirm(
            fa("remove", "User"),
            "Are you sure to delete [" + this.username + "]?",
            function () {
                Meteor.call('userRemove', id, function (error, result) {
                    if (error) {
                        alertify.error(error.message);
                    } else {
                        alertify.success("Success");
                    }
                });
            },
            null);
    },
    'click .show': function (e, t) {

        // Check email
        if (typeof this.emails !== 'undefined') {
            this.emails = this.emails[0].address;
        } else {
            this.emails = "";
        }

        // Check branch
        if (_.isObject(this.profile.branch)) {
            this.profile.branch = JSON.stringify(this.profile.branch);
        } else {
            this.profile.branch = "";
        }

        // Check roles
        if (_.isObject(this.roles)) {
            this.roles = JSON.stringify(this.roles);
        } else {
            this.roles = "";
        }

        alertify.alert(fa("eye", "User"), renderTemplate(showTpl, this));
    }
});

// Hook
AutoForm.hooks({
    cpanel_userInsert: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            this.event.preventDefault();

            Meteor.call('userInsert', insertDoc, function (error, result) {
                if (error) {
                    alertify.error(error.message);
                }
            });

            this.done();
        },
        onSuccess: function (formType, error) {
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    cpanel_userUpdate: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            this.event.preventDefault();

            Meteor.call('userUpdate', currentDoc._id, insertDoc, function (error, result) {
                if (error) {
                    alertify.error(error.message);
                }
            });

            this.done();
        },
        onSuccess: function (formType, error) {
            alertify.user().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
