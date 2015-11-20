// Customer
Laboratory.Collection.Patient.permit(['insert', 'update', 'remove'])
    .laboratory_ifGeneral()
    .apply();
