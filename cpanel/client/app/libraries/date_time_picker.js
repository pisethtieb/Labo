DateTimePicker = {
    // dateTimePicker
    date: function (elements, options) {
        elements = _.isArray(elements) ? elements : [elements];
        options = _.isObject(options) ? options : {};

        _.defaults(options, {
            format: 'YYYY-MM-DD'
        });

        _.forEach(elements, function (element) {
            element.datetimepicker(options);
        });
    },
    dateTime: function (elements, options) {
        elements = _.isArray(elements) ? elements : [elements];
        options = _.isObject(options) ? options : {};

        _.defaults(options, {
            format: 'YYYY-MM-DD HH:mm:ss'
        });

        _.forEach(elements, function (element) {
            element.datetimepicker(options);
        });
    },
    time: function (elements, options) {
        elements = _.isArray(elements) ? elements : [elements];
        options = _.isObject(options) ? options : {};

        _.defaults(options, {
            format: 'HH:mm:ss'
        });

        _.forEach(elements, function (element) {
            element.datetimepicker(options);
        });
    },
    // datePicker
    date2: function (elements, options) {
        elements = _.isArray(elements) ? elements : [elements];
        options = _.isObject(options) ? options : {};

        _.defaults(options, {
            format: 'yyyy-mm-dd',
            //clearBtn: true,
            //todayBtn: "linked",
            todayHighlight: true,
            autoclose: true
        });

        _.forEach(elements, function (element) {
            element.datepicker(options);
        });
    },
    // dateRange
    dateRange: function (elements, options) {
        elements = _.isArray(elements) ? elements : [elements];
        options = _.isObject(options) ? options : {};

        _.defaults(options, {
            format: 'YYYY-MM-DD',
            separator: ' To '
        });

        _.forEach(elements, function (element) {
            element.daterangepicker(options);
        });
    },
    dateTimeRange: function (elements, options) {
        elements = _.isArray(elements) ? elements : [elements];
        options = _.isObject(options) ? options : {};

        _.defaults(options, {
            timePicker: true,
            format: 'YYYY-MM-DD HH:mm:ss',
            separator: ' To ',
            timePickerIncrement: 5,
            timePicker12Hour: false,
            timePickerSeconds: true
        });

        _.forEach(elements, function (element) {
            element.daterangepicker(options);
        });
    }
};
