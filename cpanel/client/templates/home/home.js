// Declare template
var indexTpl = Template.cpanel_home;

indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Home',
        description: 'Description for this page'
    });
});
