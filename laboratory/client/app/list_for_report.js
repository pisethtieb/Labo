// List for report
Laboratory.ListForReport = {
    branch: function () {
        var list = [];
        list.push({label: "(Select All)", value: ""});
        Cpanel.Collection.Branch.find()
            .forEach(function (obj) {
                list.push({label: obj.enName, value: obj._id});
            });

        return list;
    },
    exchange: function(){
        var list = [];
        list.push({label: 'Select One', value: ""});
        Cpanel.Collection.Exchange.find().fetch().forEach(function(exchange){
            list.push({label: JSON.stringify(exchange.rates), value: exchange._id});
        });
        return list;
    }
};
