// Schema
Laboratory.Schema.FeeBalanceReport = new SimpleSchema({
    //branch: {
    //    type: String,
    //    autoform: {
    //        type: "select2",
    //        options: function () {
    //            return Laboratory.ListForReport.branch();
    //        }
    //    },
    //    optional: true
    //},
    date: {
        type: String
    },
    exchange: {
        type: 'string',
        autoform: {
            type: 'select2',
            options: function () {
                return Laboratory.ListForReport.exchange;
            }
        }
    },
    staffId: {
        type: 'string',
        label: 'Staff',
        optional: true,
        autoform: {
            type: 'select2',
            options: function () {
                return Laboratory.ListForReport.staffId();
            }
        }
    },
    agentId: {
        type: 'string',
        label: 'Agent',
        optional: true,
        autoform: {
            type: 'select2',
            options: function () {
                return Laboratory.ListForReport.agentId;
            }
        }
    },
    patientId: {
        type: 'string',
        label: 'Patient',
        optional: true,
        autoform: {
            type: 'select2',
            options: function () {
                return Laboratory.ListForReport.patientId();
            }
        }

    }
});