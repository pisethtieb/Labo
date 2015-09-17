/**
 * Browser view
 */
sampleRoutes.route('/customerReport', {
    name: 'sample.customerReport',
    action: function (params, queryParams) {
        Layout.main('sample_customerReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Customer Report',
        parent: 'sample.home'
    }
});

sampleRoutes.route('/customerReportGen', {
    name: 'sample.customerReportGen',
    action: function (params, queryParams) {
        Layout.report('sample_customerReportGen');
    }
});

/**
 * Excel
 */
sampleRoutes.route('/customerExcelReport', {
    name: 'sample.customerExcelReport',
    action: function (params, queryParams) {
        Layout.main('sample_customerExcelReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Customer Excel Report',
        parent: 'sample.home'
    }
});
