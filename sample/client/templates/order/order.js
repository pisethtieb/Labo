// Declare template
var indexTpl = Template.sample_order,
    insertTpl = Template.sample_orderInsert,
    updateTpl = Template.sample_orderUpdate,
    showTpl = Template.sample_orderShow,

    customerSearchTpl = Template.sample_orderCustomerSearch,
    customerAddonTpl = Template.sample_customerInsert;

// Index
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Order',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify(['order', 'customer', 'customerSearch']);
});

indexTpl.onRendered(function () {
    //
});

indexTpl.helpers({
    tabularSelector: function () {
        return {customerId: FlowRouter.getParam('customerId')};
    },
    customer: function () {
        return getCurrentCustomer();
    }
});

indexTpl.events({
    'click .insert': function (e, t) {
        alertify.order(fa("plus", "Order"), renderTemplate(insertTpl))
            .maximize();
    },
    'click .update': function (e, t) {
        var data = Sample.Collection.Order.findOne(this._id);

        alertify.order(fa("pencil", "Order"), renderTemplate(updateTpl, data))
            .maximize();
    },
    'click .remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Order"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Sample.Collection.Order.remove(self._id, function (error) {
                    if (error) {
                        alertify.error(error.message);
                    } else {
                        alertify.success("Success");
                    }
                });
            },
            null
        );

    },
    'click .show': function (e, t) {
        var data = Sample.Collection.Order.findOne({_id: this._id});

        alertify.alert(fa("eye", "Order"), renderTemplate(showTpl, data));
    }
});

indexTpl.onDestroyed(function () {
    //
});

// Insert
insertTpl.onRendered(function () {
    datePicker();
});

insertTpl.helpers({
    customer: function () {
        return getCurrentCustomer();
    }
});

insertTpl.events({
    'click [name="customerId"]': function (e, t) {
        var val = $('[name="customerId"]').val();
        var data = {data: val};

        alertify.customerSearch(fa("list", "Customer Search List"), renderTemplate(customerSearchTpl, data));
    },
    'click .customerAddon': function (e, t) {
        alertify.customer(fa("plus", "Customer"), renderTemplate(customerAddonTpl));
    },
    // Test search list change
    'change [name="customerId"]': function () {
        $('[name="des"]').val('Customer is changed');
    }
});

insertTpl.onDestroyed(function () {
});

// Update
updateTpl.onRendered(function () {
    datePicker();
});

updateTpl.helpers({});

updateTpl.events({
    'click [name="customerId"]': function (e, t) {
        var val = $('[name="customerId"]').val();
        var data = {data: val};

        alertify.customerSearch(fa("list", "Customer Search List"), renderTemplate(customerSearchTpl, data));
    },
    'click .customerAddon': function (e, t) {
        alertify.customer(fa("plus", "Customer"), renderTemplate(customerAddonTpl));
    }
});

updateTpl.onDestroyed(function () {
});

// Hook
AutoForm.hooks({
    // Order
    sample_orderInsert: {
        before: {
            insert: function (doc) {
                var prefix = Session.get('currentBranch') + '-' + doc.customerId;
                doc._id = idGenerator.genWithPrefix(Sample.Collection.Order, prefix, 3);
                doc.cpanel_branchId = Session.get('currentBranch');
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            itemsState.clear();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    sample_orderUpdate: {
        docToForm: function (doc, ss) {
            doc.orderDate = moment(doc.orderDate).format('YYYY-MM-DD');
            return doc;
        },
        onSuccess: function (formType, result) {
            alertify.order().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    // Customer addon
    sample_customerAddon: {
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Sample.Collection.Customer, 3);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            //alertify.customer().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

// Config date picker
var datePicker = function () {
    var dob = $('[name="orderDate"]');
    DateTimePicker.date(dob);
};

// Customer search
customerSearchTpl.events({
    'click .item': function (e, t) {
        $('[name="customerId"]').val(this._id);
        $('[name="customerId"]').change();

        alertify.customerSearch().close();
    }
});

// Get current customer
var getCurrentCustomer = function () {
    var id = FlowRouter.getParam('customerId');
    var data = Sample.Collection.Customer.findOne(id);
    if (!_.isUndefined(data.photo)) {
        data.photoUrl = Files.findOne(data.photo).url();
    } else {
        data.photoUrl = null;
    }

    return data;
};
