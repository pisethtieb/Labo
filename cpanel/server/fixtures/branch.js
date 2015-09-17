Meteor.startup(function () {
    if (Cpanel.Collection.Branch.find().count() == 0) {
        Cpanel.Collection.Branch.insert(
            {
                _id: '001',
                khName: 'បាត់ដំបង',
                khShortName: 'បប',
                enName: 'Battambang',
                enShortName: 'BTB',
                khAddress: 'ភូមិរំចេក ៤ សង្កាត់រតនៈ ក្រុងបាត់ដំបង ខេត្តបាត់ដំបង',
                enAddress: 'Romchek 4 Village, Sangkat Rottanak, Krong Battamang, Battambang Province',
                telephone: '053 50 66 777',
                email: ''
            }
        );
    }
});