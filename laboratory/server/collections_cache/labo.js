// Collection
//Laboratory.Collection.Customer.cacheTimestamp();
Laboratory.Collection.Labo.cacheDoc('staff', Laboratory.Collection.Staff, ['name']);
Laboratory.Collection.Labo.cacheDoc('patient', Laboratory.Collection.Patient, ['name', 'gender', 'age', 'address', 'photo']);
Laboratory.Collection.Labo.cacheDoc('agent', Laboratory.Collection.Agent, ['name', 'gender', 'address', 'photo']);
Laboratory.Collection.Labo.cacheDoc('payment', Laboratory.Collection.Payment, ['_id']);

Laboratory.Collection.Labo.cacheCount('paymentCount', Laboratory.Collection.Payment, 'laboId');
Laboratory.Collection.Labo.cacheCount('feeCount', Laboratory.Collection.Fee, 'laboId');