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
