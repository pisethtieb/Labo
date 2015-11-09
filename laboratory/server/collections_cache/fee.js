// Collection
//Laboratory.Collection.Customer.cacheTimestamp();
Laboratory.Collection.Fee.cacheDoc('agent', Laboratory.Collection.Agent, ['name', 'gender', 'address', 'photo']);
Laboratory.Collection.Fee.cacheDoc('staff', Laboratory.Collection.Staff, ['name', 'gender', 'address', 'photo']);
Laboratory.Collection.Fee.cacheDoc('labo', Laboratory.Collection.Labo, ['_id', 'laboDate']);
Laboratory.Collection.Fee.cacheDoc('patient', Laboratory.Collection.Patient, ['name']);
