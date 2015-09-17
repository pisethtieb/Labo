// Customer
Sample.TabularTable.Customer = new Tabular.Table({
    name: "sample_customerList",
    collection: Sample.Collection.Customer,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.sample_customerAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "gender", title: "Gender"},
        {data: "dob", title: "Date of Birth"},
        {data: "addressId", title: "Address ID"},
        {
            data: "_address",
            title: "Address Info",
            render: function (val, type, doc) {
                return JSON.stringify(val, null, ' ');
            }
        },
        {data: "telephone", title: "Telephone"},
        {data: "email", title: "Email"},
        {
            data: "photo",
            title: "Photo",
            render: function (val, type, doc) {
                if (_.isUndefined(val)) {
                    return null;
                } else {
                    var img = Files.findOne(val);
                    return lightbox(img.url(), doc._id, doc.name);
                }
            }
        }
    ]
});