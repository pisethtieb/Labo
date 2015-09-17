var indexTpl = Template.laboratory_category,
    insertTpl = Template.laboratory_categoryInsert,
    updateTpl = Template.laboratory_categoryUpdate,
    showTpl = Template.laboratory_categoryShow,
    addressAddonTpl = Template.laboratory_addressInsert;

// Index
indexTpl.onCreated(function () {
    // Create new  alertify
    createNewAlertify(["category", "address"]);
});

indexTpl.onRendered(function () {
    //
});

indexTpl.helpers({
    selector: function () {
        var pattern = Session.get('currentBranch');
        //var pattern = new RegExp("^" + branchId.current.branch);
        return {cpanel_branchId: pattern};
    }
});

indexTpl.events({
    'click .insert': function (e, t) {
        alertify.category(fa("plus", "Category"), renderTemplate(insertTpl))
            .maximize();
    },
    'click .update': function (e, t) {
        var data = Laboratory.Collection.Category.findOne(this._id);
        alertify.category(fa("pencil", "Category"), renderTemplate(updateTpl, data))
            .maximize();
    },
    'click .remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Category"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Laboratory.Collection.Category.softRemove(self._id, function (error) {
                    if (error) {
                        alertify.error(error.message);
                    } else {
                        alertify.success("Success");
                    }
                });
            },
            null
        );

    },
    'click .show': function (e, t) {
        var data = Laboratory.Collection.Category.findOne({_id: this._id});
        data.photoUrl = null;

        if (!_.isUndefined(data.photo)) {
            data.photoUrl = Files.findOne(data.photo).url();
        }

        alertify.alert(fa("eye", "Category"), renderTemplate(showTpl, data));
    }
});

indexTpl.onDestroyed(function () {
    //
});


// Hook
AutoForm.hooks({
    // Category
    laboratory_categoryInsert: {
        before: {
            insert: function (doc) {
                var prefix = Session.get('currentBranch') + '-';
                Meteor.call('labo', prefix);
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
    laboratory_categoryUpdate: {
        onSuccess: function (formType, result) {
            alertify.category().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }

});
