// Collection
Laboratory.Collection.Items = new Mongo.Collection("laboratory_item");

// Schema
Laboratory.Schema.Items = new SimpleSchema({
    categoryId: {
        type: String,
        label: "Category",
        autoform: {
            type: "select2",
            options: function () {
                return Laboratory.List.categoryId();
            }
        }
    },
    name: {
        type: String,
        label: "Name",
        unique: true,
        max: 250
    },
    child: {
        type: String,
        max: 50,
        optional: true,
        autoform: {
            type: "select2",
            options: function () {
                return Laboratory.List.child();
            }
        }
    },
    normalValue: {
        type: String,
        max: 250,
        optional: true,
        label: "Normal Value"

    },
    prependValue: {
        type: String,
        max: 250,
        optional: true,
        label: "Prepend Value",
        autoform: {
            type: "select2",
            options: function () {
                return Laboratory.List.prepend();
            }
        }

    },
    appendValue: {
        type: String,
        max: 250,
        optional: true,
        label: "Append Value",
        autoform: {
            type: "select2",
            options: function () {
                return Laboratory.List.Append();
            }
        }

    },
    price: {
        type: Number,
        decimal: true,
        label: "Price"

    },
    feeType: {
        type: String,
        max: 50,
        label: "feeType",
        autoform: {
            type: "select2",
            options: function () {
                return Laboratory.List.feeType();
            }
        }
    },
    fee: {
        type: Number,
        decimal: true,
        label: "Fee"
    },
    childItem: {
        type: Array,
        minCount: 0,
        optional: true
    },
    'childItem.$': {
        type: Object,
        optional: true

    },
    'childItem.$.name': {
        type: String,
        label: "Name",
        max: 250,
        optional: true
    },
    'childItem.$.normalValue': {
        type: String,
        label: "Normal Value",
        optional: true,
        max: 250
    },
    'childItem.$.prependValue': {
        type: String,
        label: "Prepend Value",
        optional: true,
        max: 250,
        autoform: {
            type: "selectize",
            options: function () {
                return Laboratory.List.prepend();
            }
        }

    }
    ,
    'childItem.$.appendValue': {
        type: String,
        label: "Append Value",
        optional: true,
        max: 250,
        autoform: {
            type: "selectize",
            options: function () {
                return Laboratory.List.Append();
            }
        }
    },
    cpanel_branchId: {
        type: String,
        label: "Branch",
        optional: true
    }
});

// Attach schema
Laboratory.Collection.Items.attachSchema(Laboratory.Schema.Items);

// Attach soft remove
Laboratory.Collection.Items.attachBehaviour('softRemovable');