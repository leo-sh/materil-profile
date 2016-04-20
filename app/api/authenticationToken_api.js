var User = require('./../models/user_access');
var UserDetails = require('./../models/user_details');
var CustomLabels = require('./../models/custom_labels');
// loading user constants
var CONSTANTS = require('./../helpers/constants');
var ResultResponses = require('./../helpers/resultResponses');
var getTokenFromHeader = require('./../helpers/getTokenFromHeader');
var CONFIG = require('./../../config/config');
var jwt = require("jsonwebtoken");

module.exports = {

    getToken: function (req, res, next) {

        var result = {};

        result = ResultResponses.failed(CONSTANTS.HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
            'Some Error Occurred.');

        User.findOne({email: req.body.email}, function (err, user) {
            if (err) throw err;

            if (!user || user.deleted_at) {

                result = ResultResponses.invalid(CONSTANTS.HTTP_CODES.CLIENT_ERROR.UNAUTHORISED,
                    'Authentication failed. User not found.!!');
            } else {
                // check if password matches
                if (user.validPassword(req.body.password)) {

                    if (user.activated) {

                        var data = {
                            'token': 'JWT ' + jwt.sign({member: user}, CONFIG.ENV.SESSION_.SECRET, {expiresIn: CONSTANTS.TOKEN.EXPIRATION_TIME_IN_MINUTES}),
                            expiresIn: CONSTANTS.TOKEN.EXPIRATION_TIME_IN_MINUTES,
                            'token_type': 'JWT'
                        }

                        result = ResultResponses.success(CONSTANTS.HTTP_CODES.SUCCESS.OK,
                            'Successfully Authenticated!!', data);
                    } else {

                        result = ResultResponses.failed(CONSTANTS.HTTP_CODES.SUCCESS.FORBIDDEN,
                            'User Not Activated!!.');
                    }
                } else {

                    result = ResultResponses.invalid(CONSTANTS.HTTP_CODES.CLIENT_ERROR.UNAUTHORISED,
                        'Authentication failed. User not found.!!');
                }
            }

            res.json({'result': result})
        });
    }
}