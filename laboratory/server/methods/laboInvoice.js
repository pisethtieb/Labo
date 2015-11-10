Meteor.methods({
    labo_invoice: function (laboId) {
        var data = {
            title: {},
            header: {},
            content: [{index: 'No Payment'}],
            footer: {}
        };
        /****** Title *****/
        data.title = Cpanel.Collection.Company.findOne();

        /****** Header *****/
        //  data.header = params;
        /****** Content *****/
        var labo = Laboratory.Collection.Labo.findOne(laboId);

        console.log('from labo_invoice function' + labo.laboItem);
        if (labo != null) {
            data.content = labo;
        }

        return data

    }
});