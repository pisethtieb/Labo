# Cpanel For Meteor JS
Cpanel for Rabbit Training Center.

## Usage
- Copy the sample module and rename `rabbit`

```js
// Structure
|- rabbit
    |- client
        |- app   // other file or libraries load first on client
            |- compatibility // 3th parties library
            |- config
            |- helpers
            |- libraries
            |- startup
            list.js
            list_for_report.js
        |- css
        |- routers
            |- reports
                _group.js // group router
                _subscriptions // global sub
                my_report.js
            home.js
        |- templates
            |- _collections_search // easy search template
            |- _layout    // menu bar
                navbar.html
                navbar_right.html
            |- home
                home.html
                home.js
            |- reports
                my_report.html
                my_report.js
    |- common  // run at server and client
        |- collections   // for collection and schema
            |- reports
                my_report.js
            my_collection.js
        |- collections_helper // collection helper
        |- collections_search // easy search
        |- lib   // other file or libraries load first
            |- config
                module.js
                namespace.js
        |- tabulars
            my_tabular.js
    |- server
        |- app   // other file or libraries load first on server
            security.js     // create security method like config in Module
        |- collections_cache   // collection cache
        |- collections_hook   // collection hook
        |- methods
            |- reports // report methods
        |- publications
            my_pub.js
        |- routers // picker server router
        |- security
            my_sec.js
        |- startup
            |- fixtures
            startup.js
```

- Config new module and set roles in `rabbit/common/lib/config/module.js`

```js
// Module
Module = typeof Module === 'undefined' ? {} : Module;
Meteor.isClient && Template.registerHelper('Module', Module);

Module.Rabbit = {
    name: 'Rabbit Project',
    version: '0.0.1',
    summary: 'Rabbit Management System is ...',
    roles: [
        'admin',
        'general',
        'reporter'
    ]
};
```

- Config namespace in `rabbit/common/lib/config/namespace.js` to use collection, schema, tabular and other libraries

```js
// Namespace
Rabbit = {};

Meteor.isClient && Template.registerHelper('Rabbit', Rabbit);

/* Collection */
Rabbit.Collection = {};

/* Schema */
Rabbit.Schema = {};

/* Tabular */
Rabbit.TabularTable = {};
```

- Create security method in `rabbit/server/app/security.js`

```js
// Admin
Security.defineMethod("rabbit_ifAdmin", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['admin'], 'Rabbit');
    }
});

// General
Security.defineMethod("rabbit_ifGeneral", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['general'], 'Rabbit');
    }
});

// Reporter
Security.defineMethod("rabbit_ifReporter", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['reporter'], 'Rabbit');
    }
});
```

- Create home page (router, template)
- Config menu bar in `rabbit/client/templates/_layout/navbar.html, navbar_right.html`

```js
<template name="rabbit_navbar">
    <li class="{{isActiveRoute name='rabbit.home'}}">
        <a href="{{pathFor 'rabbit.home'}}">Home</a>
    </li>
    <li class="dropdown">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
            Data <span class="caret"></span>
        </a>
        <ul class="dropdown-menu" role="menu">
            <li class="{{isActiveRoute name='rabbit.customer'}}">
                <a href="{{pathFor 'rabbit.customer'}}">Customer</a>
            </li>
            <li class="{{isActiveRoute name='rabbit.order'}}">
                <a href="{{pathFor 'rabbit.order'}}">Order</a>
            </li>
        </ul>
    </li>
    ...
</template>

<template name="rabbit_navbarRight">
    <li class="{{isActiveRoute name='rabbit.home'}}">
        <a href="{{pathFor 'rabbit.home'}}">Home</a>
    </li>
    <li class="dropdown">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
            Data <span class="caret"></span>
        </a>
        <ul class="dropdown-menu" role="menu">
            <li class="{{isActiveRoute name='rabbit.customer'}}">
                <a href="{{pathFor 'rabbit.customer'}}">Customer</a>
            </li>
            <li class="{{isActiveRoute name='rabbit.order'}}">
                <a href="{{pathFor 'rabbit.order'}}">Order</a>
            </li>
        </ul>
    </li>
    ...
</template>
```

- Create list view of select options in `rabbit/client/app/list.js, list_for_report.js`

```js
// List
Rabbit.List = {
    gender: function () {
        var list = [];
        list.push({label: "(Select One)", value: ""});

        list.push({label: 'Male', value: 'M'});
        list.push({label: 'Female', value: 'F'});

        return list;
    },
    address: function () {
        var list = [];
        list.push({label: "(Select One)", value: ""});

        Rabbit.Collection.Address.find()
            .forEach(function (obj) {
                list.push({label: obj._id + ' : ' + obj.name, value: obj._id});
            });

        return list;
    }
};

// List for report
Rabbit.ListForReport = {
    type: function () {
        var list = [];
        list.push({label: "(Select All)", value: ""});

        list.push({label: 'A', value: 'A'});
        list.push({label: 'B', value: 'B'});

        return list;
    }
};
```

