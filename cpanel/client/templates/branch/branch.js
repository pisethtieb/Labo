// Declare template
var indexTpl = Template.cpanel_branch,
    insertTpl = Template.cpanel_branchInsert,
    updateTpl = Template.cpanel_branchUpdate,
    showTpl = Template.cpanel_branchShow;

// Index
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Branch',
        description: 'Description for this page'
    });
});

indexTpl.onRendered(function () {
    // Create new  alertify
    createNewAlertify("branch");
});

indexTpl.events({
    'click .insert': function (e, t) {
        alertify.branch(fa("plus", "Branch"), renderTemplate(insertTpl))
            .maximize();
    },
    'click .update': function (e, t) {
        var data = Cpanel.Collection.Branch.findOne(this._id);
        alertify.branch(fa("pencil", "Branch"), renderTemplate(updateTpl, data))
            .maximize();
    },
    'click .remove': function (e, t) {
        var id = this._id;

        alertify.confirm(
            fa("remove", "Branch"),
            "Are you sure to delete [" + id + "]?",
            function () {
                Cpanel.Collection.Branch.remove(id, function (error) {
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
        var data = Cpanel.Collection.Branch.findOne(this._id);
        alertify.alert(fa("eye", "Branch"), renderTemplate(showTpl, data));
    }
});

// Hook
AutoForm.hooks({
    cpanel_branchInsert: {
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Cpanel.Collection.Branch, 3);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    cpanel_branchUpdate: {
        onSuccess: function (formType, result) {
            alertify.branch().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
