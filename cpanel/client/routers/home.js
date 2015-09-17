cpanelRoutes.route('/home', {
    name: 'cpanel.home',
    action: function (params, queryParams) {
        Layout.main('cpanel_home');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Home',
        parent: 'cpanel.welcome'
    }
});
