FlowRouter.triggers.enter([
    function (context, redirect) {
        var currentModule = Session.get('currentModule');
        var currentBranch = Session.get('currentBranch');

        if (!Meteor.userId() || !currentModule || !currentBranch) {
            FlowRouter.go('cpanel.welcome');
        }
    }
], {
    except: ["cpanel.welcome"]
});
