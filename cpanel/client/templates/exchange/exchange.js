// Declare template
var indexTpl = Template.cpanel_exchange,
    insertTpl = Template.cpanel_exchangeInsert,
    updateTpl = Template.cpanel_exchangeUpdate,
    showTpl = Template.cpanel_exchangeShow;

// Index
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Exchange',
        description: 'Description for this page'
    });
});

indexTpl.onRendered(function () {
    // Create new  alertify
    createNewAlertify("exchange");
});

indexTpl.events({
    'click .insert': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(insertTpl))
            .maximize();
    },
    'click .update': function (e, t) {
        var data = Cpanel.Collection.Exchange.findOne(this._id);
        alertify.exchange(fa("pencil", "Exchange"), renderTemplate(updateTpl, data))
            .maximize();
    },
    'click .remove': function (e, t) {
        var id = this._id;

        alertify.confirm(
            fa("remove", "Exchange"),
            "Are you sure to delete [" + this.dateTime + "]?",
            function () {

                Cpanel.Collection.Exchange.remove(id, function (error) {
                    if (error) {
                        alertify.error(error.message);
                    } else {
                        alertify.success("Success");
                    }
                });
            },
            null);
    },
    'click .show': function (e, t) {
        this.ratesVal = JSON.stringify(this.rates);
        alertify.alert(fa("eye", "Exchange"), renderTemplate(showTpl, this));
    }
});

// Insert
Template.cpanel_exchangeInsert.onRendered(function () {
    configDate();
});

insertTpl.helpers({
    doc: function () {
        var baseCurrency = Cpanel.Collection.Setting.findOne().baseCurrency;

        if (baseCurrency == 'KHR') {
            var khr = 1;
        } else if (baseCurrency == 'USD') {
            var usd = 1;
        } else {
            var thb = 1;
        }

        return {base: baseCurrency, khr: khr, usd: usd, thb: thb};
    }
});

// Update
updateTpl.onRendered(function () {
    configDate();
});

// Hook
AutoForm.hooks({
    cpanel_exchangeInsert: {
        onSuccess: function (formType, result) {
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    cpanel_exchangeUpdate: {
        onSuccess: function (formType, error) {
            alertify.exchange().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

// Config on rendered
var configDate = function () {
    var name = $('[name="dateTime"]');
    DateTimePicker.dateTime(name);
};
