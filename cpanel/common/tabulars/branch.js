Cpanel.TabularTable.Branch = new Tabular.Table({
    name: "cpanelBranchList",
    collection: Cpanel.Collection.Branch,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.cpanel_branchAction},
        {
            data: "_id",
            title: "ID",
            render: function (val, type, doc) {
                var setting = Cpanel.Collection.Setting.findOne();

                if (val != setting.headOffice) {
                    return val;
                }

                return '<u class="text-primary">' + val + '</u>';
            }
        },
        {data: "khName", title: "Kh Name"},
        //{data: "khShortName", title: "Kh Short Name"},
        {data: "enName", title: "En Name"},
        //{data: "enShortName", title: "En Short Name"},
        {data: "khAddress", title: "Kh Address"},
        {data: "enAddress", title: "En Address"},
        {data: "telephone", title: "Telephone"},
        //{data: "email", title: "Email"}
    ]
});