/**
 * Admin
 */
Security.defineMethod("laboratory_ifAdmin", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['admin'], 'Laboratory');
    }
});

/**
 * General
 */
Security.defineMethod("laboratory_ifGeneral", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['general'], 'Laboratory');
    }
});

/**
 * Reporter
 */
Security.defineMethod("laboratory_ifReporter", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['reporter'], 'Laboratory');
    }
});
