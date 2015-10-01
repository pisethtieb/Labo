var indexTpl = Template.laboratory_measure,
    insertTpl = Template.laboratory_measureInsert,
    updateTpl = Template.laboratory_measureUpdate,
    showTpl = Template.laboratory_measureShow,
    addressAddonTpl = Template.laboratory_addressInsert;

// Index
indexTpl.onCreated(function () {
    // Create new  alertify
    createNewAlertify(["measure", "address"]);
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
        alertify.measure(fa("plus", "measure"), renderTemplate(insertTpl))

    },
    'click .update': function (e, t) {
        var data = Laboratory.Collection.Measure.findOne(this._id);
        alertify.measure(fa("pencil", "measure"), renderTemplate(updateTpl, data))

    },
    'click .remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "measure"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Laboratory.Collection.Measure.softRemove(self._id, function (error) {
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
        var data = Laboratory.Collection.Measure.findOne({_id: this._id});
        data.photoUrl = null;

        if (!_.isUndefined(data.photo)) {
            data.photoUrl = Files.findOne(data.photo).url();
        }

        alertify.alert(fa("eye", "measure"), renderTemplate(showTpl, data));
    }
});

indexTpl.onDestroyed(function () {
    //
});

// Insert
insertTpl.onRendered(function () {
    configOnRender();
});

insertTpl.events({
    'click .addressAddon': function (e, t) {
        alertify.address(fa("plus", "Address"), renderTemplate(addressAddonTpl))
    }
});

// Update
updateTpl.onRendered(function () {
    configOnRender();
});

updateTpl.helpers({});

updateTpl.events({
    'click .addressAddon': function (e, t) {
        alertify.address(fa("plus", "Address"), renderTemplate(addressAddonTpl));
    }
});

// Hook
AutoForm.hooks({
    // measure
    laboratory_measureInsert: {
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
    laboratory_measureUpdate: {
        onSuccess: function (formType, result) {
            alertify.measure().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    // Address addon
    laboratory_addressAddon: {
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Laboratory.Collection.Address, 3);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            //alertify.address().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

// Config date picker
var configOnRender = function () {
    // date
    var dob = $('[name="dob"]');
    DateTimePicker.date(dob);

    // Remote select2
    $('[name="addressId"]').select2({
        placeholder: "Search address",
        allowClear: true,
        ajax: {
            url: Router.url('Laboratory.remoteAddress'), // Must be use '/...'
            //url: "/Laboratory/remoteAddress", // Must be use '/...'
            type: "GET",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {term: params};
            },
            results: function (data, page) {
                return {results: data};
            },
            cache: true
        },
        minimumInputLength: 3
    });
};
