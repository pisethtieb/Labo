/**
 * Browser view
 */
var subs = new SubsManager();
LaboratoryRoutes.route('/paymentReport', {
    name: 'Laboratory.paymentReport',
    subscriptions: function (params, queryParams) {

        this.register('cpanel_exchange', subs.subscribe('cpanel_exchange'));
        this.register('laboratory_patient', subs.subscribe('laboratory_patient'));
        this.register('laboratory_staff', subs.subscribe('laboratory_staff'));
        this.register('laboratory_agent', subs.subscribe('laboratory_agent'));
        this.register('laboratory_labo', subs.subscribe('laboratory_labo'));
        this.register('laboratory_payment', subs.subscribe('laboratory_payment'));
    },
    action: function (params, queryParams) {
        Layout.main('laboratory_paymentReport');
    },
    breadcrumb: {
        title: 'Payment Report',
        parent: 'Laboratory.home'
    }
});

LaboratoryRoutes.route('/paymentReportGen', {
    name: 'Laboratory.paymentReportGen',
    action: function (params, queryParams) {
        Layout.report('laboratory_paymentReportGen');
    }
});

///**
// * Excel
// */
//LaboratoryRoutes.route('/laboExcelReport', {
//    name: 'Laboratory.laboExcelReport',
//    action: function (params, queryParams) {
//        Layout.main('laboratory_laboExcelReport');
//    },
//    breadcrumb: {
//        //params: ['id'],
//        //queryParams: ['show', 'color'],
//        title: 'labo Excel Report',
//        parent: 'Laboratory.home'
//    }
//});
