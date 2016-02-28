const AuthorFactory = require('./../factory/AuthorFactory.js');
const Authorprovider= require('./../providers/AuthorProvider.js');

function findAll(req, res) {

    AuthorFactory.findAll(req.query).then(
        (success) => {
            return res.json(success);
        }, (error) => {
            return res.json(error);
        }
    );
}


function findById(req, res) {

    AuthorFactory.findOne(req.params).then(
        (success) => {
            return res.json(success);
        }, (error) => {
            return res.json(error);
        }
    );
}


function insert(req, res) {

    Authorprovider.insert(req.body).then(
        (success) => {
            return res.json(success);
        }, (error) => {
            return res.json(error);
        }
    );
}

exports.findAll = findAll;
exports.findById = findById;
exports.insert = insert;