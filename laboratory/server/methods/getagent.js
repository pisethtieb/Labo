

Meteor.methods({

    findAgent: function (id) {
        return Laboratory.Collection.Agent.findOne(id)
    }
});

