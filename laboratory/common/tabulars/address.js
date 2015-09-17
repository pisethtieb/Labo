// Address
Laboratory.TabularTable.Address = new Tabular.Table({
    name: "laboratory_addressList",
    collection: Laboratory.Collection.Address,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.laboratory_addressAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "_customerCount", title: "Customer Count"}
    ]
});