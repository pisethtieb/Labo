/**
 * Collection
 */
Cpanel.Collection.Company = new Mongo.Collection("cpanel_company");

/**
 * Schema
 */
Cpanel.Schema.Company = new SimpleSchema({
    khName: {
        type: String,
        label: "Kh name",
        max: 200
    },
    khShortName: {
        type: String,
        label: "Kh short name",
        max: 200
    },
    enName: {
        type: String,
        label: "En name",
        max: 200
    },
    enShortName: {
        type: String,
        label: "En short name",
        max: 200
    },
    khAddress: {
        type: String,
        label: "Kh address",
        max: 500
    },
    enAddress: {
        type: String,
        label: "En address",
        max: 500
    },
    telephone: {
        type: String,
        label: "Telephone",
        max: 100
    },
    email: {
        type: String,
        label: "Email",
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },
    website: {
        type: String,
        label: "Website",
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    }
});

/**
 * Attach schema
 */
Cpanel.Collection.Company.attachSchema(Cpanel.Schema.Company);
