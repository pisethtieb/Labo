var subs = new SubsManager();

LaboratoryRoutes.route('/patient', {
    name: 'laboratory.patient',
    subscriptions: function (params, queryParams) {
        // Patient
        this.register('laboratory_patientByBranch', subs.subscribe('laboratory_patientByBranch', Session.get('currentBranch')));
        this.register('laboratory_staff', subs.subscribe('laboratory_staff'));
        this.register('laboratory_items', Meteor.subscribe('laboratory_items'));
        this.register('laboratory_category', Meteor.subscribe('laboratory_category'));
        this.register('laboratory_agent', subs.subscribe('laboratory_agent'));
        this.register('laboratory_labo', subs.subscribe('laboratory_labo'));
    },
    action: function (params, queryParams) {
        Layout.main('laboratory_patient');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Patient',
        parent: 'laboratory.home'
    }
});
