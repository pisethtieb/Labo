// Patient
Laboratory.TabularTable.Patient = new Tabular.Table({
    name: "Laboratory_patientList",
    collection: Laboratory.Collection.Patient,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.laboratory_patientAction},
        {data: "_id", title: "ID"},
        //{data: "_agent.name", title: 'Agent'},

        {data: "name", title: "Name"},
        {data: "gender", title: "Gender"},
        {data: "dob", title: "DoB"},
        {data: "age", title: "Age"},
        {data: "maritalStatus", title: "Status"},
        {data: "address", title: "Address"},

        {data: "telephone", title: "Tel"},
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
            data: "_laboCount", title: "LaboCo",
            tmpl: Meteor.isClient && Template.laboratory_laboLinkAction
        }
    ]
});