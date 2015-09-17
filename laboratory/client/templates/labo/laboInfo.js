Template.laboratory_laboInfo.helpers({
    laboItems: function () {
        var laboId = FlowRouter.getParam('laboId');
        var str = "";
        console.log(laboId);
        laboId.laboItem.forEach(function (o) {
            str += '+' + "Product ID: " + o.itemId +
                " | Qy: " + o.qty +
                " | Price: " + numeral(o.price).format('0,0.00') + 'R' +
                " | Fee: " + numeral(o.fee).format('0,0.00') + 'R'
                + " | Amount: " + numeral(o.amount).format('0,0.00') + 'R' + "<br/>";
        });
        return new Spacebars.SafeString(str);
    },
    labo: function () {
        var self = this;
        var data = Laboratory.Collection.Labo.findOne(self.toString());
        data.laboDate = moment(data.laboDate).format('YYYY-MM-DD');

        return data;
    }
});
