// Collection
Laboratory.Collection.Result = new Mongo.Collection("Laboratory_Result");
// Schema
Laboratory.Schema.Result = new SimpleSchema({

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
        label: "Item ID"
    },
    'laboItem.$.normalValue': {
        type: String,
        optional: true
    },

    'laboItem.$.childItem': {
        type: Array,
        optional: true
    },
    'laboItem.$.childItem.$': {
        type: Object
    },
    'laboItem.$.childItem.$.name': {
        type: String,
        label: "Name",
        max: 250,
        optional: true
    },
    'laboItem.$.childItem.$.normalValue': {
        type: String,
        label: "Normal Value",
        optional: true,
        max: 250
    },
    'laboItem.$.childItem.$.prependValue': {
        type: String,
        label: "Prepend Value",
        optional: true,
        max: 250

    }
    ,
    'laboItem.$.childItem.$.appendValue': {
        type: String,
        label: "Append Value",
        optional: true,
        max: 250

    },
    branchId: {
        type: "String",
        optional: true
    }


})
;
// Attach schema
Laboratory.Collection.Result.attachSchema(Laboratory.Schema.Result);
// Attach soft remove
Laboratory.Collection.Result.attachBehaviour('softRemovable');
