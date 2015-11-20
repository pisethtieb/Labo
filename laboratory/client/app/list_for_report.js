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

    //list Report Labo
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
                list.push({label: labo.staffId + ' : ' + labo._staff.name, value: labo.staffId});
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
                list.push({label: labo.agentId + ' : ' + labo._agent.name, value: labo.agentId});
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
                list.push({label: labo.patientId + ' : ' + labo._patient.name, value: labo.patientId});
            }
        });
        return list;

    },
    //list report for Payment Report
    staffPId: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select All)", value: ""});
        }

        Laboratory.Collection.Staff.find().forEach(function (s) {
            var payment = Laboratory.Collection.Payment.findOne({staffId: s._id});
            if (payment != null) {
                list.push({label: payment.staffId + ' : ' + payment._staff.name, value: payment.staffId});
            }
        });
        return list;
    },

    agentPId: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select All)", value: ""});
        }

        Laboratory.Collection.Agent.find().forEach(function (s) {
            var payment = Laboratory.Collection.Payment.findOne({agentId: s._id});
            if (payment != null) {
                list.push({label: payment.agentId + ' : ' + payment._agent.name, value: payment.agentId});
            }
        });
        return list;
    },
    patientPId: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select All)", value: ""});
        }
        Laboratory.Collection.Patient.find().forEach(function (s) {
            var payment = Laboratory.Collection.Payment.findOne({patientId: s._id});
            if (payment != null) {
                list.push({label: payment.patientId + ' : ' + payment._patient.name, value: payment.patientId});
            }
        });
        return list;
    },
    /// for Fee
    feeStaffId: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select All)", value: ""});
        }

        Laboratory.Collection.Staff.find().forEach(function (s) {
            var fee = Laboratory.Collection.Fee.findOne({staffId: s._id});
            if (fee != null) {
                list.push({label: fee.staffId + ' : ' + fee._staff.name, value: fee.staffId});
            }
        });
        return list;
    },

    feeAgentId: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select All)", value: ""});
        }

        Laboratory.Collection.Agent.find().forEach(function (s) {
            var fee = Laboratory.Collection.Fee.findOne({agentId: s._id});
            if (fee != null) {
                list.push({label: fee.agentId + ' : ' + fee._agent.name, value: fee.agentId});
            }
        });
        return list;
    },
    feePatientId: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select All)", value: ""});
        }
        Laboratory.Collection.Patient.find().forEach(function (s) {
            var fee = Laboratory.Collection.Fee.findOne({patientId: s._id});
            if (fee != null) {
                list.push({label: fee.patientId + ' : ' + fee._patient.name, value: fee.patientId});
            }
        });
        return list;
    }
};

