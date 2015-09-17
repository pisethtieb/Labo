/**
 * Collection
 */
Cpanel.Collection.Exchange = new Mongo.Collection("cpanel_exchange");

/**
 * Schema
 */
var Rates = new SimpleSchema({
    KHR: {
        type: Number,
        decimal: true,
        label: "KHR"
    },
    USD: {
        type: Number,
        decimal: true,
        label: "USD"
    },
    THB: {
        type: Number,
        decimal: true,
        label: "THB"
    }
});

Cpanel.Schema.Exchange = new SimpleSchema({
    dateTime: {
        type: String,
        label: "Date",
        unique: true,
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD H:mm:ss');
            return currentDate;
        }
    },
    base: {
        type: String,
        label: "Base currency"
    },
    rates: {
        type: Rates
    }
});

/**
 * Attach schema
 */
Cpanel.Collection.Exchange.attachSchema(Cpanel.Schema.Exchange);
