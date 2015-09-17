// Declare template
var indexTpl = Template.cpanel_welcome,
    configTpl = Template.cpanel_welcomeConfig;

// Declare state for server date time
var state = new ReactiveObj();

// Index
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Welcome',
        description: 'Description for this page...'
    });
});

indexTpl.helpers({
    role: function () {
        var role = Roles.getGroupsForUser(Meteor.userId());
        if (role.length > 0) {
            return true;
        }

        return false;
    },
    serverDateTime: function () {
        Meteor.setInterval(function () {
            Meteor.call('currentDate', function (error, result) {
                var dateTime = moment(result, 'YYYY-MM-DD H:mm:ss');
                var cssClass = 'info';
                if (dateTime.day == 0 || dateTime.day() == 6) {
                    cssClass = 'warning';
                }
                var dateTimeVal = dateTime.format('dddd D, MMMM YYYY H:mm:ss');

                state.set('cssClass', cssClass);
                state.set('serverDateTime', dateTimeVal);
            });
        }, 1000);

        return {val: state.get('serverDateTime'), css: state.get('cssClass')};
    }
});

// Config
configTpl.helpers({
    value: function () {
        var data = {
            module: Session.get('currentModule'),
            branch: Session.get('currentBranch')
        };
        return data;
    }
});

// Hook
AutoForm.hooks({
    cpanel_welcomeConfig: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            this.event.preventDefault();

            // Set current session
            Session.setAuth('currentModule', insertDoc.module);
            Session.setAuth('currentBranch', insertDoc.branch);

            FlowRouter.go(s.decapitalize(insertDoc.module) + '.home');
            this.done();
        }
    }
});
