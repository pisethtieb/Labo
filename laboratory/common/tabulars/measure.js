// Customer
Laboratory.TabularTable.Measure = new Tabular.Table({
    name: "laboratory_measureList",
    collection: Laboratory.Collection.Measure,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.laboratory_measureAction},
        {data: "_id", title: "ID"},

        {data: "appendValue", title: "AppendValue"},
        {data: "prependValue", title: "prependValue"}

    ]
});