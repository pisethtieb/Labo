

LaboratoryRoutes.route('/labo/invoice/:laboId', {
    name: 'laboratory.laboInvoice',
    action: function (params, queryParams) {
        Layout.report('laboratory_laboInvoice');
    }
});
