/**
 * Super
 */
Security.defineMethod("cpanel_ifSuper", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['super'], 'Cpanel');
    }
});

/**
 * Admin
 */
Security.defineMethod("cpanel_ifAdmin", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['admin'], 'Cpanel');
    }
});

/**
 * Super or admin
 */
Security.defineMethod("cpanel_ifSuperOrAdmin", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['super', 'admin'], 'Cpanel');
    }
});
