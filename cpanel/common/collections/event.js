/**
 * Schema
 */
Cpanel.Schema.EventReport = new SimpleSchema({
    user: {
        type: String,
        label: "User",
        autoform: {
            type: "select2",
            options: function () {
                return Cpanel.ListForReport.user();
            }
        }
    },
    type: {
        type: String,
        label: "Type",
        autoform: {
            type: "select2",
            options: function () {
                return Cpanel.ListForReport.type();
            }
        },
        optional: true
    },
    module: {
        type: String,
        label: "Module",
        autoform: {
            type: "select2",
            options: function () {
                return Cpanel.ListForReport.module();
            }
        },
        optional: true
    },
    branch: {
        type: String,
        label: "Branch",
        autoform: {
            type: "select2",
            options: function () {
                return Cpanel.ListForReport.branch();
            }
        },
        optional: true
    },
    date: {
        type: String,
        label: "Date"
    }
});