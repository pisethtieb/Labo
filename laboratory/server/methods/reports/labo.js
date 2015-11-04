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
            patientId = params.patientId,
            staffId = params.staffId,
            agentId = params.agentId,
            exchange = Cpanel.Collection.Exchange.findOne(exchangeId);
            date = s.words(params.date, ' To '),
            fDate = date[0],
            newDate = new Date(date[1]);
        var tDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 1);
        tDate = moment(tDate).format('YYYY-MM-DD');
        fx.base = exchange.base;
        fx.rates = exchange.rates;

        /****** Title *****/

        data.title = Cpanel.Collection.Company.findOne();
        if (params.patientId == '') {
            params.patient = 'All'

        } else {
            var patient=Laboratory.Collection.Patient.findOne(params.patientId);
            params.patient = patient.name;
        }

        if (params.staffId == '') {
            params.staff = 'All'

        } else {
            var staff=Laboratory.Collection.Staff.findOne(params.staffId);
            params.staff = staff.name;
        }
        if (params.agentId == '') {
            params.agent = 'All'

        } else {
            params.agent = Laboratory.Collection.Agent.findOne(params.agentId).name;
        }
        var exchangeRate=JSON.stringify(Cpanel.Collection.Exchange.findOne(exchangeId).rates);
        params.exchangeRate=exchangeRate.substr(1,exchangeRate.length-2);
        /****** Header *****/
        data.header = params;

        /****** Content *****/
        var content = [];
        var selector = {};
        selector.laboDate = {$gte: fDate, $lte: tDate};
        if (!_.isEmpty(patientId)) {
            selector.patientId = patientId;
        }
        if (!_.isEmpty(staffId)) {
            selector.staffId = 0;
        }
        if (!_.isEmpty(agentId)) {
            selector.agentId = agentId;
        }
        if (!_.isEmpty(params.branch)) {
            selector.cpanel_branchId = params.branch;
        }


        var index = 1;
        console.log(selector);
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
