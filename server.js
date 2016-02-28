/**
 * @description
 * bootstrap application file
 *
 * @module server.js
 * @autor Giorgio Modoni <modogio@gmail.com>
 */

console.log('\x1b[32m Starting server....\x1b[0m');

const express = require('express');
const path = require('path');
//var env = process.env.NODE_ENV || "development";
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const errors = require('./lib/errors'); // mange http errors 404,500
const config = require("config");
const routes = require('json-routing');
const mongoose = require('mongoose');
const debug = require('debug')('api-boilerplate:server');
const serverInit = require('./lib/startServer');


app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public'))); // remove, only for avatar test ->giorgio
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

global.app = app; // express app
global.config = config; // application config

// connect to mongo
require('mongoose-express-autoinit').start(app, config.get('mongoose'), mongoose);
global.mongo = mongoose;

// init route
routes(app, config.get('routes')); // load routes
errors.init(app); // manage errors

// start servers
if (config.base.http)
    serverInit.httpServer(app, config.base.port);

if (config.base.https)
    serverInit.httpsServer(app, config.base.portSSL, config.base.httpsKey, config.base.httpsCrt);

module.exports = app;