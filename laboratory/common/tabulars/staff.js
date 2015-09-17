// Customer
Laboratory.TabularTable.Staff = new Tabular.Table({
    name: "laboratory_staffList",
    collection: Laboratory.Collection.Staff,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.laboratory_staffAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "gender", title: "Gender"},
        {data: "dob", title: "DOB"},
        {data: "position", title: "position"},
        {data: "telephone", title: "Telephone"},
        {data: "address", title: "Address"},
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