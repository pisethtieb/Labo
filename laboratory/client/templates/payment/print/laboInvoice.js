var laboInvoiceTPL = Template.laboratory_laboInvoice;

laboInvoiceTPL.helpers({
    options: function () {
        // font size = null (default), bg
        // paper = a4, a5, mini
        // orientation = portrait, landscape
        return {
            //fontSize: 'bg',
            paper: 'a5',
            orientation: 'portrait'
        };
    },
    data: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        var q = FlowRouter.getParam('laboId');

        var callId = 'laboInvoice' + q;
        var call = Meteor.callAsync(callId, 'labo_invoice', q);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    },
    isUndefinded:function(normalValue){
        return normalValue==null;
    }
});