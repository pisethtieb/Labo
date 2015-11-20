var subs = new SubsManager();

LaboratoryRoutes.route('/staff', {
    name: 'laboratory.staff',
    subscriptions: function (params, queryParams) {
        // Customer
        //this.register('laboratory_customer', subs.subscribe('laboratory_customer', Session.get('currentBranch')));
        // Address
        this.register('laboratory_staff', subs.subscribe('laboratory_staff'));
    },
    action: function (params, queryParams) {
        Layout.main('laboratory_staff');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Staff',
        parent: 'laboratory.home'
    }
});
