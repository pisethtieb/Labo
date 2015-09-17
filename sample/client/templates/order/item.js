// Declare template
var itemTpl = Template.sample_orderItem;

// Items state
itemsState = new ReactiveList();
var state = new ReactiveObj({
    qty: 0,
    price: 0,
    cssClassForAddMore: 'disabled'
});

/**
 * Items
 */
itemTpl.onCreated(function () {
    itemsState.clear();

    // Check form type
    var data = Template.currentData();
    if (!_.isUndefined(data)) {
        _.each(data.items, function (obj, key) {
            obj.indexNmae = 'items.' + key + '.name';
            obj.indexQty = 'items.' + key + '.qty';
            obj.indexPrice = 'items.' + key + '.price';
            obj.indexAmount = 'items.' + key + '.amount';

            itemsState.insert(obj.name, obj);
        });
    }
});

itemTpl.onRendered(function () {
    itemsInputmask();
});

itemTpl.helpers({
    tmpAmount: function () {
        var tmpAmountVal = math.round(state.get('qty') * state.get('price'), 2);
        return tmpAmountVal;
    },
    cssClassForAddMore: function () {
        var tmpAmountVal = math.round(state.get('qty') * state.get('price'), 2);
        if (tmpAmountVal > 0) {
            state.set('cssClassForAddMore', '');
        } else {
            state.set('cssClassForAddMore', 'disabled');
        }

        return state.get('cssClassForAddMore');
    },
    items: function () {
        return itemsState.fetch();
    },
    total: function () {
        var totalVal = 0;
        _.each(itemsState.fetch(), function (o) {
            totalVal += o.amount;
        });

        return totalVal;
    }
});

itemTpl.events({
    'keyup [name="tmpQty"]': function (e, t) {
        var qty = t.$('[name="tmpQty"]').val();
        qty = _.isEmpty(qty) ? 0 : parseInt(qty);

        state.set('qty', qty);
    },
    'keyup [name="tmpPrice"]': function (e, t) {
        var price = t.$('[name="tmpPrice"]').val();
        price = _.isEmpty(price) ? 0 : parseFloat(price);

        state.set('price', price);
    },
    'click .addItem': function (e, t) {
        var index = 0;
        var item = {};
        item.name = t.$('[name="tmpName"]').val();
        item.qty = parseInt(t.$('[name="tmpQty"]').val());
        item.price = math.round(parseFloat(t.$('[name="tmpPrice"]').val()), 2);
        item.amount = math.round(item.qty * item.price, 2);

        // Check items exist
        if (itemsState.length() > 0) {
            // Check duplicate
            var duplicate = itemsState.get(item.name);
            if (!_.isUndefined(duplicate)) {
                item.qty = duplicate.qty + item.qty;
                item.amount = math.round(item.qty * item.price, 2);

                itemsState.update(item.name, {
                    qty: item.qty,
                    price: item.price,
                    amount: item.amount
                });

                return false;
            } else {
                index = itemsState.last().index + 1;
            }
        }

        item.indexNmae = 'items.' + index + '.name';
        item.indexQty = 'items.' + index + '.qty';
        item.indexPrice = 'items.' + index + '.price';
        item.indexAmount = 'items.' + index + '.amount';

        itemsState.insert(item.name, item);
    },
    'blur .addItem': function (e, t) {
        itemsInputmask();
    },
    'click .removeItem': function (e, t) {
        var self = this;
        itemsState.remove(self.name);
    },
    'keyup .qty': function (e, t) {
        var current = $(e.currentTarget);
        var name = current.parents('div.row.list').find('.name').val();
        var getItem = itemsState.get(name);

        console.log(name);

        var qty = parseInt(current.val());
        var amount = math.round(qty * getItem.price, 2);
        itemsState.update(name, {
            qty: qty,
            amount: amount
        });
    },
    'keyup .price': function (e, t) {
        var current = $(e.currentTarget);
        var name = current.parents('div.row.list').find('.name').val();
        var getItem = itemsState.get(name);

        console.log(name);

        var price = parseFloat(current.val());
        var amount = math.round(getItem.qty * price, 2);
        itemsState.update(name, {
            price: price,
            amount: amount
        });
    }
});

/**
 * Input mask
 */
var itemsInputmask = function () {
    var tmpQty = $('[name="tmpQty"]');
    var tmpPrice = $('[name="tmpPrice"]');
    var tmpAmount = $('[name="tmpAmount"]');

    var qty = $('.qty');
    var price = $('.price');
    var amount = $('.amount');
    var total = $('[name="total"]');

    Inputmask.currency([tmpPrice, tmpAmount, price, amount, total]);
    Inputmask.integer([tmpQty, qty]);
};