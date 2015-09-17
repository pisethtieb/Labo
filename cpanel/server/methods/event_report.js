Meteor.methods({
    capnel_eventReport: function (params) {
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

        selector.userId = params.user;
        selector.createdAt = {$gte: fDate, $lt: tDate};
        if (!_.isEmpty(params.type)) {
            selector.type = params.type;
        }
        if (!_.isEmpty(params.module)) {
            selector.module = params.module;
        }
        if (!_.isEmpty(params.branch)) {
            selector.branch = params.branch;
        }

        var index = 1;
        var getEvent = Events.find(selector);

        getEvent.forEach(function (o) {
            var des = o.description;

            if (_.isString(des)) {
                des = JSON.parse(des);
            }

            des = JSON.stringify(des, null, ' ');
            des = s.humanize(des);

            content.push({
                index: index,
                date: moment(o.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                type: o.type,
                description: des,
                module: o.module,
                branch: o.branch
            });

            index++
        });

        if (content.length > 0) {
            data.content = content;
        }

        return data
    }
});
