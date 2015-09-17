FlowRouter.notFound = {
    name: 'cpanel.notFound',
    action: function () {
        Layout.main('notFound');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Not Found',
        parent: 'cpanel.welcome'
    }
};
