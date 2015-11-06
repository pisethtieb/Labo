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
    exchange: function () {
        var list = [];
        list.push({label: 'Select One', value: ""});
        Cpanel.Collection.Exchange.find().fetch().forEach(function (exchange) {
            list.push({label: JSON.stringify(exchange.rates), value: exchange._id});
        });
        return list;
    },

    staffId: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select All)", value: ""});
        }
        /*Laboratory.Collection.Labo.find()
         .forEach(function (obj) {
         var element = {label: obj.staffId + ' : ' + obj._staff.name, value: obj.staffId};
         debugger;
         if(list.indexOf(element)==-1){
         list.push(element);
         }
         });*/
        Laboratory.Collection.Staff.find().forEach(function (s) {
            var labo = Laboratory.Collection.Labo.findOne({staffId: s._id});
            if (labo != null) {
                list.push({label: labo.staffId + ' : ' +labo._staff.name, value: labo.staffId});
            }
        });
        return list;
    },
    agentId: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select All)", value: ""});
        }

        Laboratory.Collection.Agent.find().forEach(function (s) {
            var labo = Laboratory.Collection.Labo.findOne({agentId: s._id});
            if (labo != null) {
                list.push({label: labo.agentId + ' : ' +labo._agent.name, value: labo.agentId});
            }
        });
        return list;
    },
    patientId: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select All)", value: ""});
        }
        Laboratory.Collection.Patient.find().forEach(function (s) {
            var labo = Laboratory.Collection.Labo.findOne({patientId: s._id});
            if (labo != null) {
                list.push({label: labo.patientId + ' : ' +labo._patient.name, value: labo.patientId});
            }
        });
        return list;
    }
};

