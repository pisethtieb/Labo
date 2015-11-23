Laboratory.resultState = new ReactiveObj();
var text = new ReactiveObj();
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
    'click .result': function (e) {

        text.set('normalResult', e.currentTarget);
        var val = $(e.currentTarget).val();
        var format = getFormat(val);

        if (format.bold) {
            $('.bold').prop('checked', true);
        } else {
            $('.bold').prop('checked', false);
        }
        if (format.italic) {
            $('.italic').prop('checked', true);
        } else {
            $('.italic').prop('checked', false);
        }
        if (format.underline) {
            $('.underline').prop('checked', true);
        } else {
            $('.underline').prop('checked', false);
        }


    },
    'change .bold': function (e) {
        var regex = /<b>(.*?)<\/b>/g;
        var currentText = text.get('normalResult');
        var originText = currentText.value;
        var elementName = $('[name="' + currentText.name + '"]');
        var check = $(e.currentTarget).prop('checked');
        if (check) {
            elementName.val('<b>' + originText + '</b>');
            elementName.hide();
            $('p[name="' + currentText.name + '"]').html(currentText.value);
        } else {
            elementName.val(originText.match(regex).map(function (val) {
                return val.replace(/<\/?b>/g, '');
            }));
            $('p[name="' + currentText.name + '"]').html(currentText.value);
        }
    },
    'change .italic': function (e) {
        var regex = /<i>(.*?)<\/i>/g;
        var currentText = text.get('normalResult');
        var originText = currentText.value;
        var elementName = $('[name="' + currentText.name + '"]');
        var check = $(e.currentTarget).prop('checked');
        if (check) {
            elementName.val('<i>' + originText + '</i>');
        } else {
            elementName.val(originText.match(regex).map(function (val) {
                return val.replace(/<\/?i>/g, '');
            }));
        }
    },
    'change .underline': function (e) {
        var regex = /<u>(.*?)<\/u>/g;
        var currentText = text.get('normalResult');
        var originText = currentText.value;
        var elementName = $('[name="' + currentText.name + '"]');
        var check = $(e.currentTarget).prop('checked');
        if (check) {
            elementName.val('<u>' + originText + '</u>');
        } else {
            elementName.val(originText.match(regex).map(function (val) {
                return val.replace(/<\/?u>/g, '');
            }));
        }
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
    'click .remove': function (e, t) {
        var id = this._id;
        alertify.confirm(
            fa("remove", "Result"),
            "Are you sure to delete [" + id + "]?",
            function () {
                Laboratory.Collection.Result.remove(id, function (error) {
                    if (error) {
                        alertify.error(error.message);
                    } else {
                        alertify.labo().close();
                        alertify.success("Success");
                    }
                });
            },
            null
        );
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
        onSuccess: function (formType, laboId) {
            alertify.labo().close();
            alertify.success("Success");
            Meteor.call('getLaboId', laboId, function (err, result) {
                var res = Laboratory.Collection.Result.findOne(result).laboId;
                debugger;
                if (Session.get('savePrint')) {
                    var url = '/laboratory/result/print/' + res;
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

var getFormat = function (text) {
    var format = {};
    var bold = text.match(/<b[^>]*>([\s\S]*?)<\/b>/);
    var italic = text.match(/<i[^>]*>([\s\S]*?)<\/i>/);
    var underline = text.match(/<u[^>]*>([\s\S]*?)<\/u>/);
    if (bold !== null) {
        format.bold = true;
    }
    if (italic !== null) {
        format.italic = true
    }
    if (underline !== null) {
        format.underline = true;
    }
    return format;
};