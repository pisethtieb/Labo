/**
 * Create new alertify
 */
createNewAlertify = function (names) {

    var alerts = _.isArray(names) ? names : [names];

    _.each(alerts, function (element) {

        var name = element;

        if (!alertify[name]) {
            alertify.dialog(name, function () {
                return {
                    setup: function () {
                        return {
                            options: {
                                maximizable: true,
                                closableByDimmer: false,
                                resizable: false,
                                transition: "fade"
                            }
                        };
                    },
                    prepare: function () {
                        this.elements.footer.style.visibility = "hidden";
                    }
                };
            }, false, 'alert');
        }

    });

};
