LaboratoryRoutes.route('/home', {
    name: 'laboratory.home',
    action: function (params, queryParams) {
        Layout.main('laboratory_home');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Home'
        //parent: 'Home'
    }
});
