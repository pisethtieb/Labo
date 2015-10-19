// Collection
Laboratory.Collection.Fee = new Mongo.Collection("Laboratory_fee");

// Schema
Laboratory.Schema.Fee = new SimpleSchema({
    feeDate: {
        type: String,
        label: "Date",
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD H:mm:ss');
            return currentDate;
        }
    },
    agentId: {
        type: String,
        label: "Agent ID",
        max: 250
    },
    laboId: {
        type: String,
        label: "Labo ID",
        autoform: {
            type: "select2",
            options: function () {
                return Laboratory.List.laboIdFee();
            }
        }
    },
    staffId: {
        type: String,
        label: "Staff ID",
        autoform: {
            type: "select2",
            options: function () {
                return Laboratory.List.staffId();
            }
        }
    },
    overdueAmount: {
        type: Number,
        label: "Due Amount",
        decimal: true
    },
    paidAmount: {
        type: Number,
        label: "Paid Amount",
        min: 1,
        decimal: true,
        custom: function () {
            if (this.value > this.field('overdueAmount').value) {
                return "greaterThan";
            }
        }
    },
    outstandingAmount: {
        type: Number,
        label: "Outstanding Amount ",
        decimal: true
    },
    status: {
        type: String,
        label: " Status"
    },
    cpanel_branchId: {
        type: String,
        label: "Branch",
        optional: true
    }
});

// Attach schema
Laboratory.Collection.Fee.attachSchema(Laboratory.Schema.Fee);

// Attach soft remove
Laboratory.Collection.Fee.attachBehaviour('softRemovable');
SimpleSchema.messages({
    "greaterThan": "PaidAmount mustn't be greater than OverdueAmount!"
});