Meteor.startup(function () {

    alertify.defaults = {
        // dialogs defaults
        modal: true,
        basic: false,
        frameless: false,
        movable: true,
        resizable: true,
        closable: true,
        closableByDimmer: true,
        maximizable: true,
        startMaximized: false,
        pinnable: true,
        pinned: true,
        padding: true,
        overflow: true,
        maintainFocus: true,
        transition: 'fade',
        autoReset: true,

        // notifier defaults
        notifier: {
            // auto-dismiss wait time (in seconds)
            delay: 5,
            // default position
            position: 'bottom-right'
        },

        // language resources
        glossary: {
            // dialogs default title
            title: 'AlertifyJS',
            // ok button text
            ok: 'OK',
            // cancel button text
            cancel: 'Cancel'
        },

        // theme settings
        theme: {
            // class name attached to prompt dialog input textbox.
            input: 'ajs-input',
            // class name attached to ok button
            ok: 'ajs-ok',
            // class name attached to cancel button
            cancel: 'ajs-cancel'
        }
    };

});
