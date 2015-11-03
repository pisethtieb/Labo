/**
 * Browser view
 */
var subs = new SubsManager();
LaboratoryRoutes.route('/laboReport', {
    name: 'Laboratory.laboReport',
    subscriptions: function (params, queryParams) {

        this.register('cpanel_exchange', subs.subscribe('cpanel_exchange'));
    },
    action: function (params, queryParams) {
        Layout.main('laboratory_laboReport');
    },
    breadcrumb: {
        title: 'labo Report',
        parent: 'Laboratory.home'
    }
});

LaboratoryRoutes.route('/laboReportGen', {
    name: 'Laboratory.laboReportGen',
    action: function (params, queryParams) {
        Layout.report('laboratory_laboReportGen');
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
