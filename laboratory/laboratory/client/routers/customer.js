var subs = new SubsManager();

LaboratoryRoutes.route('/customer', {
    name: 'Laboratory.customer',
    subscriptions: function (params, queryParams) {
        // Customer
        //this.register('laboratory_customer', subs.subscribe('laboratory_customer', Session.get('currentBranch')));
        // Address
        this.register('laboratory_address', subs.subscribe('laboratory_address'));
    },
    action: function (params, queryParams) {
        Layout.main('laboratory_customer');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Customer',
        parent: 'Laboratory.home'
    }
});
