var subs = new SubsManager();

sampleRoutes.route('/address', {
    name: 'sample.address',
    subscriptions: function (params, queryParams) {
        this.register(
            'sample_address',
            subs.subscribe('sample_address')
        );
    },
    action: function (params, queryParams) {
        Layout.main('sample_address');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Address',
        parent: 'sample.home'
    }
});
