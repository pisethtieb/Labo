Laboratory.resultState = new ReactiveObj();

var indexTpl = Template.laboratory_result,
    insertTpl = Template.laboratory_resultInsert,
    updateTpl = Template.laboratory_resultUpdate,
    showTpl = Template.laboratory_resultShow,
    patientInfo = Template.laboratory_patientInfo;
// Index
indexTpl.onRendered(function () {
    ///wrong link to other rout
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
 //tabularSelector & getCurrentPatient
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
        var data = Laboratory.Collection.Result.findOne({_id: this._id});
        //var data = this;
        alertify.result(renderTemplate(insertTpl, data))
            .set({
                title: fa("pencil", "result")
            })
            .maximize();

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
    }


});    //click to payment
/**
 * Insert
 */
insertTpl.onRendered(function () {
    Session.set('arrValue', this.data);
    datepicker();
    createNewAlertify([
        'staffAddon'
    ]);
    //var cheackHidennShow = this.data.laboItem;
    //cheackHidennShow.forEach(function (object) {
    //    var yesNo = object.normalValue;
    //    setTimeout(function (yesNo) {
    //
    //            debugger;
    //
    //            if (yesNo == null) {
    //                $('.hiddenItemNo').hide();
    //            }
    //        },
    //        200);
    //});

});

updateTpl.onRendered(function () {
    debugger;
    datepicker();
    createNewAlertify('staffAddon');
});
/**
 * Update
 */
updateTpl.onRendered(function () {
    //run this function when on update get value for total
    calculateTotal();
});
/**
 * Show
 */

Template.laboResultObjectField.helpers({
    checkVal: function (currentObj) {
        var index = currentObj.itemId.split('.');
        var data = Session.get('arrValue');

        if (data) {
            if (data.laboItem[index[1]].normalValue != '') {
                return true;
            }
            return false;
        }

    }

});
indexTpl.onDestroyed(function () {
    Session.set('arrValue', undefined);
});

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
indexTpl.onDestroyed(function () {
    Session.set('arrValue', undefined);
});


/**
 * Hook
 */
AutoForm.hooks({
    laboratory_resultInsert: {
        before: {
            insert: function (doc) {
                var prefix = Session.get('currentBranch') + '-';
                Meteor.call('labo', prefix);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.labo().close();
            alertify.success("Success");
            FlowRouter.go('laboratory.result');
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
