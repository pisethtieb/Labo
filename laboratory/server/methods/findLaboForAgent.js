Meteor.methods({
    checkLaboForAgent: function (id) {
        var result = Laboratory.Collection.Labo.findOne({agentId: id});
        return {
            labo: result,
            id: id
        }
    }
});