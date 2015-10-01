Laboratory.resultState = new ReactiveObj();

var indexTpl = Template.laboratory_result,
    insertTpl = Template.laboratory_resultInsert,
    updateTpl = Template.laboratory_resultUpdate,
    showTpl = Template.laboratory_resultShow,
    patientInfo = Template.laboratory_patientInfo;
// Index
indexTpl.onRendered(function () {
    ///wrong link to other route
    if (FlowRouter.getParam("patientId") == null || FlowRouter.getParam("patientId") == "") {
        FlowRouter.go('result.home');
    }
    createNewAlertify('result');
    createNewAlertify('payment');
});
// Patient Info Helpers
patientInfo.helpers({
    patient: function () {
        var patientId = FlowRouter.getParam("patientId");
        Meteor.subscribe('laboratory_patient');
        var patient = Laboratory.Collection.Patient.findOne({_id: patientId});
        if (!_.isUndefined(patient.photo)) {
            patient.photoUrl = Files.findOne(patient.photo).url();
        } else {
            patient.photoUrl = null;
        }
        return patient;
    }
});
// tabularSelector & getCurrentPatient
indexTpl.helpers({
    resultData: function () {
        var patientId = FlowRouter.getParam('patientId');

        return {
            selector: {patientId: patientId},
            patientId: patientId
        };
    }

});

indexTpl.events({
    'click .insert': function () {
        var patientId = FlowRouter.getParam("patientId");
        if (patientId == null) {
            alertify.result(renderTemplate(insertTpl))
                .set({
                    title: fa("plus", "result")
                })
                .maximize();
        } else {
            alertify.result(renderTemplate(insertTpl, patientId))
                .set({
                    title: fa("plus", "result")
                })
                .maximize();
        }

    },
    'click .update': function () {
        var data = Laboratory.Collection.Result.findOne({_id: this._id});
        //var data = this;
        alertify.result(renderTemplate(updateTpl, data))
            .set({
                title: fa("pencil", "result")
            })
            .maximize();
    },
    'click .remove': function () {
        var id = this._id;
        alertify.confirm("Are you sure to delete [" + id + "] ?")
            .set({
                onok: function (result) {
                    Laboratory.Collection.Result.remove(id, function (error) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            alertify.success("Success");
                        }
                    });
                }

            })
    },
    'click .show': function () {
        var data = Laboratory.Collection.Result.findOne({_id: this._id});
        alertify.alert(renderTemplate(showTpl, data))
            .set({
                title: fa("eye", "result")
            })
    },
    'click .resultPrintAction': function () {

        var date = moment(this.resultDate).format("YYYY-MM-DD");
        var time = moment(this.resultDate).format("HH:mm:ss");

        var url = 'resultReportGen?patient=' + this.patientId + '&resultDate=' + date + '&resultTime=' + time + '&result=' + this._id;
        window.open(url, '_blank');
    },
    'dblclick tbody > tr': function (event) {
        var dataTable = $(event.target).closest('table').DataTable();
        var rowData = dataTable.row(event.currentTarget).data();
        var patientId = FlowRouter.getParam('patientId');
        //check excite on payment
        Meteor.call('checkResultForResult', rowData._id, function (err, result) {

            if (_.isUndefined(result.payment)) {
                var doc = {};
                doc.resultId = rowData._id;
                doc.patientId = rowData.patientId;
                doc.overdueAmount = rowData.total;
                doc.paidAmount = rowData.total;
                doc.paymentDate = moment().format("YYYY-MM-DD HH:mm:ss");
                alertify.payment(fa("plus", "Payment"),
                    renderTemplate(Template.laboratory_paymentInsert, doc));
            } else {
                //result.lastPayment.paymentDate=moment().format("YYYY-MM-DD HH:mm:ss");
                FlowRouter.go('Laboratory.payment', {
                    resultId: result.id, patientId: patientId
                });
            }
        });
    },
    //click to payment
    'click .paymentAction': function () {
        var self = this;
        var lastPayment = Laboratory.Collection.Payment.findOne({resultId: self._id}, {sort: {_id: -1}});
        var doc = {};
        if (!_.isUndefined(lastPayment)) {
            if (lastPayment.outstandingAmoun = "0") {
                lastPayment.paidAmount = lastPayment.outstandingAmount;
                lastPayment.overdueAmount = lastPayment.outstandingAmount;
            } else {
                lastPayment.overdueAmount = lastPayment.outstandingAmount;
                lastPayment.paidAmount = lastPayment.overdueAmount;
            }
            if (lastPayment.status == 'Full') {
                alertify.error('Result[' + self._id + ']  is fully paid! ');
                return false;
            } else {
                lastPayment.paymentDate = moment().format("YYYY-MM-DD HH:mm:ss");
                alertify.payment(fa("plus", "Payment"),
                    renderTemplate(Template.laboratory_paymentInsert, lastPayment));
            }
        } else {
            doc.resultId = self._id;
            doc.patientId = self.patientId;
            doc.overdueAmount = self.total;
            doc.paidAmount = self.total;
            doc.paymentDate = moment().format("YYYY-MM-DD HH:mm:ss");
            alertify.payment(fa("plus", "Payment"),

                renderTemplate(Template.laboratory_paymentInsert, doc));
        }
    }
});
/**
 * Insert
 */
