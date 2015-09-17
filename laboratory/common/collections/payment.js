// Collection
Laboratory.Collection.Payment = new Mongo.Collection("laboratory_payment");

// Schema
Laboratory.Schema.Payment = new SimpleSchema({
    patientId: {
        type: String,
        label: 'Patient ID',
        max: 50
    },

    paymentDate: {
        type: String,
        label: "Payment Date",
        max: 50,
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD H:mm:ss');
            return currentDate;
        }
    },
    overdueAmount: {
        type: Number,
        label: "Overdue Amount",
        decimal: true
    },
    paidAmount: {
        type: Number,
        label: "Paid Amount",
        decimal: true
    },
    outstandingAmount: {
        type: Number,
        label: "Outstanding Amount",
        decimal: true
    },
    status: {
        type: String,
        label: "Status",
        max: 50

    },
    laboId: {
        type: String,
        label: "Labo ID",
        max: 255
    },
    staffId: {
        type: String,
        label: "Staff ID",
        max: 255,
        autoform: {
            type: "select2",
            options: function () {
                return Laboratory.List.staffId();
            }
        }
    },
    cpanel_branchId: {
        type: String,
        label: "Branch"
    }
});

// Attach schema
Laboratory.Collection.Payment.attachSchema(Laboratory.Schema.Payment);

// Attach soft remove
//Laboratory.Collection.Payment.attachBehaviour('softRemovable');