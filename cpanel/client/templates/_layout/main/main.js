// Declare state for server date time
//var state = new ReactiveObj();

Template.mainLayout.helpers({
    appName: function () {
        var module = Session.get('currentModule');
        var branch = Session.get('currentBranch');
        if (Meteor.userId() && !_.isUndefined(module) && !_.isUndefined(branch)) {
            var moduleWord = s.words(module, ':');
            return Module[moduleWord[0]].name;
        }
        return 'Rabbit Project';
    },
    pageHeader: function () {
        var pageHeader = FlowRouter.getRouteName();
        var words = s.words(pageHeader, '.');
        if (_.isUndefined(pageHeader) || _.isUndefined(words[1])) {
            return 'No Title';
        }
        var pageHeaderVal = s.titleize(s.humanize(words[1]));

        return pageHeaderVal;
    }
    //serverDateTime: function () {
    //    Meteor.setInterval(function () {
    //        Meteor.call('currentDate', function (error, result) {
    //            var dateTime = moment(result, 'YYYY-MM-DD H:mm:ss');
    //            var cssClass = 'primary';
    //            if (dateTime.day == 0 || dateTime.day() == 6) {
    //                cssClass = 'danger';
    //            }
    //            var dateTimeVal = dateTime.format('dddd D, MMMM YYYY H:mm:ss');
    //
    //            state.set('cssClass', cssClass);
    //            state.set('serverDateTime', dateTimeVal);
    //        });
    //    }, 1000);
    //
    //    return {val: state.get('serverDateTime'), css: state.get('cssClass')};
    //}
});
