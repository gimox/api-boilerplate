var model = mongo.model('authors');

/**
 * @description
 * find all aobject
 *
 * @param {object} params
 * @returns {Promise}
 */
const findAll = (params) => {

    var util = require('util');

    var query = {};
    var page = 1;
    var size = 50;
    var sortParams = {
        _id: -1
    };

    if (util.isObject(params)) {

        if (params.page) page = parseInt(params.page);
        if (params.size) size = parseInt(params.size);

        if (params.title) {
            query.title = new RegExp(params.title, 'i');
        }
    }

    var skip = page > 0 ? ((page - 1) * size) : 0;


    return new Promise((resolve, reject) => {

        model.find(query, null, {
            skip : skip,
            limit: size,
            sort : sortParams
        }, (err, data) => {

            if (err)
                return reject(err);

            resolve(data);
        });
    });
};

/**
 * @description
 * find one object
 *
 * @param params
 * @returns {Promise}
 */
const findOne = params => {

    var query = model.where(params);

    return new Promise((resolve, reject) => {

        query.findOne((err, doc) => {
            if (err) return reject(err);

            return resolve(doc);
        });
    });
};


const insert = params => {

    return new Promise((resolve, reject) => {

        if (!params.name)
            return reject({'error': 'missing name'});

        if (!params.surname)
            return reject({'error': 'missing surname'});


        var record = new model(params);

        record.save(function (err, doc) {
            if (err)
                return reject(err);

            resolve(doc);
        });

    });

};

exports.findAll = findAll;
exports.findOne = findOne;
exports.insert = insert;