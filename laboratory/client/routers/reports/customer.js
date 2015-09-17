/**
 * Browser view
 */
LaboratoryRoutes.route('/customerReport', {
    name: 'Laboratory.customerReport',
    action: function (params, queryParams) {
        Layout.main('laboratory_customerReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Customer Report',
        parent: 'Laboratory.home'
    }
});

LaboratoryRoutes.route('/customerReportGen', {
    name: 'Laboratory.customerReportGen',
    action: function (params, queryParams) {
        Layout.report('laboratory_customerReportGen');
    }
});

/**
 * Excel
 */
LaboratoryRoutes.route('/customerExcelReport', {
    name: 'Laboratory.customerExcelReport',
    action: function (params, queryParams) {
        Layout.main('laboratory_customerExcelReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Customer Excel Report',
        parent: 'Laboratory.home'
    }
});
