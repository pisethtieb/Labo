Laboratory.laboState = new ReactiveObj();

var indexTpl = Template.laboratory_labo,
    insertTpl = Template.laboratory_laboInsert,
    updateTpl = Template.laboratory_laboUpdate,
    showTpl = Template.laboratory_laboShow,
    patientInfo = Template.laboratory_patientInfo;
// Index
indexTpl.onRendered(function () {
    ///wrong link to other route
    if (FlowRouter.getParam("patientId") == null || FlowRouter.getParam("patientId") == "") {
        FlowRouter.go('labo.home');
    }
    createNewAlertify('labo');
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
    laboData: function () {
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
            alertify.labo(renderTemplate(insertTpl))
                .set({
                    title: fa("plus", "labo")
                })
                .maximize();
        } else {
            alertify.labo(renderTemplate(insertTpl, patientId))
                .set({
                    title: fa("plus", "labo")
                })
                .maximize();
        }

    },
    'click .update': function () {
        var data = Laboratory.Collection.Labo.findOne({_id: this._id});
        //var data = this;
        alertify.labo(renderTemplate(updateTpl, data))
            .set({
                title: fa("pencil", "labo")
            })
            .maximize();
    },
    'click .remove': function () {
        var id = this._id;

        alertify.confirm(
            fa("remove", "Item"),
            "Are you sure to delete [" + id + "]?",
            function () {
                Laboratory.Collection.Labo.remove(id, function (error) {
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
    'click .show': function () {
        var data = Laboratory.Collection.Labo.findOne({_id: this._id});
        alertify.alert(renderTemplate(showTpl, data))
            .set({
                title: fa("eye", "labo")
            })
    },
    'click .laboPrintAction': function () {

        var date = moment(this.laboDate).format("YYYY-MM-DD");
        var time = moment(this.laboDate).format("HH:mm:ss");

        var url = 'laboReportGen?patient=' + this.patientId + '&laboDate=' + date + '&laboTime=' + time + '&labo=' + this._id;
        window.open(url, '_blank');
    },
    'dblclick tbody > tr': function (event) {
        var dataTable = $(event.target).closest('table').DataTable();
        var rowData = dataTable.row(event.currentTarget).data();
        if (rowData != undefined) {

            var patientId = FlowRouter.getParam('patientId');
            //check excite on payment
            Meteor.call('checkLaboForLabo', rowData._id, function (err, result) {

                if (_.isUndefined(result.payment)) {
                    var doc = {};
                    doc.laboId = rowData._id;
                    doc.patientId = rowData.patientId;
                    doc.overdueAmount = rowData.total;
                    doc.paidAmount = rowData.total;
                    doc.paymentDate = moment().format("YYYY-MM-DD HH:mm:ss");
                    alertify.payment(fa("plus", "Payment"),
                        renderTemplate(Template.laboratory_paymentInsert, doc));
                } else {
                    //result.lastPayment.paymentDate=moment().format("YYYY-MM-DD HH:mm:ss");
                    FlowRouter.go('Laboratory.payment', {
                        laboId: result.id, patientId: patientId
                    });
                }
            });
        }
    },
    //click to payment
    'click .paymentAction': function () {
        var self = this;
        var lastPayment = Laboratory.Collection.Payment.findOne({laboId: self._id}, {sort: {_id: -1}});
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
                alertify.error('Labo[' + self._id + ']  is fully paid! ');
                return false;
            } else {
                lastPayment.paymentDate = moment().format("YYYY-MM-DD HH:mm:ss");
                alertify.payment(fa("plus", "Payment"),
                    renderTemplate(Template.laboratory_paymentInsert, lastPayment));
            }
        } else {
            doc.laboId = self._id;
            doc.patientId = self.patientId;
            doc.overdueAmount = self.total;
            doc.paidAmount = self.total;
            doc.paymentDate = moment().format("YYYY-MM-DD HH:mm:ss");
            alertify.payment(fa("plus", "Payment"),

                renderTemplate(Template.laboratory_paymentInsert, doc));
        }
    },
    'click .result': function () {

        var self = this;
        var hasResult = Laboratory.Collection.Result.findOne({laboId: self._id});
        if (hasResult) {
            var laboId = self._id;
            var patientId = self.patientId;
            debugger
            FlowRouter.go('laboratory.result', {
                laboId: laboId, patientId: patientId
            });
        } else {


            var data = Laboratory.Collection.Labo.findOne(this._id);
            data.laboId = data._id;
            //data.resultData = moment().format("YYYY-MM-DD HH:mm:ss");
            data.laboItem.forEach(function (item) {
                var getChildItem = Laboratory.Collection.Items.findOne(item.itemId);
                if (getChildItem.childItem != null || getChildItem.childItem != undefined) {
                    item.childItem = getChildItem.childItem;
                    getChildItem.childItem.forEach(function (objChildItem) {
                        var prependValue = objChildItem.prependValue = objChildItem.prependValue == null ? '' : objChildItem.prependValue;
                        var appendValue = objChildItem.appendValue = objChildItem.appendValue == null ? '' : objChildItem.appendValue;
                        objChildItem.normalValue = appendValue + '  ' + objChildItem.normalValue + '  ' + prependValue;
                        var prependValue = getChildItem.prependValue = getChildItem.prependValue == null ? '' : getChildItem.prependValue;
                        var appendValue = getChildItem.appendValue = getChildItem.appendValue == null ? '' : getChildItem.appendValue;
                        if (getChildItem.normalValue == null || undefined) {
                            item.normalValue = '';
                        }
                        else {
                            item.normalValue = appendValue + '  ' + getChildItem.normalValue + '  ' + prependValue;
                        }
                        item.name = getChildItem.name;
                    });
                }
                var prependValue = getChildItem.prependValue = getChildItem.prependValue == null ? '' : getChildItem.prependValue;
                var appendValue = getChildItem.appendValue = getChildItem.appendValue == null ? '' : getChildItem.appendValue;
                if (getChildItem.normalValue == null || undefined) {
                    item.normalValue = '';
                }
                else {
                    item.normalValue = appendValue + '  ' + getChildItem.normalValue + '  ' + prependValue;
                }
                item.name = getChildItem.name;


            });

            alertify.labo(fa('plus', 'New Result'), renderTemplate(Template.laboratory_resultInsert, data))
                .maximize();
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
    laboItems: function () {
        var str = "<table class='table table-bordered'><thead>" +
            "<tr>" +
            "<th>Item ID</th>" +
            "<th>Qty</th>" +
            "<th>Price</th>" +
            "<th>Fee</th>" +
            "<th>Amount</th>" +
            "</tr>" +
            "</thead><tbody>";
        this.laboItem.forEach(function (o) {
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
    laboratory_laboInsert: {
        before: {
            insert: function (doc) {
                var prefix = Session.get('currentBranch') + '-';
                Meteor.call('labo', prefix);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            debugger;
            alertify.labo().close();
            alertify.success("Success");
        },
        onError: function (fromType, error) {
            alertify.error(error.message);
        }
    },
    laboratory_laboUpdate: {
        onSuccess: function (formType, result) {
            debugger;
            alertify.labo().close();
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
    var laboDate = $('[name="laboDate"]');
    DateTimePicker.dateTime(laboDate);
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
    debugger;
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
