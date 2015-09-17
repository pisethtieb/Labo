var view = null;
var $modal = null;

// The public API.
ModalTemplate = {

    show: function (templateName, data) {

        // Only show the modal if no modal is shown at the moment.
        // See issue #2.
        //if($modal == null){

        var template = Template.modal_template;
        var data = {
            templateName: templateName,
            data: data
        };
        var parentNode = document.body;

        view = Blaze.renderWithData(template, data, parentNode);

        //}

    },

    hide: function (selector) {
        selector.modal('hide');
    }
    //hide: function () {
    //    $modal.modal('hide');
    //}

};


// The modal template.
var templateName = 'modal_template';

Template[templateName].onRendered(function () {

    var template = this;

    $modal = template.$('.modal');

    $modal.modal();

    $modal.on('shown.bs.modal', function (event) {
        template.$('[autofocus]').focus();
        modalMaxHeight();
    });

    $modal.on('hidden.bs.modal', function (event) {
        Blaze.remove(view);
        $modal = null;
        view = null;
    });

});