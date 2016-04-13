var User = require('./../models/user_access');
var UserDetails = require('./../models/user_details');
// loading user constants
var CONSTANTS = require('./../helpers/constants');
var ResultResponses = require('./../helpers/resultResponses');
var getTokenFromHeader = require('./../helpers/getTokenFromHeader');
var CONFIG = require('./../../config/config');
var jwt = require("jsonwebtoken");

module.exports = {

    getMemberInfo: function (req, res, next) {

        var result = {};

        result = ResultResponses.failed(CONSTANTS.HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
            'Some Error Occurred.');

        UserDetails.findOne({_user_access_id: req.member._id}, {
            _id: 0,
            _user_access_id: 0,
            created_at: 0,
            updated_at: 0,
            deleted_at: 0
        }, function (err, userDetails) {

            if (err)
                throw err;

            if (!userDetails) {

                result = ResultResponses.invalid(CONSTANTS.HTTP_CODES.CLIENT_ERROR.UNAUTHORISED,
                    'Authentication failed. User not found.!!');
            } else {

                var data = {
                    member_access_info: req.member,
                    member_details_info: userDetails
                }

                result = ResultResponses.success(CONSTANTS.HTTP_CODES.SUCCESS.OK,
                    'Successfully Authenticated!!', data);
            }

            res.json({'result': result})
        })
    },

    getToken: function (req, res, next) {

        var result = {};

        result = ResultResponses.failed(CONSTANTS.HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
            'Some Error Occurred.');

        User.findOne({email: req.body.email}, function (err, user) {
            if (err) throw err;

            if (!user) {

                result = ResultResponses.invalid(CONSTANTS.HTTP_CODES.CLIENT_ERROR.UNAUTHORISED,
                    'Authentication failed. User not found.!!');
            } else {
                // check if password matches
                if (user.validPassword(req.body.password)) {

                    if (user.activated) {

                        var data = {
                            'token': 'JWT ' + jwt.sign({member: user}, CONFIG.ENV.SESSION_.SECRET, {expiresInMinutes: CONSTANTS.TOKEN.EXPIRATION_TIME_IN_MINUTES}),
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