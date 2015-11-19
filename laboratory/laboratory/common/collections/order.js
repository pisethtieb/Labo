// Collection
Laboratory.Collection.Order = new Mongo.Collection("laboratory_order");

// Schema
Laboratory.Schema.Order = new SimpleSchema({
    orderDate: {
        type: Date
    },
    customerId: {
        type: String
        //autoform: {
        //    type: "select2",
        //    options: function () {
        //        return Laboratory.List.customer();
        //    }
        //}
    },
    des: {
        type: String,
        label: "Description"
    },
    items: {
        type: [Object]
    },
    'items.$.name': {
        type: String
    },
    'items.$.qty': {
        type: Number
    },
    'items.$.price': {
        type: Number,
        decimal: true
    },
    'items.$.amount': {
        type: Number,
        decimal: true
    },
    total: {
        type: Number,
        decimal: true
    },
    cpanel_branchId: {
        type: String,
        label: "Branch"
    }
});

// Attach schema
Laboratory.Collection.Order.attachSchema(Laboratory.Schema.Order);

// Attach soft remove
Laboratory.Collection.Order.attachBehaviour('softRemovable');