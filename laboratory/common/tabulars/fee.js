// Payment
Laboratory.TabularTable.Fee = new Tabular.Table({
    name: "Laboratory_feeList",
    collection: Laboratory.Collection.Fee,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.laboratory_feeAction},
        {data: "_id", title: "ID"},
        {data: "feeDate", title: "Date"},
        {data: "_agent.name", title: "Agent"},
        {data: "laboId", title: "labo"},
        {data: "staffId", title: "Staff"},
        {data: "overdueAmount", title: "Over Amount"},
        {data: "paidAmount", title: "Paid Amount"},
        {data: "outstandingAmount", title: "Out Amount"},
        {data: "status", title: "Status",
            render: function (val, type, doc) {
                return labelCon(val, "Full", "success", "danger");
            }
        }


    ]
});