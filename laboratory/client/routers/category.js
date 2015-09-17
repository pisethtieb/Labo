var subs = new SubsManager();

LaboratoryRoutes.route('/category', {
    name: 'laboratory.category',
    subscriptions: function (params, queryParams) {
        // Customer
        //this.register('laboratory_customer', subs.subscribe('laboratory_customer', Session.get('currentBranch')));
        // Address
        this.register('laboratory_category', subs.subscribe('laboratory_category'));
    },
    action: function (params, queryParams) {
        Layout.main('laboratory_category');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Category',
        parent: 'laboratory.home'
    }
});
