// Order
Sample.TabularTable.Order = new Tabular.Table({
    name: "sample_orderList",
    collection: Sample.Collection.Order,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.sample_orderAction},
        {data: "_id", title: "ID"},
        {data: "orderDate", title: "Date"},
        {data: "total", title: "Total"},
        {data: "des", title: "Description"}
        //{data: "customerId", title: "Customer ID"},
        //{
        //    data: "_customer",
        //    title: "Customer Info",
        //    render: function (val, type, doc) {
        //        return JSON.stringify(val, null, ' ');
        //    }
        //}
    ]
});