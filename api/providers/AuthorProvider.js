const AuthorFactory = require('./../factory/AuthorFactory.js');

const insert = params => {

    return new Promise((resolve, reject) => {

        if (!params.name)
            return reject({'error': 'missing name'});

        if (!params.surname)
            return reject({'error': 'missing surname'});

        AuthorFactory.insert(params).then(
            (success) => {
                return resolve(success);
            }, (error) => {
                return resolve(error);
            }
        );

    });
};


exports.insert = insert;
