sampleRoutes.route('/home', {
    name: 'sample.home',
    action: function (params, queryParams) {
        Layout.main('sample_home');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Home'
        //parent: 'Home'
    }
});
