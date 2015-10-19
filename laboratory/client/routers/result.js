var subs = new SubsManager();

LaboratoryRoutes.route('/result/:patientId?/:laboId?', {
    name: 'laboratory.result',
    subscriptions: function (params, queryParams) {
        // Customer
        //this.register('laboratory_customer', subs.subscribe('laboratory_customer', Session.get('currentBranch')));
        // Address
        this.register('laboratory_result', subs.subscribe('laboratory_result'));
        this.register('laboratory_staff', subs.subscribe('laboratory_staff'));
        this.register('laboratory_labo', subs.subscribe('laboratory_labo'));
    },
    action: function (params, queryParams) {
        Layout.main('laboratory_result');
    },
    breadcrumb: {
        params: ['patientId', 'laboId'],
        title: 'Result',
        parent: 'laboratory.home'
    }
});
