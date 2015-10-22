var subs = new SubsManager();

LaboratoryRoutes.route('/labo/:patientId?', {
    name: 'Laboratory.labo',
    subscriptions: function (params, queryParams) {
        this.register('laboratory_payment', subs.subscribe('laboratory_payment'));
        this.register('laboratory_patient', subs.subscribe('laboratory_patient'));
        this.register('laboratory_laboByPatient', subs.subscribe('laboratory_laboByPatient', params.patientId));
        this.register('laboratory_patientById', subs.subscribe('laboratory_patient', params.patientId));
        this.register('laboratory_staff', subs.subscribe('laboratory_staff'));
        this.register('laboratory_agent', subs.subscribe('laboratory_agent'));
        this.register('laboratory_item', subs.subscribe('laboratory_item'));
        this.register('laboratory_category', subs.subscribe('laboratory_category'));
        this.register('laboratory_result', subs.subscribe('laboratory_result'));
    },
    action: function (params, queryParams) {
        Layout.main('laboratory_labo');
    },
    breadcrumb: {
        params: ['patientId'],
        //queryParams: ['show', 'color'],
        title: 'Labo',
        parent: 'laboratory.patient'
    }
});
