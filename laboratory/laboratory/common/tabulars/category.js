// Address
Laboratory.TabularTable.Category = new Tabular.Table({
    name: "Laboratory_categoryList",
    collection: Laboratory.Collection.Category,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.laboratory_categoryAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "des", title: "Description"}
    ]
});