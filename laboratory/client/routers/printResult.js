

LaboratoryRoutes.route('/result/print/:resultId', {
    name: 'laboratory.printResult',
    action: function (params, queryParams) {
        Layout.report('laboratory_printResult');
    }
});
