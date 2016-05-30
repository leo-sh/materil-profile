var CONFIG = require('./../../config/config');
var getTokenFromHeader = require('./../helpers/getTokenFromHeader');
var jwt = require("jsonwebtoken");
var CONSTANTS = require('./../helpers/constants');
var ResultResponses = require('./../helpers/resultResponses');
var UserDetails = require('./../models/user_details');
var UserAccess = require('./../models/user_access');

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

                var member;

                UserAccess.findOne({_id: decoded.member._id}, {
                    __v: 0,
                    created_at: 0,
                    updated_at: 0,
                    deleted_at: 0
                }, function (err, user) {

                    if (err) {
                        console.log('UserAccess Error : authenticated_urls -> middleware')
                        throw err;
                    }

                    if (user) {

                        member = {
                            _id: user._id,
                            country_code: user.country_code,
                            contact_number: user.contact_number,
                            contact_number_updated_at: user.contact_number_updated_at,
                            primary_email: user.email,
                            primary_email_updated_at: user.email_updated_at,
                            password_updated_at: user.password_updated_at,
                            activated_at: user.activated_at,
                            created_at: user.created_at,
                        };

                        UserDetails.findOne({_user_access_id: decoded.member._id}, {
                            __v: 0,
                            _user_access_id: 0,
                            created_at: 0,
                            updated_at: 0,
                            deleted_at: 0
                        }, function (err, userDetails) {

                            if (err) {
                                console.log('UserDetails Error : authenticated_urls -> middleware')
                                throw err;
                            }

                            if (userDetails) {

                                member.member_details_id = userDetails._id;
                                member.first_name = userDetails.first_name;
                                member.last_name = userDetails.last_name;
                                member.nick_name = userDetails.nick_name;
                                member.sex = userDetails.sex;
                                member.dob = userDetails.dob;
                                member.show_dob = userDetails.show_dob;
                                member.addresses = userDetails.addresses;
                                member.profile_pic = userDetails.profile_pic;
                                member.profile_pic_updated_at = userDetails.profile_pic_updated_at;

                                req.member = member;
                                next();

                            } else {
                                return res.status(404).json({result: ResultResponses.invalid(CONSTANTS.HTTP_CODES.CLIENT_ERROR.BAD_REQUEST, 'User not Found!!')})
                            }
                        })
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