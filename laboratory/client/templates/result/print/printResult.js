var printResultTPL = Template.laboratory_printResult;

printResultTPL.helpers({
    options: function () {
        // font size = null (default), bg
        // paper = a4, a5, mini
        // orientation = portrait, landscape
        return {
            //fontSize: 'bg',
            paper: 'a4',
            orientation: 'portrait'
        };
    },
    data: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        var q = FlowRouter.getParam('resultId');

        var callId = 'printResult' + q;
        var call = Meteor.callAsync(callId, 'labo_printResult', '', q);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    },
    isUndefinded:function(normalValue){
        return normalValue==null;
    }
});