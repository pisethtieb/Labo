// Address
Laboratory.TabularTable.Result = new Tabular.Table({
    name: "Laboratory_resultList",
    collection: Laboratory.Collection.Result,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    extraFields: ['patientId'],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.laboratory_resultAction},
        {data: "_id", title: "ID"},
        {data: "resultDate", title: "Result Date"},
        {data: "laboDate", title: "Labo Date"},
        {data: "laboId", title: "Labo ID"},
        {data: "_patient.name", title: "Patient"},
        {data: "_agent.name", title: "Agent"},
        {data: "_staff.name", title: "Staff"}

    ]
});