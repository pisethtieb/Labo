Meteor.methods({
    labo_printResult: function (resultId) {
        var data = {
            title: {},
            header: {},
            content: [{index: 'No Result'}],
            footer: {}
        };
        /****** Title *****/
        data.title = Cpanel.Collection.Company.findOne();

        /****** Header *****/
        //  data.header = params;

        /****** Content *****/


        var result = Laboratory.Collection.Result.findOne(resultId);
        var laboItem=[];
        if(result!=null && result.laboItem!=null){
            var i=1;
            result.laboItem.forEach(function(item){
                item.index=i;
                i++;
                laboItem.push(item);
            })
        }
        result.laboItem=laboItem;
        data.result = result;
        return data

    }
})