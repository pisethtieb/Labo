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
        if (content.length > 0) {
            labo.laboItem.forEach(function (item) {
                item.itemName = Laboratory.Collection.Items.findOne({_id: item.itemId}).name;
                item.index = index++;
            });
            var payment = Laboratory.Collection.Payment.findOne({laboId: laboId}, {sort: {_id: -2}});
            if (payment !=null){
                var N=1;
                data.custom = payment;
                data.custom.N = N++;

            }

            //console.log(index);
            data.content = content;

            data.header = labo;
            data.header.date = moment().format('DD-MM-YYYY');
            data.footer = labo;
            data.footer.totalInDollar = numeral(fx.convert(labo.total, {from: 'KHR', to: 'USD'})).format('0,0.00');
        }
        return data
    }
});