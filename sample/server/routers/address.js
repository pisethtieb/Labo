Picker.route('/sample/addressRemote/:addressId', function (params, req, res, next) {
    var selector = [
        {_id: {$regex: params.addressId, $options: 'i'}},
        {name: {$regex: params.addressId, $options: 'i'}}
    ];
    var items = Sample.Collection.Address.find({$or: selector})
        .map(function (obj) {
            return {id: obj._id, text: obj._id + ' : ' + obj.name};
        });

    res.end(JSON.stringify(items));
});