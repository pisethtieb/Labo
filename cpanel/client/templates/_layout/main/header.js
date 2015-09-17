/**
 * Helper
 */
Template.headerLayout.helpers({
    navbar: function () {
        var currentModule = Session.get('currentModule');
        var currentBranch = Session.get('currentBranch');
        if (!Meteor.userId() || !currentModule || !currentBranch) {
            return {show: false};
        }
        var bar = s.decapitalize(currentModule);

        return {show: true, template: {left: bar + '_navbar', right: bar + '_navbarRight'}};
    },
    currentBranch: function () {
        var currentModule = Session.get('currentModule');
        var currentBranch = Session.get('currentBranch');
        var getBranch = Cpanel.Collection.Branch.findOne({_id: currentBranch});
        var show = false;

        if (!currentModule || !currentBranch || !getBranch) {
            return {show: show};
        } else {
            show = true;
            var title = currentBranch + ' : ' + getBranch.enShortName;
            return {show: show, title: title};
        }
    }
});
