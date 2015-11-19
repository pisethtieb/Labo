Meteor.methods({
   getLaboId: function(laboId){
       return ReactiveState.get(laboId);
   }
});