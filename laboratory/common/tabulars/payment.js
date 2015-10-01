// Payment
Laboratory.TabularTable.Payment = new Tabular.Table({
    name: "Laboratory_paymentList",
    collection: Laboratory.Collection.Payment,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.laboratory_paymentAction},
        {data: "_id", title: "ID"},
        {data: "paymentDate", title: "Date"},
        {data: "_patient.name", title: "Patient"},
        {data: "overdueAmount", title: "Over Amount"},
        {data: "paidAmount", title: "Paid Amount"},
        {
            data: "outstandingAmount", title: "Out Amount"
        },
        {
            data: "status",
            title: "Status",
            render: function (val, type, doc) {
                return labelCon(val, "Full", "success", "danger");
            }
        }


    ]
});