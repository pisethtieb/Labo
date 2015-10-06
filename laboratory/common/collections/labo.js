// Collection
Laboratory.Collection.Labo = new Mongo.Collection("laboratory_labo");

// Schema
Laboratory.Schema.Labo = new SimpleSchema({
    laboDate: {
        type: String,
        label: "Sale Date",
        max: 20,
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD H:mm:ss');
            return currentDate;
        }
    },
    staffId: {
        type: String,
        label: "Staff",
        max: 250,
        autoform: {
            type: "select2",
            options: function () {
                return Laboratory.List.staffId();
            }
        }
    },
    agentId: {
        type: String,
        label: "Agent",
        max: 250,
        autoform: {
            type: "select2",
            options: function () {
                return Laboratory.List.agentId();
            }
        }
    },
    patientId: {
        type: String,
        label: "Patient",
        max: 250

    },
    total: {
        type: Number,
        label: "Total",
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'hidden'
            }
        }
    },
    totalFee: {
        type: Number,
        label: "Total Fee",
        optional: true,
        decimal: true,
        autoform: {
            afFieldInput: {
                type: 'hidden'
            }
        }
    },
    laboItem: {
        type: Array,
        minCount: 1
    },
    'laboItem.$': {
        type: Object

    },
    'laboItem.$.itemId': {
        type: String,
        label: "Item ID",
        autoform: {
            type: "select2",
            options: function () {
                return Laboratory.List.itemId();
            }
        },
        max: 250
    },
    'laboItem.$.qty': {
        type: Number,
        label: "Qty",
        min: 1
    },
    'laboItem.$.price': {
        type: Number,
        label: "Price",
        decimal: true
    },
    'laboItem.$.fee': {
        type: Number,
        label: "Fee",
        decimal: true
    }, 'laboItem.$.calFee': {
        type: Number,
        label: "CalFee",
        decimal: true
    },
    'laboItem.$.amount': {
        type: Number,
        label: "Amount",
        decimal: true
    },
    branchId: {
        type: "String",
        optional: true


    }
});

// Attach schema
Laboratory.Collection.Labo.attachSchema(Laboratory.Schema.Labo);

// Attach soft remove
Laboratory.Collection.Labo.attachBehaviour('softRemovable');