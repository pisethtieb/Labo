// Collection
Laboratory.Collection.Category = new Mongo.Collection("laboratory_category");

// Schema
Laboratory.Schema.Category = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        unique: true,
        max: 500
    },
    des: {
        type: String,
        label: "Description",
        max: 500,
        optional: true
    }
});

// Attach schema
Laboratory.Collection.Category.attachSchema(Laboratory.Schema.Category);

// Attach soft remove
Laboratory.Collection.Category.attachBehaviour('softRemovable');