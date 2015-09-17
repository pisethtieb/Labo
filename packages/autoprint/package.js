Package.describe({
    name: 'theara:autoprint',
    version: '0.0.5',
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.1.0.3');

    api.use([
        'underscore',
        'templating'
    ], 'client');

    api.addFiles('autoprint.js', 'client');
});

Package.onTest(function (api) {
    api.use('tinytest');
    api.use('theara:autoprint');
    api.addFiles('autoprint-tests.js');
});
