Laboratory.Collection.Payment.cacheDoc('staff', Laboratory.Collection.Staff, ['name']);
Laboratory.Collection.Payment.cacheDoc('patient', Laboratory.Collection.Patient, ['name', 'gender', 'age', 'address', 'photo']);
Laboratory.Collection.Payment.cacheDoc('agent', Laboratory.Collection.Agent, ['name', 'gender', 'address', 'photo']);
Laboratory.Collection.Payment.cacheDoc('labo', Laboratory.Collection.Labo, ['_id', 'laboDate', 'photo','total','patientId','staffId']);

