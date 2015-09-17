// Collection
Laboratory.Collection.Patient = new Mongo.Collection("laboratory_patient");

// Schema
Laboratory.Schema.Patient = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 200
    },
    gender: {
        type: String,
        label: "Gender",
        autoform: {
            type: "select2",
            options: function () {
                return Laboratory.List.gender();
            }
        }
    },
    age: {
        type: String,
        label: "Age"
    },
    maritalStatus: {
        type: String,
        label: "Marital Status",
        max: 50,
        autoform: {
            type: "select2",
            options: function () {
                return Laboratory.List.maritalStatus();
            }
        }
    },
    dob: {
        type: String,
        label: "Date of Birth"
    },
    address: {
        type: String,
        label: "Address",
        max: 500
        //,
        //autoform: {
        //    type: "select2",
        //    options: function () {
        //        return Labo.List.address();
        //    }
        //}
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
Laboratory.Collection.Patient.attachSchema(Laboratory.Schema.Patient);

// Attach soft remove
Laboratory.Collection.Patient.attachBehaviour('softRemovable');