- Create any methods (server, client or common)
- Create `Test CRUD`: collection, security in `rabbit/server/security/security.js`, publish/sub, tabular, router, template...

## Internal Libraries
- Clear Select2, Selectize in `rabbit/client/app/libraries`

```js
clearSelect2([elements]);
clearSelectize([elements]);

AutoForm.hooks({
    ...
    onSuccess: function (formType, result) {
        clearSelect2();
        clearSelectize();
        alertify.success('Success');
    },
})
```

- Date, Time, DateTime Picker in `rabbit/client/app/libraries`

```js
DateTimePicker.date(selector, [options]);
// .date(), .dateTime(), .time(), .date2(), .dateRange(), .dateTimeRange()

Template.templateName.onRendered(function(){
    var name = $('[name="date1"]');
    var name2 = $('[name="date2"]');
    DateTimePicker.date([name1, name2]);
})
```

- Inputmask in `rabbit/client/app/libraries`

```js
Inputmask.currency(selector, [options]);
Inputmask.decimal(selector, [options]);
Inputmask.integer(selector, [options]);
Inputmask.percentage(selector, [options]);

Template.templateName.onRendered(function(){
    var myNumber1 = $('[name="myNumber1"]');
    var myNumber2 = $('[name="myNumber2"]');

    Inputmask.currency([myNumber1, myNumber2], {prefix: 'R '});
})
```

- Render Template in `rabbit/client/app/libraries`

```js
// Use with bootbox
var data = {name: value, gender: value};
bootbox.dialog({
            message: renderTemplate(Template.rabbit_testShow, data),
            title: "Title"
        });
```

- Modal Template in `rabbit/client/app/libraries`

```js
// Template
<template name="sample_testInsert">

    <div class="modal fade" data-backdrop="static" id="sample_testInsertModal">
        <div class="modal-dialog  modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Test Insert</h4>
                </div>

                {{#autoForm collection=Sample.Collection.Test id="sample_testInsert" type="insert"}}
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                {{> afQuickField name='name'}}
                                {{> afQuickField name='gender' options=Sample.List.gender}}
                                {{> afQuickField name='address'}}
                            </div>
                            <div class="col-md-6">
                                {{> afQuickField name='telephone'}}
                                {{> afQuickField name='email'}}
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Save</button>
                        <button type="reset" class="btn btn-default">Reset</button>
                    </div>
                {{/autoForm}}

            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

</template>

// Js
'click .insert': function (e, t) {
   var data = {name: value, gender: value};
   ModalTemplate.show('sample_testInsert', data);
},
```

- Modal Max Height in `rabbit/client/app/libraries`

```js
// Use with bootbox
'click .show': function (e, t) {
    bootbox.dialog({
        message: renderTemplate(Template.sample_testShow, this),
        title: "Test Info"
    });
    modalMaxHeight();
}
```

- Alertify in `rabbit/client/app/libraries`

```js
// How to use custom
createNewAlertify("customer"); // Call in template create

alertify.customer("<i class='fa fa-plus'></i> Customer", renderTemplate(Template.sample_customerInsert))
    .maximize(); // auto full screen

// How to create multiple 
createNewAlertify(["customer", "addressAddon"]);// Call in template create/render

// How to close
alertify.customer().close();

// How to get data
var $customers = $(alertify.customer().elements.content);
alert($customers.find("#name"));
```

- Get current datetime from server

```js
// Default call
Meteor.call('currentDate', function (error, result) {
    // result 'YYYY-MM-DD HH:mm:ss'
    ...
});

// Reactive call
var currentDate = ReactiveMethod.call("currentDate"); // 'YYYY-MM-DD HH:mm:ss'
```

## Namespace
- Router: `rabbit.routerName` (name), `rabbit/routerName` (url)
- Router for report: rabbit.routerName`Report` (name), rabbit/routerName`Report` and rabbit/routerName`ReportGen` (url)
- Tabular: `rabbit_customerList`
- Template: `rabbit_templateName`
- Template for report: rabbit_templateName`Report`, rabbit_templateName`ReportGen`
- Method: `rabbit_methodName`
- Publish/Sub: `rabbit_pubName`
- Security method: `rabbit_ifSecurityName`
    
## Note
- Session: `currentModule` and `currentBranch`
- Capnel collections:
    - Cpanel.Collection.Setting() -> `global sub`
    - Cpanel.Collection.Company()
    - Cpanel.Collection.Branch() -> `global sub`
    - Cpanel.Collection.Currency() -> `global sub`
    - Cpanel.Collection.User() -> `global sub`
    - Cpanel.Collection.Exchange()
    - Files() -> `global sub` (collection for managing file upload like images, pdf ...)