insertTpl.onRendered(function () {
    datepicker();
    createNewAlertify([
        'staffAddon',
        'agentAddon',
        'paymentAction'
    ]);

});
updateTpl.onRendered(function () {
    datepicker();
    createNewAlertify('staffAddon');
    createNewAlertify('agentAddon');
    createNewAlertify('patientAddon');

});


insertTpl.events({
    'change .itemId': function (e) {
        onchangeItem(e);
    },

    'click .btnRemove': function (e) {

        setTimeout(function () {
            var enable = true;
            $('.amount').each(function () {
                var amount = $(this).val() == "" ? 0 : parseFloat($(this).val());
                if (amount == 0) {
                    enable = false;
                    return false;
                }
                enable = true;
            });

            if (enable) {
                $('.btnAdd').attr('disabled', false);
            } else {
                $('.btnAdd').attr('disabled', true);

            }

            calculateTotal();
        }, 300);

    },

    'click .btnAdd': function (e) {
        var thisObj = $(e.currentTarget);
        var itemId = thisObj.parents('div.row').find('.itemId').val();
        var price = thisObj.parents('div.row').find('.price').val();
        var qty = thisObj.parents('div.row').find('.qty').val();

        if (itemId != "" && qty != 0 && price != 0) {
            $('.btnAdd').attr('disabled', false);
        } else {
            $('.btnAdd').attr('disabled', true);
        }

    },

    'keyup .price,.qty, click .price,.qty': function (e) {

        var thisObj = $(e.currentTarget);
        var price = thisObj.parents('div.row').find('.price').val();
        var qty = thisObj.parents('div.row').find('.qty').val();
        var calFee = thisObj.parents('div.row').find('.calFee').val();
        var amount = price * qty;
        var amountFee = calFee * qty;

        thisObj.parents('div.row').find('.amount').val(amount);
        thisObj.parents('div.row').find('.fee').val(amountFee);
        calculateTotal();

        if (price != 0 && qty != 0) {
            $('.btnAdd').removeAttr('disabled');
        } else {
            $('.btnAdd').attr('disabled', "disabled");
        }
    },

    'click .staffAddon': function () {
        alertify.staffAddon(renderTemplate(Template.laboratory_staffInsert))
            .set({
                title: fa("plus", "staff")
            })
    },
    'click .agentAddon': function () {
        alertify.agentAddon(renderTemplate(Template.laboratory_agentInsert))
            .set({
                title: fa("plus", "Agent")
            })
    }
});


/**
 * Update
 */
updateTpl.onRendered(function () {
    //run this function when on update get value for total
    calculateTotal();
});

updateTpl.events({
    'change .itemId': function (e) {
        onchangeItem(e);
    },
    'click .btnRemove': function (e) {

        setTimeout(function () {
            var enable = true;
            $('.amount').each(function () {
                var amount = $(this).val() == "" ? 0 : parseFloat($(this).val());
                if (amount == 0) {
                    enable = false;
                    return false;
                }
                enable = true;
            });
            if (enable) {
                $('.btnAdd').attr('disabled', false);
            } else {
                $('.btnAdd').attr('disabled', true);
            }
            calculateTotal();
        }, 300);
    },
    'keyup .price,.qty, click .price,.qty': function (e) {

        var thisObj = $(e.currentTarget);
        var price = thisObj.parents('div.row').find('.price').val();
        var qty = thisObj.parents('div.row').find('.qty').val();
        var calFee = thisObj.parents('div.row').find('.calFee').val();
        var amount = price * qty;
        var amountFee = calFee * qty;
        thisObj.parents('div.row').find('.amount').val(amount);
        thisObj.parents('div.row').find('.fee').val(amountFee);
        calculateTotal();

        if (price != 0 && qty != 0) {
            $('.btnAdd').removeAttr('disabled');
        } else {
            $('.btnAdd').attr('disabled', "disabled");
        }
    },
    'keyup .price,.qty,click.price,.qty': function (e) {

        var thisObj = $(e.currentTarget);
        var itemId = thisObj.parents('div.row').find('.itemId').val();
        var itemData = Laboratory.Collection.Items.findOne({_id: itemId});
        if (itemData.feeType == 'percent') {
            fee = (itemData.price * itemData.fee) / 100;
        }
        else {
            fee = itemData.fee
        }
        var price = thisObj.parents('div.row').find('.price').val();
        var qty = thisObj.parents('div.row').find('.qty').val();
        var amountFee = fee * qty;
        var amount = price * qty;

        thisObj.parents('div.row').find('.amount').val(amount);
        thisObj.parents('div.row').find('.fee').val(amountFee);
        calculateTotal();

        if (price != 0 && qty != 0) {
            $('.btnAdd').removeAttr('disabled');
        } else {
            $('.btnAdd').attr('disabled', "disabled");
        }
    },
    'click .staffAddon': function () {
        alertify.staffAddon(renderTemplate(Template.laboratory_staffInsert))
            .set({
                title: fa("plus", "staff")
            })
    },
    'click .agentAddon': function () {
        alertify.agentAddon(renderTemplate(Template.laboratory_agentInsert))
            .set({
                title: fa("plus", "Agent")
            })
    }
});

