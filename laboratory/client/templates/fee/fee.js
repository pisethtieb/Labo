Laboratory.laboState = new ReactiveObj();
Laboratory.ListForLabo = new ReactiveObj();
Laboratory.laboState = new ReactiveObj();

var indexTpl = Template.laboratory_fee;
var insertTpl = Template.laboratory_feeInsert;
var updateTpl = Template.laboratory_feeUpdate;
var showTpl = Template.laboratory_feeShow;
var agentInForTpl = Template.laboratory_agentInfo;
/**
 * Index
 */
indexTpl.onCreated(function () {
    // Create new  alertify
    createNewAlertify(["fee", "addressAddon"]);
});

indexTpl.onRendered(function () {
    //
});
// index helpers
agentInForTpl.helpers({
    agent: function () {
        debugger;
        var agentId = FlowRouter.getParam("agentId");
        var agent = Laboratory.Collection.Agent.findOne({_id: agentId});

        if (!_.isUndefined(agent.photo)) {
            agent.photoUrl = Files.findOne(agent.photo).url();
        } else {
            agent.photoUrl = null;
        }
        return agent;
    }
});
indexTpl.helpers({
    agent: function () {
        debugger;
        var agentId = FlowRouter.getParam("agentId");
        var agent = Laboratory.Collection.Agent.findOne({_id: agentId});
        if (!_.isUndefined(agent.photo)) {
            agent.photoUrl = Files.findOne(agent.photo).url();
        } else {
            agent.photoUrl = null;
        }
        return agent;
    },

    tabularSelector: function () {
        var id = FlowRouter.getParam("agentId");
        return {agentId: id};
    }

});
// Index events
indexTpl.events({
    'click .insert': function (e, t) {
        alertify.fee(fa("plus", "Fee"),
            renderTemplate(insertTpl))
    },
    'click .update': function (e, t) {
        var data = Laboratory.Collection.Fee.findOne(this._id);
        alertify.fee(fa("pencil", 'Fee'), renderTemplate(updateTpl, data));
    },
    'click .remove': function (e, t) {
        var id = this._id;
        alertify.confirm(
            fa("remove", "Fee"),
            "Are you sure to delete [" + id + "]?",
            function () {
                Laboratory.Collection.Fee.remove(id, function (error) {
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
        var data = Laboratory.Collection.Fee.findOne({_id: this._id});
        alertify.alert(fa("eye", "Fee"), renderTemplate(showTpl, data));
    },
    'click .btn-link': function () {
        var self = this;
        checkLastFee(self);
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
    },
    'change .laboId': function (e) {
        debugger;
        var laboId = $(e.currentTarget).val();
        //onChangeLaboId(e);
        var totalFee = Laboratory.Collection.Labo.findOne({_id: laboId}).totalFee;
        Laboratory.Collection.Labo.find({_id: laboId}).forEach(function (obj) {
            var fee = Laboratory.Collection.Fee.findOne({
                    testId: obj._id
                },
                {
                    sort: {
                        _id: -1
                    }
                });
            if (fee != null && fee.outstandingAmount > 0 && fee.status == "Partial") {
                $('.overdueAmount').val(fee.outstandingAmount);
                $('.paidAmount').val(fee.outstandingAmount);
            } else if (fee == null) {
                $('.overdueAmount').val(totalFee);
                $('.paidAmount').val(totalFee);
            }
        });
    }
});
insertTpl.helpers({
    agent: function () {
        debugger;
        var agentId = FlowRouter.getParam("agentId");
        var agent = Laboratory.Collection.Agent.findOne({_id: agentId});
        return agent;
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
    laboratory_feeInsert: {
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
            alertify.fee().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    laboratory_feeUpdate: {
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
            alertify.fee().close();
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
    var feeDate = $('[name="feeDate"]');
    DateTimePicker.dateTime(feeDate);
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
function checkLastFee(self) {
    debugger;
    var checkingLastFee = Laboratory.Collection.Fee.findOne({laboId: self.laboId}, {sort: {_id: -1}})._id;
    if (checkingLastFee == self._id) {
        $('.updateFee').show();
        $('.removeFee').show();
    } else {
        $('.updateFee').hide();
        $('.removeFee').hide();
    }
}
// calculate Balance
function calculateBalance() {
    var overdueAmount = $('.overdueAmount').val();
    var paidAmount = $('.paidAmount').val();
    var balance = math.round(overdueAmount - paidAmount, 2);
    $('.balance').val(balance);
}