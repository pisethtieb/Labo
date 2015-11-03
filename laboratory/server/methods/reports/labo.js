Meteor.methods({
    laboratory_laboReport: function (params) {
        var data = {
            title: {},
            header: {},
            content: [{index: 'No Result'}],
            footer: {}
        };
        var total = 0,
            totalFee = 0,
            exchangeId = params.exchange,
            exchange = Cpanel.Collection.Exchange.findOne(exchangeId),
            date = s.words(params.date, ' To '),
            fDate = moment(date[0], 'YYYY-MM-DD').toDate(),
            tDate = moment(date[1], 'YYYY-MM-DD').add(1, 'days').toDate();
        fx.base = exchange.base;
        fx.rates = exchange.rates;
        /****** Title *****/

        data.title = Cpanel.Collection.Company.findOne();

        /****** Header *****/
        data.header = params;

        /****** Content *****/
        var content = [];
        var selector = {};

        if (!_.isEmpty(params.branch)) {
            selector.cpanel_branchId = params.branch;
        }
        if (!_.isEmpty(params.name)) {
            selector.name = {$regex: params.name, $options: 'i'};
        }

        var index = 1;
        Laboratory.Collection.Labo.find(selector)
            .forEach(function (obj) {
                // Do something
                obj.index = index;
                total += obj.total;
                totalFee += obj.totalFee;
                content.push(obj);
                index++;
            });

        if (content.length > 0) {
            data.content = content;
            data.footer = {
                total: total,
                totalFee: totalFee,
                totalInDollar: fx.convert(total, {from: 'KHR', to: 'USD'}),
                totalFeeInDollar: fx.convert(totalFee, {from: 'KHR', to: 'USD'})
            }
        }
        return data
    }
});
