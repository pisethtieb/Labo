Layout = {
    main: function (regions) {
        render('mainLayout', regions);
    },
    report: function (regions) {
        render('reportLayout', regions);
    },
    render: function (layout, regions) {
        render(layout, regions);
    }
};

var render = function (layout, regions) {
    if (typeof regions !== 'object') {
        regions = {content: regions};
    }

    BlazeLayout.render(layout, regions);
};