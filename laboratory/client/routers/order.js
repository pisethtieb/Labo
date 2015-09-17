var subs = new SubsManager();

LaboratoryRoutes.route('/order/:customerId', {
    name: 'Laboratory.order',
    subscriptions: function (params, queryParams) {
        // Order
        this.register(
            'laboratory_orderByCustomer',
            subs.subscribe('laboratory_orderByCustomer', params.customerId)
        );
        // Customer
        this.register('laboratory_customerById',
            subs.subscribe('laboratory_customerById', params.customerId)
        );
    },
    action: function (params, queryParams) {
        Layout.main('laboratory_order');
    },
    breadcrumb: {
        params: ['customerId'],
        //queryParams: ['show', 'color'],
        title: 'Order',
        parent: 'Laboratory.customer'
    }
});
