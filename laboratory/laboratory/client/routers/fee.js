var subs = new SubsManager();

LaboratoryRoutes.route('/fee/:agentId?', {
    name: 'laboratory.fee',
    subscriptions: function (params, queryParams) {
        this.register('laboratory_fee', subs.subscribe('laboratory_fee'));
        this.register('laboratory_feeByAgent', subs.subscribe('laboratory_feeByAgent', params.agentId));
        this.register('laboratory_laboByAgent', subs.subscribe('laboratory_laboByAgent', params.agentId));
        this.register('laboratory_agentById', subs.subscribe('laboratory_agentById'));
        this.register('laboratory_staff', subs.subscribe('laboratory_staff'));
        this.register('laboratory_labo', subs.subscribe('laboratory_labo'));
        this.register('laboratory_agent', subs.subscribe('laboratory_agent', params.agentId));

    },
    action: function (params, queryParams) {

        Layout.main('laboratory_fee');
    },
    breadcrumb: {
        params: ['agentId'],
        //queryParams: ['show', 'color'],
        title: 'Fee',
        parent: 'laboratory.agent'
    }
});
