/**
 * Admin
 */
Security.defineMethod("sample_ifAdmin", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['admin'], 'Sample');
    }
});

/**
 * General
 */
Security.defineMethod("sample_ifGeneral", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['general'], 'Sample');
    }
});

/**
 * Reporter
 */
Security.defineMethod("sample_ifReporter", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['reporter'], 'Sample');
    }
});
