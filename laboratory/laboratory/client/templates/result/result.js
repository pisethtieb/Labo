Laboratory.resultState = new ReactiveObj();

var indexTpl = Template.laboratory_result,
    insertTpl = Template.laboratory_resultInsert,
    updateTpl = Template.laboratory_resultUpdate,
    showTpl = Template.laboratory_resultShow,
    patientInfo = Template.laboratory_patientInfo;
// Index
indexTpl.onRendered(function () {
    createNewAlertify('result');
    createNewAlertify('payment');
});

// Patient Info Helpers
//tabularSelector & getCurrentPatient
indexTpl.helpers({
    resultData: function () {
        var laboId = FlowRouter.getParam('laboId');
        return {
            selector: {laboId: laboId},
            laboId: laboId

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
    console.log(this.data);
    datepicker();
    createNewAlertify([
        'staffAddon'
    ]);
});
updateTpl.onRendered(function () {
    Session.set('arrValue', this.data);
    console.log(this.data);
    datepicker();
    createNewAlertify([
        'staffAddon'
    ]);
});
insertTpl.events({
    'click .staffAddon': function () {
        alertify.staffAddon(renderTemplate(Template.laboratory_agentInsert))
            .set({
                title: fa("plus", "Agent")
            })
    },
    'click #save': function () {
        Session.set('savePrint', false);
    },
    'click #save-print': function () {
        Session.set('savePrint', true);
    },
    'click .printResult': function () {
        Session.set('savePrint', true);
    },
    'change .checkBold': function () {
        alert($('.checkBold').val());
        //if ($('.checkBold').checked) {
        //        alert('yes');
        //    $('.result').css('font-weight', 'Bold');
        //} else {
        //    alert('no');
        //    $('.result').css('font-weight', 'normal');
        //}
    }
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
insertTpl.helpers({
    resultDate: function () {
        var data = Session.get('arrValue');
        return data.resultData;
    }
});
updateTpl.helpers({
    resultDate: function () {
        var data = Session.get('arrValue');
        return data.resultData;
    }
});
updateTpl.events({
    'click .remove': function () {
        var id = this._id;
        alertify.confirm("Are you sure to delete [" + id + "] ?")
            .set({
                onok: function (result) {
                    Laboratory.Collection.Result.remove(id, function (error) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            alertify.labo().close();
                            alertify.success("Success");

                        }
                    });
                }
            })
    }
});
Template.laboResultObjectField.helpers({
    checkVal: function (currentObj) {
        var index = currentObj.itemId.split('.');
        var data = Session.get('arrValue');
        if (data) {

            if (data.laboItem[index[1]].normalValue != null) {
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
            "<th>Name</th>" +
            "<th>normalValue</th>" +
            "<th>Result</th>" +
            "</tr>" +
            "</thead><tbody>";
        this.laboItem.forEach(function (o) {

            if (o.normalValue == null) {
                var childItemStr = '<table class="table"><thead>' +
                    '<th>Name</th>' +
                    '<th>NValue</th>' +
                    '<th>Result</th>' +
                    '</thead><tbody>';
                debugger;
                o.childItem.forEach(function (child) {
                    childItemStr +=
                        '<tr>' +
                        '<td>' + child.name + '</td>' +
                        '<td>' + child.normalValue + '</td>' +
                        '<td>' + child.result + '</td>' +
                        '</tr>'
                });
                childItemStr += '</tbody></table>'
                str += '<tr>' +
                    '<td>' + o.itemId + '</td>' +
                    '<td>' + o.name + '</td>' +
                    '<td colspan="2">' + childItemStr + '</td>' +

                    '</tr>'

            } else {
                str += '<tr>' +
                    '<td>' + o.itemId + '</td>' +
                    '<td>' + o.name + '</td>' +
                    '<td>' + o.normalValue + '</td>' +
                    '<td>' + o.result + '</td>' +
                    '</tr>'
            }

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
        onSuccess: function (formType, id) {
            alertify.labo().close();
            alertify.success("Success");
            Meteor.call('getResultId', id, function (err, result) {
                var res = Laboratory.Collection.Result.findOne(result);
                var laboId = res.laboId;

                var patientId = res.patientId;
                if (Session.get('savePrint')) {
                    var url = '/laboratory/result/print/' + result;
                    window.open(url, '_blank');
                    //} else {
                    //    FlowRouter.go('laboratory.result',
                    //        {
                    //            laboId: laboId, patientId: patientId
                    //        }
                    //    );
                }
                debugger;
            });
        },
        onError: function (fromType, error) {
            alertify.error(error.message);
        }
    },
    laboratory_resultUpdate: {
        onSuccess: function (formType, result) {

            alertify.labo().close();
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
