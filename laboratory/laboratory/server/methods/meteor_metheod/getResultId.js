Meteor.methods({
   getResultId: function(id){
       return ReactiveState.get(id);
   }
});