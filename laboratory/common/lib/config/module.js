// Module
Module = typeof Module === 'undefined' ? {} : Module;
Meteor.isClient && Template.registerHelper('Module', Module);

Module.Laboratory = {
    name: 'Laboratory System',
    version: '0.0.1',
    summary: 'Laboratory Management System is ...',
    roles: [
        'admin',
        'general',
        'reporter'
    ]
};
