// Declare template
var indexTpl = Template.laboratory_order,
    insertTpl = Template.laboratory_orderInsert,
    updateTpl = Template.laboratory_orderUpdate,
    showTpl = Template.laboratory_orderShow,

    customerSearchTpl = Template.laboratory_orderCustomerSearch,
    customerAddonTpl = Template.laboratory_customerInsert;

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
        var data = Laboratory.Collection.Order.findOne(this._id);

        alertify.order(fa("pencil", "Order"), renderTemplate(updateTpl, data))
            .maximize();
    },
    'click .remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Order"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Laboratory.Collection.Order.remove(self._id, function (error) {
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
        var data = Laboratory.Collection.Order.findOne({_id: this._id});

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
    laboratory_orderInsert: {
        before: {
            insert: function (doc) {
                var prefix = Session.get('currentBranch') + '-' + doc.customerId;
                doc._id = idGenerator.genWithPrefix(Laboratory.Collection.Order, prefix, 3);
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
    laboratory_orderUpdate: {
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
    laboratory_customerAddon: {
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Laboratory.Collection.Customer, 3);
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
    var data = Laboratory.Collection.Customer.findOne(id);
    if (!_.isUndefined(data.photo)) {
        data.photoUrl = Files.findOne(data.photo).url();
    } else {
        data.photoUrl = null;
    }

    return data;
};
