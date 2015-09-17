/**
 * List
 */
Cpanel.List = {
    currency: function () {
        var list = [{label: "(Select One)", value: ""}];

        Cpanel.Collection.Currency.find()
            .forEach(function (obj) {
                list.push({label: obj._id + ' (' + obj.num + ')', value: obj._id})
            });

        return list;
    },
    role: function () {
        var list = [];

        _.each(Module, function (val, key) {
            var options = [];
            _.each(Module[key].roles, function (roleVal) {
                if (!(key == 'Cpanel' && roleVal == 'super')) {
                    options.push({label: roleVal, value: key + ':' + roleVal});
                }
            });

            list.push({optgroup: key, options: options});
        });

        return list;
    },
    roleForUser: function (userId) {
        var userIdVal = _.isUndefined(userId) ? Meteor.userId() : userId;
        var list = [];
        list.push({label: "(Select One)", value: ""});

        Roles.getGroupsForUser(userIdVal)
            .forEach(function (group) {
                var label = Module[group].name;
                list.push({label: label, value: group});
            });

        return list;
    },
    branch: function (selectOne) {
        var selectOne = _.isUndefined(selectOne) ? true : selectOne;
        var list = [];

        if (selectOne) {
            list.push({label: "(Select One)", value: ""});
        }

        Cpanel.Collection.Branch.find()
            .forEach(function (obj) {
                list.push({label: obj.enName, value: obj._id});
            });

        return list;
    },
    branchForUser: function (userId) {
        var userIdVal = _.isUndefined(userId) ? Meteor.userId() : userId;
        var list = [];
        list.push({label: "(Select One)", value: ""});

        var getUser = Meteor.users.findOne(userIdVal);
        if (getUser) {
            _.each(getUser.rolesBranch, function (branch) {
                var label = Cpanel.Collection.Branch.findOne(branch);
                list.push({label: label.enName, value: branch});
            });
        }

        return list;
    }
};
