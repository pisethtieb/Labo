Meteor.methods({
    laboratory_laboBalanceReport: function (params) {
        var data = {
            title: {},
            header: {},
            content: [{index: 'No Result'}],
            footer: {}
        };
        var total = 0,
            overdueAmount = 0,
            paidAmount = 0,
            outstandingAmount = 0,
            exchangeId = params.exchange,
            patientId = params.patientId,
            staffId = params.staffId,
            agentId = params.agentId,
            exchange = Cpanel.Collection.Exchange.findOne(exchangeId);
        fx.base = exchange.base;
        fx.rates = exchange.rates;


        /****** Title *****/

        data.title = Cpanel.Collection.Company.findOne();
        if (params.patientId == '') {
            params.patient = 'All'

        } else {
            var patient = Laboratory.Collection.Patient.findOne(params.patientId);
            params.patient = patient.name;
        }

        if (params.staffId == '') {
            params.staff = 'All'

        } else {
            var staff = Laboratory.Collection.Staff.findOne(params.staffId);
            params.staff = staff.name;
        }
        if (params.agentId == '') {
            params.agent = 'All'

        } else {
            params.agent = Laboratory.Collection.Agent.findOne(params.agentId).name;
        }
        var exchangeRate = JSON.stringify(Cpanel.Collection.Exchange.findOne(exchangeId).rates);
        params.exchangeRate = exchangeRate.substr(1, exchangeRate.length - 2);
        /****** Header *****/
        data.header = params;

        /****** Content *****/
        var content = [];
        var selector = {};
        if (!_.isEmpty(patientId)) {
            selector.patientId = patientId;
        }
        if (!_.isEmpty(staffId)) {
            selector.staffId = staffId;
        }
        if (!_.isEmpty(agentId)) {
            selector.agentId = agentId;
        }
        if (!_.isEmpty(params.branch)) {
            selector.cpanel_branchId = params.branch;
        }
        selector.laboDate = {$lte: moment(params.date + ' 23:59:59').format('YYYY-MM-DD HH:mm:ss')};

        var content = [];
        var index = 1;
        Laboratory.Collection.Labo.find(selector)
            .forEach(function (obj) {

                var payment = Laboratory.Collection.Payment.findOne({laboId: obj._id}, {sort: {_id: -1}});
                if (payment == null) {
                    var laboObj = {};
                    total += obj.total;
                    laboObj.index = index;
                    laboObj._id = obj._id;
                    laboObj.laboDate = obj.laboDate;
                    laboObj.patientId = obj._patient.name;
                    laboObj.staffId = obj._staff.name;
                    laboObj.agentId = obj._agent.name;
                    laboObj.total = numeral(obj.total).format('0,0');
                    laboObj.outstandingAmount =  numeral(obj.total).format('0,0');

                    outstandingAmount += obj.total;
                    content.push(laboObj);
                } else if (payment.outstandingAmount > 0) {
                    var laboObj = {};
                    total += obj.total;
                    overdueAmount += payment.overdueAmount;
                    paidAmount += payment.paidAmount;
                    outstandingAmount += payment.outstandingAmount;
                    laboObj.index = index;
                    laboObj._id = obj._id;
                    laboObj.laboDate = obj.laboDate;
                    laboObj.patientId = obj._patient.name;
                    laboObj.staffId = obj._staff.name;
                    laboObj.paymentDate = payment.paymentDate;
                    laboObj.overdueAmount = numeral(payment.overdueAmount).format('0,0');
                    laboObj.paidAmount = numeral(payment.paidAmount).format('0,0');
                    laboObj.outstandingAmount = numeral(payment.outstandingAmount).format('0,0');
                    laboObj.agentId = obj._agent.name;
                    laboObj.total = numeral(obj.total).format('0,0');
                    laboObj.paymentStaff = payment._staff.name;
                    content.push(laboObj);
                }
                // Do something
                index++;
            });

        if (content.length > 0) {
            data.content = content;
            data.footer = {
                totalInDollar: numeral(fx.convert(total, {from: 'KHR', to: 'USD'})).format('0,0.00'),
                overdueAmountInDollar: numeral(fx.convert(overdueAmount, {from: 'KHR', to: 'USD'})).format('0,0.00'),
                outstandingAmountInDollar: numeral(fx.convert(outstandingAmount, {
                    from: 'KHR',
                    to: 'USD'
                })).format('0,0.00'),
                paidAmountInDollar: numeral(fx.convert(paidAmount, {from: 'KHR', to: 'USD'})).format('0,0.00'),
                outstandingAmount: numeral(outstandingAmount).format('0,0'),
                paidAmount: numeral(paidAmount).format('0,0'),
                overdueAmount: numeral(overdueAmount).format('0,0'),
                total: numeral(total).format('0,0')
            }
        }
        //console.log(outstandingAmount);
        return data
    }
});
