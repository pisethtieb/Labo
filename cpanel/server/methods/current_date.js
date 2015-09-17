Meteor.methods({
    currentDate: function () {
        return moment().format('YYYY-MM-DD H:mm:ss');
    }
});
