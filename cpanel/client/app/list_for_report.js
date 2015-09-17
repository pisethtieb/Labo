/**
 * List
 */
Cpanel.ListForReport = {
    branch: function () {
        var list = [];
        list.push({label: "(Select All)", value: ""});
        Cpanel.Collection.Branch.find()
            .forEach(function (obj) {
                list.push({label: obj.enName, value: obj._id});
            });

        return list;
    },
    user: function () {
        var list = [];
        list.push({label: "(Select One)", value: ""});
        Meteor.users.find()
            .forEach(function (obj) {
                list.push({label: obj.username + ' (' + obj.profile.fullName + ')', value: obj._id});
            });

        return list;
    },
    type: function () {
        var list = [];
        list.push({label: "(Select All)", value: ""});
        list.push({label: 'Insert', value: 'Insert'});
        list.push({label: 'Update', value: 'Update'});
        list.push({label: 'Remove', value: 'Remove'});
        list.push({label: 'Report', value: 'Report'});
        list.push({label: 'Login', value: 'Login'});
        list.push({label: 'Logout', value: 'Logout'});
        return list;
    },
    module: function () {
        var list = [];
        list.push({label: "(Select All)", value: ""});
        _.each(Module, function (val, key) {
            list.push({label: Module[key].name, value: key});
        });

        return list;
    }
};
