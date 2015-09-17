cpanelRoutes.route('/setting', {
    name: 'cpanel.setting',
    subscriptions: function(params, queryParams) {
        this.register('cpanel_setting', Meteor.subscribe('cpanel_setting'));
    },
    action: function (params, queryParams) {
        Layout.main('cpanel_setting');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Setting',
        parent: 'cpanel.welcome'
    }
});
