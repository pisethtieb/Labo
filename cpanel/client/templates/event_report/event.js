// Declare template
var formTpl = Template.cpanel_eventReport,
    genTpl = Template.cpanel_eventReportGen;

// Form
formTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Event Report',
        description: 'Description for this page'
    });
});

formTpl.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});

// Generate
genTpl.helpers({
    options: function () {
        // font size = null (default), bg
        // paper = a4, a5, mini
        // orientation = portrait, landscape
        return {fontSize: 'bg', paper: 'a4', orientation: 'portrait'};
    },
    data: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        var q = FlowRouter.current().queryParams;

        var callId = JSON.stringify(q);
        var call = Meteor.callAsync(callId, 'capnel_eventReport', q);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
});
