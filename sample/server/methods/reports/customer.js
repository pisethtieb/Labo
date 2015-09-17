Meteor.methods({
    sample_customerReport: function (params) {
        var data = {
            title: {},
            header: {},
            content: [{index: 'No Result'}],
            footer: {}
        };

        var date = s.words(params.date, ' To ');
        var fDate = moment(date[0], 'YYYY-MM-DD').toDate();
        var tDate = moment(date[1], 'YYYY-MM-DD').add(1, 'days').toDate();

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
        Sample.Collection.Customer.find(selector)
            .forEach(function (obj) {
                // Do something
                obj.index = index;

                content.push(obj);

                index++;
            });

        if (content.length > 0) {
            data.content = content;
        }

        return data
    }
});
