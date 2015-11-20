// Customer
Laboratory.TabularTable.Agent = new Tabular.Table({
    name: "laboratory_agentList",
    collection: Laboratory.Collection.Agent,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.laboratory_agentAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "gender", title: "Gender"},
        {data: "address", title: "Address"},
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
        },
        {
            data: "_laboCount", title: "Labo+",
            tmpl: Meteor.isClient && Template.laboratory_agentLinkAction
        },
        {
            data: "_feeCount", title: "Fee+",
            tmpl: Meteor.isClient && Template.laboratory_agentLinkAction
        }
    ]
});