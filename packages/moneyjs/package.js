Package.describe({
    name: 'theara:moneyjs',
    version: '0.0.2',
    // Brief, one-line summary of the package.
    summary: 'Simple and tiny JavaScript library for realtime currency conversion and exchange.',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.1.0.2');

    api.addFiles('moneyjs.js');
});

Package.onTest(function (api) {
    api.use('tinytest');
    api.use('theara:moneyjs');
    api.addFiles('moneyjs-tests.js');
});
