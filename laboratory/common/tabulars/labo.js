// Address
Laboratory.TabularTable.Labo = new Tabular.Table({
    name: "Laboratory_laboList",
    collection: Laboratory.Collection.Labo,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    extraFields: ['patientId'],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.laboratory_laboAction},
        {data: "_id", title: "ID"},
        {data: "laboDate", title: "labo Date"},
        {
            data: "total", title: "Total",
            render: function (val, type, doc) {
                return numeral(val).format('0,0.00') + ' R'
            }
        },
        {
            data: "totalFee", title: "Fee Amount",
            render: function (val, type, doc) {
                return numeral(val).format('0,0.00') + ' R'
            }
        },
        {data: "_staff.name", title: "Staff"},
        {data: "_agent.name", title: "Agent"},
        //{data: "_patient.name", title: "Patient"},
        {
            data: "_paymentCount",
            title: "Pay+",
            tmpl: Meteor.isClient && Template.laboratory_paymentLinkAction
        }
        //{
        //    data: "block",
        //    title: "Blocked",
        //    render: function(val,type, doc){
        //        return labelCon(val,"Yes" , "danger" , "primary");
        //    }
        //}
    ]
});