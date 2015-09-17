cpanelRoutes.route('/branch', {
    name: 'cpanel.branch',
    action: function (params, queryParams) {
        Layout.main('cpanel_branch');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Branch',
        parent: 'cpanel.welcome'
    }
});
