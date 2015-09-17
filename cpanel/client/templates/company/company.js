// Declare template
var indexTpl = Template.cpanel_company,
    updateTpl = Template.cpanel_companyUpdate;

// Index
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Company',
        description: 'Description for this page'
    });
});

indexTpl.onRendered(function () {
    // Create new  alertify
    createNewAlertify("company");
});

indexTpl.helpers({
    data: function () {
        return Cpanel.Collection.Company.findOne();
    }
});

indexTpl.events({
    'click .update': function (e, t) {
        var data = Cpanel.Collection.Company.findOne();

        alertify.company(fa("pencil", "Company"), renderTemplate(updateTpl, data))
            .maximize();
    }
});

// Hook
AutoForm.hooks({
    cpanel_companyUpdate: {
        onSuccess: function (formType, result) {
            alertify.company().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
