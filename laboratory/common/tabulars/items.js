// Address
Laboratory.TabularTable.Items = new Tabular.Table({
    name: "Laboratory_itemsList",
    collection: Laboratory.Collection.Items,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.laboratory_itemsAction},
        {data: "_id", title: "ID"},
        {data: "_category.name", title: "Category"},
        {data: "name", title: "Name"},
        {data: "price", title: "Price"},
        {
            data: "feeType",
            title: "FeeType",
            render: function (val, type, doc) {
                return labelCon(val, "percent", "primary", "info");
            }
        },
        {data: "fee", title: "Fee"},
        {
            data: "child",
            title: "Child",
            render: function (val, type, doc) {
                return labelCon(val, "yes", "success", "info");
            }
        }



        //{data: "normalValue", title: "NVal"},
        //{data: "prependValue", title: "PVal"},
        //{data: "appendValue", title: "AVal"}
        //{
        //    data: "childItem", title: "Child Item",
        //    render: function (val, type, doc) {
        //        //return EJSON.stringify(val, true);
        //        var str = "<ul>";
        //        if(val!=null) {
        //            val.forEach(function (o) {
        //                str += "<li>Name: " + o.name + " | NVal: " + (o.normalValue) + " | PVal: " + o.prependValue + " | AVal: " + (o.appendValue) + "</li>";
        //            });
        //        }
        //        str += '</ul>';
        //        return str
        //
        //    }
        //}
        //
        //
        //

        //{data: "_customerCount", title: "Customer Count"}
    ]
});