// List
Laboratory.ListState = new ReactiveObj();

Laboratory.List = {
    gender: function () {
        var list = [];
        list.push({label: "(Select One)", value: ""});
        list.push({label: 'Male', value: 'M'});
        list.push({label: 'Female', value: 'F'});

        return list;
    },
    address: function () {
        var list = [];
        list.push({label: "(Select One)", value: ""});

        // Set default for update
        var id = Laboratory.ListState.get(['customer', 'addressId']);
        Laboratory.Collection.Address.find(id)
            .forEach(function (obj) {
                list.push({label: obj._id + ' : ' + obj.name, value: obj._id});
            });

        return list;
    },
    customer: function () {
        var list = [];
        list.push({label: "(Select One)", value: ""});

        Laboratory.Collection.Customer.find()
            .forEach(function (obj) {
                list.push({label: obj._id + ' : ' + obj.name, value: obj._id});
            });

        return list;
    },
    maritalStatus: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select One)", value: ""});
        }
        list.push({label: 'Single', value: 'single'});
        list.push({label: 'Married', value: 'married'});
        list.push({label: 'Divorce', value: 'divorce'});
        list.push({label: 'Unknown', value: 'unknown'});
        return list;
    },
    position: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select One)", value: ""});
        }
        list.push({label: 'Cashier', value: 'cashier'});
        list.push({label: 'Accountant', value: 'accountant'});
        list.push({label: 'Admin', value: 'admin'});
        list.push({label: 'Director', value: 'director'});
        return list;
    },
    paymentStatus: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select One)", value: ""});
        }
        list.push({label: 'Partial', value: 'p'});
        list.push({label: 'Full', value: 'f'});
        return list;
    },
    child: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select One)", value: ""});
        }
        list.push({label: 'Yes', value: 'yes'});
        list.push({label: 'No', value: 'no'});
        return list;
    },
    feeType: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select One)", value: ""});
        }
        list.push({label: 'Amount', value: 'amount'});
        list.push({label: 'Percent', value: 'percent'});

        return list;
    },
    categoryId: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select One)", value: ""});
        }
        Laboratory.Collection.Category.find()
            .forEach(function (obj) {
                list.push({label: obj._id + ' : ' + obj.name, value: obj._id});
            });
        return list;
    },
    staffId: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select One)", value: ""});
        }

        Laboratory.Collection.Staff.find()
            .forEach(function (obj) {
                list.push({label: obj._id + ' : ' + obj.name, value: obj._id});
            });
        return list;
    },
    agentId: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select One)", value: ""});
        }

        Laboratory.Collection.Agent.find()
            .forEach(function (obj) {
                list.push({label: obj._id + ' : ' + obj.name, value: obj._id});
            });
        return list;
    },
    patientId: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select One)", value: ""});
        }
        Laboratory.Collection.Patient.find()
            .forEach(function (obj) {
                list.push({label: obj._id + ' : ' + obj.name, value: obj._id});
            });
        return list;
    },
    itemId: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select One)", value: ""});
        }
        Laboratory.Collection.Items.find()
            .forEach(function (obj) {
                list.push({label: obj._id + ' : ' + obj.name, value: obj._id});
            });
        return list;
    },
    Append: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select One)", value: ""});
        }
        //list.push({label: 'Select-One', value: 'Select-One'});
        list.push({label: '/mm3', value: '/mm3'});
        list.push({label: '/ ul', value: '/ ul'});
        list.push({label: '%', value: '%'});
        list.push({label: ', Rh ( + )', value: ', Rh ( + )'});
        list.push({label: 'g / dl', value: 'g / dl'});
        list.push({label: 'fl', value: 'fl'});
        list.push({label: 'g / l', value: 'g / l'});
        list.push({label: 'M / mm3', value: 'M / mm3'});
        list.push({label: 'mg / dl', value: 'mg / dl'});
        list.push({label: 'mg / L', value: 'mg / L'});
        list.push({label: 'Million / mm3', value: 'Million / mm3'});
        list.push({label: 'mIU / l', value: 'mIU / l'});
        list.push({label: 'ml', value: 'ml'});
        list.push({label: 'mm', value: 'mm'});
        list.push({label: 'mn , sec', value: 'mn , sec'});
        list.push({label: 'ng / dl', value: 'ng / dl'});
        list.push({label: 'pg', value: 'pg'});
        list.push({label: 'pg / ml', value: 'pg / ml'});
        list.push({label: 'U / ml', value: 'U / ml'});
        list.push({label: 'UI /', value: 'UI /'});
        list.push({label: 'umol / l', value: 'umol / l'});
        return list;
    },
    prepend: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select One)", value: ""});
        }
        //list.push({label: 'Select-One', value: 'Select-One'});
        list.push({label: '/A', value: '/a'});
        list.push({label: '/B', value: '/b'});
        list.push({label: '/C', value: '/c'});
        list.push({label: '/D', value: '/d'});
        return list;
    },
    //onchange
    laboIdPayment: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select One)", value: ""});
        }
        //var patientId = Labo.ListForSale.get('patientId');
        var patientId = Session.get('patientId');

        if (patientId != null) {
            Laboratory.Collection.Labo.find({patientId: patientId}).forEach(function (obj) {
                //var patient = Dental.Collection.Patient.findOne({_id: obj.patientId});
                var payment = Laboratory.Collection.Payment.findOne({
                        laboId: obj._id,
                    },
                    {
                        sort: {
                            _id: -1
                        }
                    });

                if (payment != null && payment.outstandingAmount > 0 && payment.status == "Partial") {
                    list.push({
                        label: "ID : " + obj._id + " | " + " : " + obj.laboDate + " | " + "Amount : " + payment.outstandingAmount,
                        value: obj._id

                    });
                } else if (payment == null) {
                    list.push({
                        label: "ID : " + obj._id + " | " + " : " + obj.laboDate + " | " + "Amount : " + obj.total,
                        value: obj._id

                    });
                }
            });
        }

        return list;
    },
    //on change for fee
    laboIdFee: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select One)", value: ""});
        }
        //var patientId = Labo.ListForSale.get('patientId');
        var agentId = Session.get('agentId');

        if (agentId != null) {
            Laboratory.Collection.Labo.find({agentId: agentId}).forEach(function (obj) {
                //var patient = Dental.Collection.Patient.findOne({_id: obj.patientId});
                var fee = Laboratory.Collection.Fee.findOne({
                        laboId: obj._id,
                    },
                    {
                        sort: {
                            _id: -1
                        }
                    });

                if (fee != null && fee.outstandingAmount > 0 && fee.status == "Partial") {
                    list.push({
                        label: "ID : " + obj._id + " | " + " : " + obj.laboDate + " | " + "Amount : " + fee.outstandingAmount,
                        value: obj._id

                    });
                } else if (fee == null) {
                    list.push({
                        label: "ID : " + obj._id + " | " + " : " + obj.laboDate + " | " + "Free : " + obj.totalFee,
                        value: obj._id

                    });
                }
            });
        }
        return list;
    }
};
