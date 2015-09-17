/**
 * Collection
 */
Cpanel.Collection.Currency = new Mongo.Collection("cpanel_currency");

/**
 * Schema
 */
Cpanel.Schema.Currency = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        unique: true
    },
    symbol: {
        type: String,
        label: "Symbol",
        unique: true
    },
    num: {
        type: String,
        label: "Num",
        unique: true
    }
});

/**
 * Attach schema
 */
Cpanel.Collection.Currency.attachSchema(Cpanel.Schema.Currency);
