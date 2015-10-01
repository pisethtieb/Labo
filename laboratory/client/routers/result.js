var subs = new SubsManager();

LaboratoryRoutes.route('/Result', {
    name: 'laboratory.Result',
    subscriptions: function (params, queryParams) {
        // Customer
        //this.register('laboratory_customer', subs.subscribe('laboratory_customer', Session.get('currentBranch')));
        // Address
        this.register('laboratory_result', subs.subscribe('laboratory_result'));
    },
    action: function (params, queryParams) {
        Layout.main('laboratory_Result');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Result',
        parent: 'laboratory.home'
    }
});
