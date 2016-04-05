var CONFIG = require('./../../config/config');
var getTokenFromHeader = require('./../helpers/getTokenFromHeader');
var jwt = require("jsonwebtoken");
var CONSTANTS = require('./../helpers/constants');
var ResultResponses = require('./../helpers/resultResponses');

module.exports = function (req, res, next) {

    var token = getTokenFromHeader(req.headers);

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, CONFIG.ENV.SESSION_.SECRET, function (err, decoded) {
            if (err) {
                return res.json({result: ResultResponses.invalid(CONSTANTS.HTTP_CODES.CLIENT_ERROR.BAD_REQUEST, 'Failed to authenticate token!!')})
            } else {
                // if everything is good, save to request for use in other routes
                req.member = decoded.member;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}