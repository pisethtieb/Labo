/**
 * Created by pisethsomaly on 9/17/15.
 */
Meteor.methods({
    labo: function(prefix){
        StateLabo = new ReactiveObj({labo: prefix})
    }
});