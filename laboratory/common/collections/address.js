// Collection
Laboratory.Collection.Address = new Mongo.Collection("laboratory_address");

// Schema
Laboratory.Schema.Address = new SimpleSchema({
    name: {
        type: String,
        label: "Address"
    }
});

// Attach schema
Laboratory.Collection.Address.attachSchema(Laboratory.Schema.Address);

// Attach soft remove
Laboratory.Collection.Address.attachBehaviour('softRemovable');