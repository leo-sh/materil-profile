var CONFIG = require('./../../config/config');
var getTokenFromHeader = require('./../helpers/getTokenFromHeader');
var jwt = require("jsonwebtoken");
var CONSTANTS = require('./../helpers/constants');
var ResultResponses = require('./../helpers/resultResponses');
var UserDetails = require('./../models/user_details');

module.exports = function (req, res, next) {

    var token = getTokenFromHeader(req.headers);

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, CONFIG.ENV.SESSION_.SECRET, function (err, decoded) {
            if (err) {
                console.log('Error in authenticating the token');
                return res.status(404).json({result: ResultResponses.invalid(CONSTANTS.HTTP_CODES.CLIENT_ERROR.BAD_REQUEST, 'Failed to authenticate token!!')})
            } else {
                // if everything is good, save to request for use in other routes

                UserDetails.findOne({_user_access_id: decoded.member._id}, {
                    __v: 0,
                    _user_access_id: 0,
                    created_at: 0,
                    updated_at: 0,
                    deleted_at: 0
                }, function (err, userDetails) {

                    if (err) {
                        console.log('UserNotFound Error : authenticated_urls middleware')
                        throw err;
                    }

                    if (userDetails) {

                        var member = {
                            _id: decoded.member._id,
                            member_details_id: userDetails._id,
                            first_name: userDetails.first_name,
                            last_name: userDetails.last_name,
                            addresses: userDetails.addresses,
                            primary_email: decoded.member.email,
                            primary_email_updated_at: decoded.member.email_updated_at,
                            email_addresses: userDetails.email_addresses,
                            password_updated_at: decoded.member.password_updated_at,
                            activated_at: decoded.member.activated_at,
                            created_at: decoded.member.created_at,
                        }

                        req.member = member;
                        next();

                    } else {
                        return res.status(404).json({result: ResultResponses.invalid(CONSTANTS.HTTP_CODES.CLIENT_ERROR.BAD_REQUEST, 'User not Found!!')})
                    }
                })
            }
        });

    } else {

        // if there is no token
        // return an error
        return res
            .status(CONSTANTS.HTTP_CODES.CLIENT_ERROR.FORBIDDEN)
            .json(
                {result: ResultResponses.invalid(CONSTANTS.HTTP_CODES.CLIENT_ERROR.FORBIDDEN, 'No token provided.!!')})
    }
}