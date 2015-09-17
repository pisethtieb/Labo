var subs = new SubsManager();

LaboratoryRoutes.route('/address', {
    name: 'laboratory.address',
    subscriptions: function (params, queryParams) {
        this.register('laboratory_address', subs.subscribe('laboratory_address')
        );
    },
    action: function (params, queryParams) {
        Layout.main('laboratory_address');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Address',
        parent: 'laboratory.home'
    }
});
