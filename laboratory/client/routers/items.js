var subs = new SubsManager();

LaboratoryRoutes.route('/items', {
    name: 'laboratory.items',
    subscriptions: function (params, queryParams) {
        // Customer
        //this.register('laboratory_customer', subs.subscribe('laboratory_customer', Session.get('currentBranch')));
        // Address
        this.register('laboratory_items', subs.subscribe('laboratory_items'));
        this.register('laboratory_category', subs.subscribe('laboratory_category'));
        this.register('laboratory_labo', subs.subscribe('laboratory_labo'));

    },
    action: function (params, queryParams) {
        Layout.main('laboratory_items');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Items',
        parent: 'laboratory.home'
    }
});
