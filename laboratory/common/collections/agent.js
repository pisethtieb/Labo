// Collection
Laboratory.Collection.Agent = new Mongo.Collection("laboratory_agent");

// Schema
Laboratory.Schema.Agent = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 250
    },
    gender: {
        type: String,
        label: "Gender",
        autoform: {
            type: "select2",
            options: function () {
                return Laboratory.List.gender();
            }
        },
        max: 20
    },
    telephone: {
        type: String,
        label: "Telephone",
        max: 250

    },
    address: {
        type: String,
        label: "Address",
        max: 500
    },
    email: {
        type: String,
        label: "Email",
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },
    photo: {
        type: String,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Files',
                accept: 'image/*'
            }
        },
        optional: true
    },
    cpanel_branchId: {
        type: String,
        label: "Branch",
        optional:true
    }
});

// Attach schema
Laboratory.Collection.Agent.attachSchema(Laboratory.Schema.Agent);

// Attach soft remove
Laboratory.Collection.Agent.attachBehaviour('softRemovable');