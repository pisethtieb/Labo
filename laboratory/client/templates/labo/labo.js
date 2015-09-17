Laboratory.laboState = new ReactiveObj();

var indexTpl = Template.laboratory_labo,
    insertTpl = Template.laboratory_laboInsert,
    updateTpl = Template.laboratory_laboUpdate,
    showTpl = Template.laboratory_laboShow,
    patientInfo = Template.laboratory_patientInfo;
// Index
indexTpl.onRendered(function () {
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
        var patient = ReactiveMethod.call('findPatient', patientId)
        patient.photoUrl = Files.findOne(patient.photo).url();
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
        alertify.payment(renderTemplate(updateTpl, data))
            .set({
                title: fa("pencil", "labo")
            })
            .maximize();
    },
    'click .remove': function () {
        var id = this._id;
        alertify.confirm("Are you sure to delete [" + id + "] ?")
            .set({
                onok: function (result) {
                    Laboratory.Collection.Labo.remove(id, function (error) {
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
        var data = Laboratory.Collection.Labo.findOne({_id: this._id});
        alertify.alert(renderTemplate(showTpl, data))
            .set({
                title: fa("eye", "labo")
            })
    },
    'click .laboPrintAction': function () {
        debugger;
        var date = moment(this.laboDate).format("YYYY-MM-DD");
        var time = moment(this.laboDate).format("HH:mm:ss");

        var url = 'laboReportGen?patient=' + this.patientId + '&laboDate=' + date + '&laboTime=' + time + '&labo=' + this._id;
        window.open(url, '_blank');
    },
    'dblclick tbody > tr': function (event) {
        var dataTable = $(event.target).closest('table').DataTable();
        var rowData = dataTable.row(event.currentTarget).data();
        var patientId = FlowRouter.getParam('patientId');
        rowData.paymentDate = moment().format('YYYY-MM-DD H:mm:ss');

        Meteor.call('checkLaboForLabo', rowData._id, function (err, result) {
            debugger;
            if (_.isUndefined(result.payment)) {
                alertify.payment(fa('plus', 'Add Labo'),
                    renderTemplate(Template.laboratory_paymentInsert, rowData)
                )
                    .maximize();
            } else {
                FlowRouter.go('Laboratory.payment', {
                    laboId: result.id, patientId: patientId
                });
            }
        });
    },
    'click .paymentAction': function () {

        //var patientId = FlowRouter.getParam('patientId');
        //var laboId = this._id;
        this.paymentDate = moment().format('YYYY-MM-DD H:mm:ss');
        alertify.payment(fa('plus', 'Add Labo'),
            renderTemplate(Template.laboratory_paymentInsert, this)
        )
            .maximize()

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
        'patientAddon',
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
        var fee = thisObj.parents('div.row').find('.fee').val();
        var amount = price * qty;
        thisObj.parents('div.row').find('.amount').val(amount);
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
    },
    'click .patientAddon': function () {
        alertify.patientAddon(renderTemplate(Template.laboratory_patientInsert))
            .set({
                title: fa("plus", "Patient")
            })
    }
});


/**
 * Update
 */
updateTpl.onRendered(function () {
    //datepicker();

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

    'click .btnAdd': function (e) {
        var thisObj = $(e.currentTarget);
        var itemId = thisObj.parents('div.row').find('.itemId').val();
        var price = thisObj.parents('div.row').find('.price').val();
        var qty = thisObj.parents('div.row').find('.qty').val();

        if (itemId != "" && qty != 0 && price != 0) {
            $('.btnAdd').removeAttr('disabled');
        } else {
            $('.btnAdd').attr('disabled', "disabled");
        }
    },
    'keyup .price,.qty,click.price,.qty': function (e) {
        var thisObj = $(e.currentTarget);
        var price = thisObj.parents('div.row').find('.price').val();
        var qty = thisObj.parents('div.row').find('.qty').val();
        var amount = price * qty;
        thisObj.parents('div.row').find('.amount').val(amount);
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
    },
    'click .patientAddon': function () {
        alertify.patientAddon(renderTemplate(Template.laboratory_patientInsert))
            .set({
                title: fa("plus", "Patient")
            })
    }
});

/**
 * Show
 */

showTpl.helpers({
    laboItems: function () {


        var str = "";
        this.laboItem.forEach(function (o) {
            str += '+' + "Product ID: " + o.itemId +
                " | Qy: " + o.qty +
                " | Price: " + numeral(o.price).format('0,0.00') + 'R' +
                " | Fee: " + numeral(o.fee).format('0,0.00') + 'R'
                + " | Amount: " + numeral(o.amount).format('0,0.00') + 'R' + "<br/>";
        });
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
                //doc.branchId = Session.get('currentBranch');
                //return doc;
                var prefix = Session.get('currentBranch') + '-';
                Meteor.call('labo', prefix);
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
    laboratory_laboUpdate: {
        onSuccess: function (formType, result) {
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

/**
 * Return current date after Insert Success
 *
 * @returns {currentDate}
 */

/**
 * onchange Item
 */
function onchangeItem(e) {
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
        thisObj.parents('div.row').find('.amount').val(price);
        calculateTotal();
    } else {
        var fee = itemData.fee;
        thisObj.parents('div.row').find('.price').val(price);
        thisObj.parents('div.row').find('.qty').val(1);
        thisObj.parents('div.row').find('.fee').val(fee);
        thisObj.parents('div.row').find('.amount').val(price);
        calculateTotal();
    }
}

/**
 * Register state
 */

var laboState = function (param) {
    var laboDoc = Laboratory.Collection.Labo.findOne({_id: param._id});
    /***** Patient *****/
        // Photo
    laboDoc._patient.photoUrl = null;
    if (!_.isUndefined(laboDoc._patient.photo)) {
        laboDoc._patient.photoUrl = Files.findOne(laboDoc._patient.photo).url();
    }

    // Set state
    Laboratory.laboState.set('data', laboDoc);
};
var laboState = function (param) {
    var laboDoc = Laboratory.Collection.Labo.findOne({_id: param._id});
    /***** Agent *****/
        // Photo
    laboDoc._agent.photoUrl = null;
    if (!_.isUndefined(laboDoc._agent.photo)) {
        laboDoc._agent.photoUrl = Files.findOne(laboDoc._agent.photo).url();
    }

    // Set state
    Laboratory.laboState.set('data', laboDoc);
};

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

                target.text('$' + floored_number);
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

                target.text('$' + floored_number);
            }
        },
        200
    );

}
var getCurrentPatient = function () {
    var id = FlowRouter.getParam('patientId');
    var data = Laboratory.Collection.Patient.findOne(id);
    if (!_.isUndefined(data.photo)) {
        data.photoUrl = Files.findOne(data.photo).url();
    } else {
        data.photoUrl = null;
    }
    return data;
};
