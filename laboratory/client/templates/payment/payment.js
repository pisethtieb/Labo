Laboratory.laboState = new ReactiveObj();
Laboratory.ListForLabo = new ReactiveObj();

var indexTpl = Template.laboratory_payment;
var insertTpl = Template.laboratory_paymentInsert;
var updateTpl = Template.laboratory_paymentUpdate;
var showTpl = Template.laboratory_paymentShow;
var laboInfo = Template.laboratory_laboInfo;
var actionPaymentTpl = Template.laboratory_paymentLinkAction;
/**
 * Index
 */
indexTpl.onCreated(function () {
    // Create new  alertify
    createNewAlertify(["payment", "addressAddon"]);
});
/// index helpers
laboInfo.helpers({

    labo: function () {
        var Id = FlowRouter.getParam("laboId");
        var labo = ReactiveMethod.call('findLabo', Id);

        var str = "<table class='table table-bordered'><thead>" +
            "<tr>" +
            "<th>Item ID</th>" +
            "<th>Qty</th>" +
            "<th>Price</th>" +
            "<th>Fee</th>" +
            "<th>Amount</th>" +
            "</tr>" +
            "</thead><tbody>";
        labo.laboItem.forEach(function (o) {
            str += '<tr>' +
                '<td>' + o.itemId + '</td>' +
                '<td>' + o.qty + '</td>' +
                '<td>' + numeral(o.price).format('0,0.00') + 'R </td>' +
                '<td>' + numeral(o.fee).format('0,0.00') + 'R</td>' +
                '<td>' + numeral(o.amount).format('0,0.00') + 'R</td>' +
                '</tr>'
        });
        str += "</tbody></table>";
        labo.items = str;
        return labo;
    },
    laboItems: function () {
        debugger;
        var Id = FlowRouter.getParam("laboId");
        var labo = ReactiveMethod.call('findLabo', Id);
        var str = "<table class='table table-bordered'><thead>" +
            "<tr>" +
            "<th>Item ID</th>" +
            "<th>Qty</th>" +
            "<th>Price</th>" +
            "<th>Fee</th>" +
            "<th>Amount</th>" +
            "</tr>" +
            "</thead><tbody>";
        labo.laboItem.forEach(function (o) {
            str += '<tr>' +
                '<td>' + o.itemId + '</td>' +
                '<td>' + o.qty + '</td>' +
                '<td>' + numeral(o.price).format('0,0.00') + 'R </td>' +
                '<td>' + numeral(o.fee).format('0,0.00') + 'R</td>' +
                '<td>' + numeral(o.amount).format('0,0.00') + 'R</td>' +
                '</tr>'
        });
        str += "</tbody></table>";
        return new Spacebars.SafeString(str);
    }

});
actionPaymentTpl.helpers({
    labo: function () {
        debugger;
        var labo = FlowRouter.getParam("laboId");
        var checkAvailable = Laboratory.Collection.Payment.findOne({laboId: labo}, {sort: {_id: -1}});
        if (checkAvailable.status == 'Full') {
            $('.paymentAction').attr('disabled', true);
        } else {
            $('.paymentAction').attr('disabled', false);
        }
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
    checkAvailable: function () {
        return checkAvailable();
    }
});
// Index events
indexTpl.events({
    'click .btn-link': function (e, t) {
        var self = this;
        checkLastPayment(self);
    },
    'click .insert': function (e, t) {
        //debugger;
        e.preventDefault();
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
            lastPayment.paymentDate = moment().format("YYYY-MM-DD HH:mm:ss");
            alertify.payment(fa("plus", "Payment"),
                renderTemplate(insertTpl, lastPayment));

        } else {
            console.log(data.total);
            doc.laboId = data._id;
            doc.patientId = data.patientId;
            doc.agentId = data.agentId;
            //doc.paymentDate = moment().format("YYYY-MM-DD HH:mm:ss");
            doc.overdueAmount = data.total;
            doc.paidAmount = data.total;
            doc.paymentDate = moment().format("YYYY-MM-DD HH:mm:ss");
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
    // cal balance on payment
    calculateBalance();
});
// Insert events
insertTpl.events({
    'keyup .paidAmount': function () {
        calculateBalance();
    },
    'click #save': function () {
        Session.set('savePrint', false);
    },
    'click #save-print': function () {
        Session.set('savePrint', true);
    },
    'click .printResult': function () {
        Session.set('savePrint', true);
    }
});

/**
 * Update
 */
updateTpl.onRendered(function () {
    datePicker();
});
updateTpl.helpers({
    checkAvailable: function () {

    }
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
            debugger;
            //Meteor.call('getLaboInoviceId',result, function (err, laboId) {
            if (Session.get('savePrint')) {
                var laboId = $('[name="laboId"]').val();
                var url = '/laboratory/labo/invoice/' + laboId;
                window.open(url, '_blank');
            }

            //});
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


    var payment = Laboratory.Collection.Payment.findOne({_id: self._id});
    var checkingLastPayment = Laboratory.Collection.Payment.findOne({laboId: payment.laboId}, {sort: {_id: -1}});

    var lastPaymentId = checkingLastPayment._id;
    console.log(lastPaymentId == self._id);
    if (lastPaymentId == self._id) {
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
//cheack buttion add new for payment
function checkAvailable() {
    debugger;
    var labo = FlowRouter.getParam("laboId");
    var checkAvailable = Laboratory.Collection.Payment.findOne({laboId: labo}, {sort: {_id: -1}});
    if (checkAvailable.status == 'Full') {
        return true
    } else {
        return false
    }
}