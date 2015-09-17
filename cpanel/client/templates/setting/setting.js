// Declare template
var indexTpl = Template.cpanel_setting;

// Index
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Setting',
        description: 'Description for this page'
    });
});

indexTpl.helpers({
    data: function () {
        return Cpanel.Collection.Setting.findOne();
    }
});

// Hook
AutoForm.hooks({
    cpanel_setting: {
        onSuccess: function (formType, result) {
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
