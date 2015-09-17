Meteor.startup(function () {
    if (Sample.Collection.Customer.find().count() == 0) {
        console.log('Fixtures is running...');

        // Address
        for (var i = 1; i <= 500; i++) {
            var addressId = idGenerator.gen(Sample.Collection.Address, 4);
            Sample.Collection.Address.insert({
                _id: addressId,
                name: faker.address.city()
            });

            // Customer
            for (var j = 1; j <= 10; j++) {
                var customerId = idGenerator.genWithPrefix(Sample.Collection.Customer, '001-', 6);

                var data = {
                    _id: customerId,
                    name: faker.name.findName(),
                    gender: Fake.fromArray(['M', 'F']),
                    dob: moment(faker.date.past()).format('YYYY-MM-DD'),
                    addressId: addressId,
                    telephone: faker.phone.phoneNumber(),
                    email: faker.internet.email(),
                    photo: '',
                    cpanel_branchId: '001'
                };

                Sample.Collection.Customer.insert(data);
            }
        }

        console.log('Fixtures is ready');

    }
});