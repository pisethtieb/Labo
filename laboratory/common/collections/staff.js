// Collection
Laboratory.Collection.Staff = new Mongo.Collection("laboratory_staff");

// Schema
Laboratory.Schema.Staff = new SimpleSchema({
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
    dob: {
        type: String,
        label: "Date of Birth",
        max: 50
    },
    position: {
        type: String,
        label: "Position",
        autoform: {
            type: "select2",
            options: function () {
                return Laboratory.List.position();
            }
        },
        max: 50
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
        //autoform: {
        //    type: "select2",
        //    options: function () {
        //        return Laboratory.List.address();
        //    }
        //}

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
        label: "Branch", optional: true
    }
});

// Attach schema
Laboratory.Collection.Staff.attachSchema(Laboratory.Schema.Staff);

// Attach soft remove
Laboratory.Collection.Staff.attachBehaviour('softRemovable');