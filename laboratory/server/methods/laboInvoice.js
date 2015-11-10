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

        //console.log('from labo_invoice function' + labo.laboItem);
        if (labo != null) {
            data.content = labo;
            data.header = labo;
            data.header.date = moment().format('DD-MM-YYYY');
            console.log(data.header.date);
        }

        return data

    }
});