// Easy search
EasySearch.createSearchIndex('sample_customerSearch', {
    collection: Sample.Collection.Customer, // instanceof Meteor.Collection
    field: ['_id', 'name', 'telephone'], // array of fields to be searchable
    //transform: function (doc) { // Support elastic-search only
    //    doc.dobVal = moment(doc.dob).format('DD-MM-YYYY');
    //},
    limit: 10,
    use: 'mongo-db', //  minimongo, elastic-search
    convertNumbers: true,
    props: {
        'filteredGender': 'All',
        'sortBy': 'name'
    },
    sort: function () {
        if (this.props.sortBy === 'dob') {
            return {'dob': -1};
        }

        // default by name
        return {'name': 1};
    },
    query: function (searchString, opts) {
        // Default query that will be used for the mongo-db selector
        var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);

        //console.log(opts);

        // filter for categories if set
        if (this.props.filteredGender.toLowerCase() !== 'all') {
            query.gender = this.props.filteredGender;
        }

        return query;
    }
});
