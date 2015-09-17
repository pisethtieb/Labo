cpanelRoutes.route('/user', {
    name: 'cpanel.user',
    action: function (params, queryParams) {
        Layout.main('cpanel_user');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'User',
        parent: 'cpanel.welcome'
    }
});
