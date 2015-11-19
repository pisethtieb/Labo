// Customer
Laboratory.Collection.Customer.permit(['insert', 'update', 'remove'])
    .laboratory_ifGeneral()
    .apply();
