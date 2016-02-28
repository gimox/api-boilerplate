/**
 * @description
 * display info for debug
 *
 * @module WebController
 * @autor Giorgio Modoni <modogio@gmail.com>
 */

exports.index = index;

/**
 * @description
 * This is a index page only for testing.
 * You can point this page to check if web server is working.
 *
 * @param req text {(object)} request
 * @param res text {(object)} response
 * @author Giorgio Modoni <modogio@gmail.com>
 */
function index(req, res) {
    res.json({'hi': 'running'});
}
