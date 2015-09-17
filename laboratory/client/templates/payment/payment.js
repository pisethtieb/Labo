Laboratory.laboState = new ReactiveObj();
Laboratory.ListForLabo = new ReactiveObj();

var indexTpl = Template.laboratory_payment;
var insertTpl = Template.laboratory_paymentInsert;
var updateTpl = Template.laboratory_paymentUpdate;
var showTpl = Template.laboratory_paymentShow;
var laboInfo = Template.laboratory_laboInfo;
/**
 * Index
 */
indexTpl.onCreated(function () {
    // Create new  alertify
    createNewAlertify(["payment", "addressAddon"]);
});

indexTpl.onRendered(function () {
    //
});
// index helpers
laboInfo.helpers({
    patient: function () {
        var id = FlowRouter.getParam("laboId");
        console.log(id);
        var patient = Laboratory.Collection.Labo.findOne(id);
        patient.photoUrl = Files.findOne(patient._patient.photo).url();
        console.log(patient.photoUrl);
        return patient;
    }
});
indexTpl.helpers({
    tabularSelector: function () {
        var id = FlowRouter.getParam("laboId");
        console.log(id);
        return {laboId: id};
    },
    labo: function () {
        return getCurrentLabo();
    },
    paymentData: function () {
        var patientId = FlowRouter.getParam('patientId');
        var laboId = FlowRouter.getParam('laboId');

        return {
            selector: {laboId: laboId},
            patientId: patientId,
            laboId: laboId
        };
    }
});
// Index events
indexTpl.events({
    'click .insert': function (e, t) {
        //debugger;
        var laboId = FlowRouter.getParam("laboId");
        var data = Laboratory.Collection.Labo.findOne(laboId);
        var lastPayment = Laboratory.Collection.Payment.findOne({
                laboId: laboId
            },
            {sort: {_id: -1}}
        );
        var doc = {};
        if (!_.isUndefined(lastPayment)) {
            if (lastPayment.outstandingAmoun = "0") {
                lastPayment.paidAmount = lastPayment.outstandingAmount;
                lastPayment.overdueAmount = lastPayment.outstandingAmount;
            } else {
                lastPayment.overdueAmount = lastPayment.outstandingAmount;
                lastPayment.paidAmount = lastPayment.overdueAmount;
            }

            alertify.payment(fa("plus", "Payment"),
                renderTemplate(insertTpl, lastPayment));

        } else {
            console.log(data.total);
            doc.laboId = data._id;
            doc.patientId = data.patientId;
            doc.paymentDate = moment().format("YYYY-MM-DD HH:mm:ss");
            doc.overdueAmount = data.total;
            doc.paidAmount = data.total;
            alertify.payment(fa("plus", "Payment"),
                renderTemplate(insertTpl, doc));


        }
    },
    'click .update': function (e, t) {
        var data = Laboratory.Collection.Payment.findOne(this._id);
        alertify.payment(fa("pencil", "Payment"), renderTemplate(updateTpl, data));
    },
    'click .remove': function (e, t) {
        var id = this._id;
        alertify.confirm(
            fa("remove", "Payment"),
            "Are you sure to delete [" + id + "]?",
            function () {
                Laboratory.Collection.Payment.remove(id, function (error) {
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
        var data = Laboratory.Collection.Payment.findOne({_id: this._id});
        alertify.alert(fa("eye", "Payment"), renderTemplate(showTpl, data));
    },
    'click .btn-link': function () {
        var self = this;
        checkLastPayment(self);
    }
});

indexTpl.onDestroyed(function () {
    //
});

/**
 * Insert
 */
insertTpl.onRendered(function () {
    datePicker();
});
// Insert events
insertTpl.events({
    'keyup .paidAmount': function () {
        calculateBalance();
    }
});

/**
 * Update
 */
updateTpl.onRendered(function () {
    datePicker();
});
// Update events
updateTpl.events({
    'keyup .paidAmount': function () {
        calculateBalance();
    }
});
/**
 * Hook
 */
AutoForm.hooks({
    // Payment
    laboratory_paymentInsert: {
        before: {
            insert: function (doc) {
                //var overdueAmount = laboratory.Collection.Payment.findOne({_id: this}).overdueAmount;
                doc.outstandingAmount = doc.overdueAmount - doc.paidAmount;
                if (doc.paidAmount == doc.overdueAmount) {
                    doc.status = 'Full';
                } else {
                    doc.status = 'Partial';
                }
                var prefix = Session.get('currentBranch') + '-';
                Meteor.call('labo', prefix);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.payment().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    laboratory_paymentUpdate: {
        before: {
            update: function (doc) {
                doc.$set.outstandingAmount = doc.$set.overdueAmount - doc.$set.paidAmount;
                if (doc.$set.outstandingAmount == 0) {
                    doc.$set.status = 'Full';
                } else {
                    doc.$set.status = 'Partial';
                }
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.payment().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
/**
 * Config date picker
 */
var datePicker = function () {
    var paymentDate = $('[name="paymentDate"]');
    DateTimePicker.dateTime(paymentDate);
};
//onchangeSaleId
function onChangelaboId(e) {
    var laboId = $(e.currentTarget).val();
    if (laboId == '') {
        $('.overdueAmount').val('');
        $('.paidAmount').val('');
    }
}
//check OnAction
function checkLastPayment(self) {
    var checkingLastPayment = Laboratory.Collection.Payment.findOne({laboId: self.laboId}, {sort: {_id: -1}});
    var lastPayment = checkingLastPayment.paymentDate;

    if (lastPayment == self.paymentDate) {
        $('.updatePayment').show();
        $('.removePayment').show();
    } else {
        $('.updatePayment').hide();
        $('.removePayment').hide();
    }
}

// calculate Balance
function calculateBalance() {
    var overdueAmount = $('.overdueAmount').val();
    var paidAmount = $('.paidAmount').val();
    var balance = math.round(overdueAmount - paidAmount, 2);
    $('.balance').val(balance);
}
// getCurrentLabo
var getCurrentLabo = function () {
    var id = FlowRouter.getParam('laboId');

    var data = Laboratory.Collection.Labo.findOne(id);
    if (!_.isUndefined(data._patient.photo)) {
        data.photoUrl = Files.findOne(data._patient.photo).url();
    } else {
        data.photoUrl = null;
    }
    return data;
};
