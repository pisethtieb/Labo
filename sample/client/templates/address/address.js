var indexTpl = Template.sample_address,
    insertTpl = Template.sample_addressInsert,
    updateTpl = Template.sample_addressUpdate,
    showTpl = Template.sample_addressShow;

// Index
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Address',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify("address");
});

indexTpl.onRendered(function () {
    //
});

indexTpl.helpers({
    selector: function () {
        return {};
    }
});

indexTpl.events({
    'click .insert': function (e, t) {
        alertify.address(fa("plus", "Address"), renderTemplate(insertTpl));
    },
    'click .update': function (e, t) {
        var data = Sample.Collection.Address.findOne(this._id);
        alertify.address(fa("pencil", "Address"), renderTemplate(updateTpl, data));
    },
    'click .remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Address"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Sample.Collection.Address.softRemove(self._id, function (error) {
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
        var data = Sample.Collection.Address.findOne({_id: this._id});
        alertify.alert(fa("eye", "Address"), renderTemplate(showTpl, data));
    }
});

indexTpl.onDestroyed(function () {
    //
});

// Insert
insertTpl.onRendered(function () {
    //
});

insertTpl.events({
    //
});

// Update
updateTpl.onRendered(function () {
    //
});

updateTpl.events({
    //
});

// Hook
AutoForm.hooks({
    sample_addressInsert: {
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Sample.Collection.Address, 4);
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
    sample_addressUpdate: {
        onSuccess: function (formType, result) {
            alertify.address().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});