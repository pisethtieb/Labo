FlowRouter.route('/', {
    name: 'cpanel.welcome',
    action: function (params, queryParams) {
        Layout.main('cpanel_welcome');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Welcome'
        //parent: 'cpanel.welcome'
    }
});
