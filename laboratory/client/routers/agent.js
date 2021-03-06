var subs = new SubsManager();

LaboratoryRoutes.route('/agent', {
    name: 'laboratory.agent',
    subscriptions: function (params, queryParams) {

        this.register('laboratory_agent', subs.subscribe('laboratory_agent'));
        this.register('laboratory_labo', subs.subscribe('laboratory_labo'));
    },
    action: function (params, queryParams) {
        Layout.main('laboratory_agent');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Agent',
        parent: 'laboratory.home'
    }
});
