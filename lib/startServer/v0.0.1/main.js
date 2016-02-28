/**
 * @description
 * Manage http server bootstrap

 * @module lib/startServer
 * @autor Giorgio Modoni <modogio@gmail.com>
 */


const start = require('node-startinfo');

/**
 * @description
 * check port mapping for server
 *
 * @param {number} val port number
 * @returns {number | boolean} port number or false
 */
const normalizePort = val => {
    var port = parseInt(val, 10);

    if (isNaN(port))
        return val;

    if (port >= 0)
        return port;

    return false;
};

/**
 * @description
 * start http server
 *
 * @param {object} app express app object
 * @param {number} port sever
 */
const httpServer = (app, port) => {
    const http = require('http');
    const server = http.createServer(app);
    server.listen(port);
    start.displayError(server);
    start.displayInfo(server);
    const portAssigned = normalizePort(process.env.PORT || port);
    app.set('port', portAssigned);
};

/**
 * @description
 * start https server
 *
 * @param {object} app express app object
 * @param {number} port sever
 * @param {string} key certificate key path
 * @param {string} crt certificate crt path
 */
const httpsServer = (app, port, key, crt) => {
    const fs = require('fs');
    const https = require('https');
    const privateKey = fs.readFileSync(key, 'utf8');
    const certificate = fs.readFileSync(crt, 'utf8');
    const credentials = {key: privateKey, cert: certificate};
    const serverSSL = https.createServer(credentials, app);
    const portAssigned = normalizePort(process.env.PORT || port);
    serverSSL.listen(portAssigned);
    start.displayError(serverSSL);
    start.displayInfo(serverSSL);
    app.set('portHttps', portAssigned);
};

exports.httpServer = httpServer;
exports.httpsServer = httpsServer;