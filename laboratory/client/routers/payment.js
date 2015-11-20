var subs = new SubsManager();

LaboratoryRoutes.route('/payment/:patientId?/:laboId?', {
    name: 'Laboratory.payment',
    subscriptions: function (params, queryParams) {
        this.register('laboratory_payment', subs.subscribe('laboratory_payment'));
        this.register('laboratory_paymentByLabo', subs.subscribe('laboratory_paymentByLabo', params.laboId));
        this.register('laboratory_patientById', subs.subscribe('laboratory_patient', params.patientId));
        this.register('laboratory_laboById', subs.subscribe('laboratory_labo', params.laboId));
        this.register('laboratory_staff', subs.subscribe('laboratory_staff'));
    },
    action: function (params, queryParams) {
        Layout.main('laboratory_payment');
    },
    breadcrumb: {
        params: ['patientId', 'laboId'],
        title: 'Payment',
        parent: 'Laboratory.labo'
    }
});
