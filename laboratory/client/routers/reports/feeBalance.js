/**
 * Browser view
 */
var subs = new SubsManager();
LaboratoryRoutes.route('/feeBalanceReport', {
    name: 'Laboratory.feeBalanceReport',
    subscriptions: function (params, queryParams) {

        this.register('cpanel_exchange', subs.subscribe('cpanel_exchange'));
        this.register('laboratory_patient', subs.subscribe('laboratory_patient'));
        this.register('laboratory_staff', subs.subscribe('laboratory_staff'));
        this.register('laboratory_agent', subs.subscribe('laboratory_agent'));
        this.register('laboratory_labo', subs.subscribe('laboratory_labo'));
        this.register('laboratory_fee', subs.subscribe('laboratory_fee'));
    },
    action: function (params, queryParams) {
        Layout.main('laboratory_feeBalanceReport');
    },
    breadcrumb: {
        title: 'feeBalance Report',
        parent: 'Laboratory.home'
    }
});

LaboratoryRoutes.route('/feeBalanceReportGen', {
    name: 'Laboratory.feeBalanceReportGen',
    action: function (params, queryParams) {
        Layout.report('laboratory_feeBalanceReportGen');
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
