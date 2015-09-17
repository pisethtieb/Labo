/**
 * Branch
 */
var module = 'Cpanel';

Cpanel.Collection.Branch.after.insert(function (userId, doc) {
    Events.trackInsert({
        description: doc,
        module: module
    });
});

Cpanel.Collection.Branch.after.update(function (userId, doc, fieldNames, modifier, options) {
    Events.trackUpdate({
        description: modifier,
        module: module
    });
});

Cpanel.Collection.Branch.after.remove(function (userId, doc) {
    Events.trackRemove({
        description: doc,
        module: module
    });
});