/**
 * Declare template
 */
var formTpl = Template.laboratory_feeBalanceReport,
    genTpl = Template.laboratory_feeBalanceReportGen;

/**
 * Form
 */
formTpl.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.date(name);
});

/**
 * Generate
 */
genTpl.helpers({
    options: function () {
        // font size = null (default), bg
        // paper = a4, a5, mini
        // orientation = portrait, landscape
        return {
            //fontSize: 'bg',
            paper: 'a4',
            orientation: 'landscape'
        };
    },
    data: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        var q = FlowRouter.current().queryParams;

        var callId = JSON.stringify(q);
        var call = Meteor.callAsync(callId, 'laboratory_feeBalanceReport', q);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
});