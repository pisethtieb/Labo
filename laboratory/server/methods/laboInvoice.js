Meteor.methods({
    labo_invoice: function (laboId) {
        var data = {
            title: {},
            header: {},
            content: [{index: 'No Item'}],
            footer: {},
            custom: {}
        };
        var exchange = Cpanel.Collection.Exchange.findOne({}, {sort: {dateTime: -1}});
        fx.base = exchange.base;
        fx.rates = exchange.rates;
        /****** Title *****/
        data.title = Cpanel.Collection.Company.findOne();
        /****** Header *****/
        //  data.header = params;
        /****** Content *****/
        var labo = Laboratory.Collection.Labo.findOne(laboId);
        var content = [labo];
        var index = 1;

        labo.laboItem.forEach(function (item) {
            item.itemName = Laboratory.Collection.Items.findOne({_id: item.itemId}).name;
            item.index = index++;
        });
        data.payment = [];
        var payment = Laboratory.Collection.Payment.find({
            laboId: laboId
        });
        var totalPaid = 0;
        if (payment.count() > 0) {
            var i = 1;

            payment.forEach(function (obj) {
                obj.index = i;
                totalPaid += parseFloat(obj.paidAmount);
                i++;
                data.payment.push(obj);
            });
        }
        lastPayment=Laboratory.Collection.Payment.findOne({laboId:laboId},{sort:{_id:-1}});
        data.paymentStaff=lastPayment._staff;
        data.paymentDate=lastPayment.paymentDate;

        data.totalPaid=totalPaid;
        data.outstadingAmount=labo.total-totalPaid;
        //console.log(index);
        data.content = content;
        data.header = labo;
        data.header.date = moment().format('DD-MM-YYYY');
        data.footer = labo;
        data.outstadingAmountIndolar = numeral(fx.convert( data.outstadingAmount, {from: 'KHR', to: 'USD'})).format('0,0.00');

        return data
    }
});