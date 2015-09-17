/**
 * Declare template
 */
var indexTpl = Template.laboratory_patient,
    insertTpl = Template.laboratory_patientInsert,
    updateTpl = Template.laboratory_patientUpdate,
    showTpl = Template.laboratory_patientShow,
    addressAddonTpl = Template.laboratory_addressInsert;

/**
 * Index
 */
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Patient',
        description: 'Description for this page'
    });
    // Create new  alertify
    createNewAlertify(["Patient", "address", "labo"]);
});
indexTpl.helpers({
    selector: function () {
        return {
            cpanel_branchId: Session.get('currentBranch')
        }
    }
});
indexTpl.onRendered(function () {
    //
});

indexTpl.helpers({});

indexTpl.events({
    'click .insert': function (e, t) {
        alertify.Patient(fa("plus", "Patient"), renderTemplate(insertTpl))
            .maximize();
    },
    'click .update': function (e, t) {
        var id = this._id;
        Meteor.call('findPatient', id, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                alertify.Patient(fa("pencil", "Patient"), renderTemplate(
                    updateTpl, data))
                    .maximize();
            }
        });


    },
    'click .remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Patient"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Laboratory.Collection.Patient.softRemove(self._id, function (error) {
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
        var data = Laboratory.Collection.Patient.findOne({
            _id: this._id
        });
        data.photoUrl = null;

        if (!_.isUndefined(data.photo)) {
            data.photoUrl = Files.findOne(data.photo).url();
        }

        alertify.alert(fa("eye", "Patient"), renderTemplate(showTpl, data));
    },
    'dblclick tbody > tr': function (event) {
        var dataTable = $(event.target).closest('table').DataTable();
        var rowData = dataTable.row(event.currentTarget).data();
        Meteor.call('checkLaboForPatient', rowData._id, function (err, result) {
            debugger;
            if (_.isUndefined(result.labo)) {
                alertify.labo(fa('plus', 'Add Labo'),
                    renderTemplate(Template.laboratory_laboInsert, result.id)
                )
                    .maximize();
            } else {
                FlowRouter.go('Laboratory.labo', {
                    patientId: result.id
                });
            }
        });
    },
    'click .laboAction': function () {

        alertify.labo(fa('plus', 'Add Labo'),
            renderTemplate(Template.laboratory_laboInsert, this._id)
        )
            .maximize();

    }
});

indexTpl.onDestroyed(function () {
    //
});

/**
 * Insert
 */
insertTpl.onRendered(function () {
    configOnRender();
});

insertTpl.events({
    'click .addressAddon': function (e, t) {
        alertify.address(fa("plus", "Address"), renderTemplate(
            addressAddonTpl))
    },
    'blur .dob': function (e, t) {
        debugger;
        var dob = $('.dob').val();
        var age = moment().diff(dob, 'years');
        if (age == 0) {
            var underzero = moment().diff(dob, 'months');
            if (underzero == 1 || underzero == 0) {
                $('.age').val('A Month');
            } else {
                $('.age').val(underzero + ' ' + 'Months');
            }
        } else {
            if (age == 1) {
                $('.age').val('A Year');
            } else {
                $('.age').val(age + ' ' + "Years");
            }

        }
    }
});

/**
 * Update
 */
updateTpl.onRendered(function () {
    configOnRender();
});

updateTpl.helpers({});

updateTpl.events({
    'click .addressAddon': function (e, t) {
        alertify.address(fa("plus", "Address"), renderTemplate(
            addressAddonTpl));
    },
    //onChange DoB to calculate
    'blur .dob': function (e, t) {
        debugger;
        var dob = $('.dob').val();
        var age = moment().diff(dob, 'years');
        if (age == 0) {
            var underzero = moment().diff(dob, 'months');
            if (underzero == 1 || underzero == 0) {
                $('.age').val('A Month');
            } else {
                $('.age').val(underzero + ' ' + 'Months');
            }
        } else {
            if (age == 1) {
                $('.age').val('A Year');
            } else {
                $('.age').val(age + ' ' + "Years");
            }

        }
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    // Patient
    laboratory_patientInsert: {
        before: {
            insert: function (doc) {
                var prefix = Session.get('currentBranch') + '-';
                doc._id = idGenerator.genWithPrefix(Laboratory.Collection.Patient,
                    prefix, 4);
                doc.cpanel_branchId = Session.get('currentBranch');
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
    laboratory_patientUpdate: {
        onSuccess: function (formType, result) {
            alertify.Patient().close();
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
    //$('[name="addressId"]').select2({
    //    placeholder: "Search address",
    //    allowClear: true,
    //    ajax: {
    //        url: function (param) {
    //            var url = "/Laboratory/addressRemote/" + param;
    //            return url;
    //        },
    //        type: "GET",
    //        dataType: 'json',
    //        delay: 250,
    //        //data: function (param) {
    //        //    return {term: param};
    //        //},
    //        results: function (data, page) {
    //            return {results: data};
    //        },
    //        cache: true
    //    },
    //    minimumInputLength: 3
    //});
};
