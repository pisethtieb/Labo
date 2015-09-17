/**
 * Collection
 */
Cpanel.Collection.Branch = new Mongo.Collection("cpanel_branch");

/**
 * Schema
 */
Cpanel.Schema.Branch = new SimpleSchema({
    khName: {
        type: String,
        label: 'Kh Name',
        unique: true,
        max: 200
    },
    khShortName: {
        type: String,
        label: "Kh Short Name",
        unique: true,
        max: 200
    },
    enName: {
        type: String,
        label: "En Name",
        unique: true,
        max: 200
    },
    enShortName: {
        type: String,
        label: "En Short Name",
        unique: true,
        max: 200
    },
    khAddress: {
        type: String,
        label: "Kh Address"
    },
    enAddress: {
        type: String,
        label: "En Address"
    },
    telephone: {
        type: String,
        label: "Telephone",
        max: 100,
        optional: true
    },
    email: {
        type: String,
        label: "Email",
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    }
});

/**
 * Attach schema
 */
Cpanel.Collection.Branch.attachSchema(Cpanel.Schema.Branch);
