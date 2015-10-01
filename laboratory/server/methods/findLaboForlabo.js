Meteor.methods({
    checkLaboForLabo: function (id) {
        var result = Laboratory.Collection.Payment.findOne({laboId: id});
        return {
            payment: result,
            id: id,

        }
    }
});