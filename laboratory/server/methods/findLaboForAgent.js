Meteor.methods({
    checkLaboForAgent: function (id) {
        var result = Laboratory.Collection.Fee.findOne({agentId: id});
        return {
            labo: result,
            id: id
        }
    }
});