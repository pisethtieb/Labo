// Collection
Sample.Collection.Address = new Mongo.Collection("sample_address");

// Schema
Sample.Schema.Address = new SimpleSchema({
    name: {
        type: String,
        label: "Address"
    }
});

// Attach schema
Sample.Collection.Address.attachSchema(Sample.Schema.Address);

// Attach soft remove
Sample.Collection.Address.attachBehaviour('softRemovable');