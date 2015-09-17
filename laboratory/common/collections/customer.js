// Collection
Laboratory.Collection.Customer = new Mongo.Collection("laboratory_customer");

// Schema
Laboratory.Schema.Customer = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
        //unique: true,
        //max: 200
    },
    gender: {
        type: String,
        label: "Gender",
        autoform: {
            type: "select2",
            options: function () {
                return Laboratory.List.gender();
            }
            //type: "selectize",
            //afFieldInput: {
            //    multiple: true,
            //    selectizeOptions: {}
            //}
        }
    },
    dob: {
        type: String,
        label: "Date of Birth"
    },
    addressId: {
        type: String,
        label: "Address",
        autoform: {
            type: "select2",
            options: function () {
                return Laboratory.List.address();
            }
        }
    },
    telephone: {
        type: String,
        label: "Telephone",
        optional: true
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
        label: "Branch"
    }
});

// Attach schema
Laboratory.Collection.Customer.attachSchema(Laboratory.Schema.Customer);

// Attach soft remove
Laboratory.Collection.Customer.attachBehaviour('softRemovable');