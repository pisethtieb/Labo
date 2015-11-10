Meteor.methods({
    getLaboInoviceId: function(id){
       return ReactiveState.get(id);
   }
});