/**
 * Show
 */

showTpl.helpers({
    resultItems: function () {
        var str = "<table class='table table-bordered'><thead>" +
            "<tr>" +
            "<th>Item ID</th>" +
            "<th>Qty</th>" +
            "<th>Price</th>" +
            "<th>Fee</th>" +
            "<th>Amount</th>" +
            "</tr>" +
            "</thead><tbody>";
        this.resultItem.forEach(function (o) {
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

/**
 * Hook
 */
AutoForm.hooks({
    laboratory_resultInsert: {
        before: {
            insert: function (doc) {
                var prefix = Session.get('currentBranch') + '-';
                Meteor.call('result', prefix);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success("Success");
        },
        onError: function (fromType, error) {
            alertify.error(error.message);
        }
    },
    laboratory_resultUpdate: {
        onSuccess: function (formType, result) {

            alertify.result().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
insertTpl.onRendered(function () {
    $('.btnAdd').attr('disbaled', 'deisabled');

})
;

////**
// * Config date picker
// */
var datepicker = function () {
    var resultDate = $('[name="resultDate"]');
    DateTimePicker.dateTime(resultDate);
};
function onchangeItem(e) {
    debugger;
    var thisObj = $(e.currentTarget);
    var itemId = $(e.currentTarget).val();
    if (itemId != "") {
        var itemData = Laboratory.Collection.Items.findOne({_id: itemId});
        $('.btnAdd').attr('disabled', false);
    }
    else {
        thisObj.parents('div.row').find('.price').val(0);
        thisObj.parents('div.row').find('.qty').val(1);
        thisObj.parents('div.row').find('.fee').val(0);
        thisObj.parents('div.row').find('.amount').val(0);
        $('.btnAdd').attr('disabled', true);
        calculateTotal();
    }

    var price = itemData.price;
    var feeType = itemData.feeType;
    if (feeType == 'percent') {
        var fee = (itemData.price * itemData.fee) / 100;
        thisObj.parents('div.row').find('.price').val(price);
        thisObj.parents('div.row').find('.qty').val(1);
        thisObj.parents('div.row').find('.fee').val(fee);
        thisObj.parents('div.row').find('.calFee').val(fee);
        thisObj.parents('div.row').find('.amount').val(price);
        calculateTotal();
    } else {
        var fee = itemData.fee;
        thisObj.parents('div.row').find('.price').val(price);
        thisObj.parents('div.row').find('.qty').val(1);
        thisObj.parents('div.row').find('.fee').val(fee);
        thisObj.parents('div.row').find('.calFee').val(fee);
        thisObj.parents('div.row').find('.amount').val(price);

        calculateTotal();
    }
}
/**
 * Calculate all amount to total
 */
function calculateTotal() {
    //totalAmount
    var total = 0;
    $('.amount').each(function () {
        var amount = $(this).val() == "" ? 0 : parseFloat($(this).val());
        total += amount;
    });
    $('[name="total"]').val(total);
    var decimal_places = 2;
    var decimal_factor = decimal_places === 0 ? 1 : decimal_places * 10;
    $('.total')
        .animateNumber(
        {
            number: total * decimal_factor,
            numberStep: function (now, tween) {
                var floored_number = Math.floor(now) / decimal_factor,
                    target = $(tween.elem);
                if (decimal_places > 0) {
                    // force decimal places even if they are 0
                    floored_number = floored_number.toFixed(decimal_places);
                    // replace '.' separator with ','
                    floored_number = floored_number.toString().replace('.', ',');
                }
                target.text('R' + floored_number);
            }
        },
        200
    );
    //totalAmount
    var totalFee = 0;
    $('.fee').each(function () {
        var fee = $(this).val() == "" ? 0 : parseFloat($(this).val());
        totalFee += fee;
    });
    $('[name="totalFee"]').val(totalFee);

    var decimal_placesF = 2;
    var decimal_factorF = decimal_placesF === 0 ? 1 : decimal_placesF * 10;


    $('.totalFee')
        .animateNumber(
        {
            number: totalFee * decimal_factor,

            numberStep: function (now, tween) {
                var floored_number = Math.floor(now) / decimal_factor,
                    target = $(tween.elem);

                if (decimal_factorF > 0) {
                    // force decimal places even if they are 0
                    floored_number = floored_number.toFixed(decimal_places);

                    // replace '.' separator with ','
                    floored_number = floored_number.toString().replace('.', ',');
                }

                target.text('R' + floored_number);
            }
        },
        200
    );

}
