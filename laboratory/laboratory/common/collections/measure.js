//// Collection
//Laboratory.Collection.Measure = new Mongo.Collection("laboratory_measure");
//
//// Schema
//Laboratory.Schema.Measure = new SimpleSchema({
//
//    appendValue: {
//        type: String,
//        label: "AppendValue",
//        optional:true
//    },
//    prependValue: {
//        type: String,
//        label: "PrependValue",
//        optional:true
//    },
//    cpanel_branchId: {
//        type: String,
//        label: "Branch",
//        optional:true
//    }
//});
//
//// Attach schema
//Laboratory.Collection.Measure.attachSchema(Laboratory.Schema.Measure);
//
//// Attach soft remove
//Laboratory.Collection.Measure.attachBehaviour('softRemovable');