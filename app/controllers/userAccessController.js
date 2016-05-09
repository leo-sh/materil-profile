var UserAccess = require('./../models/user_access');
// loading user constants
var CONSTANTS = require('./../helpers/constants');
var ResultResponses = require('./../helpers/resultResponses');

module.exports = {
    // Change Contact Number
    patchChangeContactNumber: function (req, res, next) {

        var result = {};

        var country_code = req.body.country_code;
        var contact_number = req.body.contact_number;
        var current_password = req.body.current_password;

        UserAccess.findOne({_id: req.member._id}, function (err, userAccess) {

            result = ResultResponses.failed(CONSTANTS.HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
                'Some Error Occurred.');

            if (err)
                next(err);

            if (userAccess) {

                if (userAccess.validPassword(current_password)) {

                    userAccess.country_code = country_code;
                    userAccess.contact_number = contact_number;
                    userAccess.save(function (err) {
                        if (err)
                            next(err);
                    })
                    var data = {
                        country_code: country_code,
                        contact_number_updated_at: userAccess.contact_number_updated_at,
                        contact_number: contact_number
                    }
                    result = ResultResponses.success(CONSTANTS.HTTP_CODES.SUCCESS.OK, 'Phone Number Changed!!', data);

                } else {

                    result = ResultResponses.invalid(CONSTANTS.HTTP_CODES.CLIENT_ERROR.BAD_REQUEST,
                        'Invalid Password');
                }

            } else {

                result = ResultResponses.invalid(CONSTANTS.HTTP_CODES.CLIENT_ERROR.BAD_REQUEST,
                    'User Not Found');
            }
            res.json({'result': result});
        })
    },
    // Change Email Address
    patchEmailAddress: function (req, res, next) {

        var result = {};

        var email = req.body.email;
        var current_password = req.body.current_password;

        UserAccess.findOne({_id: req.member._id}, function (err, userAccess) {

            result = ResultResponses.failed(CONSTANTS.HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
                'Some Error Occurred.');

            if (err)
                next(err);

            if (userAccess) {

                if (userAccess.validPassword(current_password)) {

                    userAccess.email = email;
                    userAccess.save(function (err) {
                        if (err)
                            next(err);
                    })
                    var data = {
                        email: email,
                        email_updated_at: userAccess.email_updated_at
                    }
                    result = ResultResponses.success(CONSTANTS.HTTP_CODES.SUCCESS.OK, 'Email Address Changed!!', data);

                } else {

                    result = ResultResponses.invalid(CONSTANTS.HTTP_CODES.CLIENT_ERROR.BAD_REQUEST,
                        'Invalid Password');
                }

            } else {

                result = ResultResponses.invalid(CONSTANTS.HTTP_CODES.CLIENT_ERROR.BAD_REQUEST,
                    'User Not Found');
            }
            res.json({'result': result});
        })
    },
    checkResetCode: function (req, res, next) {

        var user_id = req.params.user_id;
        var reset_code = req.params.reset_code;

        UserAccess.findById(user_id, 'reset_password_code', function (err, userAccess) {

            var result = {};

            result = ResultResponses.failed(CONSTANTS.HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
                'Some Error Occurred.', null);

            if (err) {
                next(err);
            }

            if (userAccess) {

                if (userAccess.reset_password_code == reset_code) {

                    result = ResultResponses.success(CONSTANTS.HTTP_CODES.SUCCESS.OK,
                        'User Reset Permission Granted!!', userAccess);
                } else {
                    result = ResultResponses.invalid(CONSTANTS.HTTP_CODES.CLIENT_ERROR.BAD_REQUEST,
                        'User Reset Code is invalid or Expired!!');
                }
            } else {

                result = ResultResponses.invalid(CONSTANTS.HTTP_CODES.CLIENT_ERROR.BAD_REQUEST,
                    'User Not Found.');
            }
            res.json({'result': result});
        })
    },
    changePassword: function (req, res, next) {

        var result = {};

        var current_password = req.body.current_password;
        var new_password = req.body.new_password;
        var confirm_password = req.body.confirm_password;

        UserAccess.findOne({_id: req.member._id}, function (err, userAccess) {

            result = ResultResponses.failed(CONSTANTS.HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
                'Some Error Occurred.');

            if (err)
                next(err);

            if (userAccess) {

                if (new_password != confirm_password) {

                    result = ResultResponses.invalid(CONSTANTS.HTTP_CODES.CLIENT_ERROR.BAD_REQUEST,
                        'Password and confirm password are not same.');
                } else {

                    userAccess.password = userAccess.generateHash(new_password);
                    userAccess.save(function (err) {
                        if (err)
                            next(err);
                    })
                    result = ResultResponses.success(CONSTANTS.HTTP_CODES.SUCCESS.OK, 'Password Changed!!', userAccess);
                }
            } else {

                result = ResultResponses.invalid(CONSTANTS.HTTP_CODES.CLIENT_ERROR.BAD_REQUEST,
                    'User Not Found');
            }
            res.json({'result': result});
        })
    },
    checkIfUserExists: function (req, res, next) {

        UserAccess.findOne({email: req.params.email}, '_id email activated reset_password_code', function (err, userAccess) {

            var result = {};

            if (err)
                next(err);

            result = ResultResponses.failed(CONSTANTS.HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
                'Some Error Occurred.', null);

            if (userAccess) {

                if (!userAccess.activated) {

                    result = ResultResponses.invalid(CONSTANTS.HTTP_CODES.SUCCESS.NON_AUTHORITATIVE_INFORMATION,
                        'User Not activated. Activate First!!', null);
                } else {

                    userAccess.reset_password_code = userAccess.generateActivationCode();
                    userAccess.save(function (err) {
                        if (err)
                            next(err);
                    })
                    result = ResultResponses.success(CONSTANTS.HTTP_CODES.SUCCESS.OK,
                        'User Found. An email has been sent to you with password changing instructions!!', userAccess);
                    //TODO - send email to the user with reset codes
                }
            } else {

                result = ResultResponses.invalid(CONSTANTS.HTTP_CODES.CLIENT_ERROR.BAD_REQUEST, 'User Not Found!!', null);
            }
            res.json({'result': result});
        })
    },
    userStatus: function (req, res, next) {

        if (!req.isAuthenticated()) {
            return res.status(CONSTANTS.HTTP_CODES.SUCCESS.OK).json({
                status: false
            });
        }
        res.status(CONSTANTS.HTTP_CODES.SUCCESS.OK).json({
            status: true
        });
    },
    logOut: function (req, res, next) {

        req.logout();
        res.status(CONSTANTS.HTTP_CODES.SUCCESS.OK).json({
            status: 'Logged Out Successfully!!'
        });
    },
    // user activation
    activate: function (req, res, next) {

        UserAccess.findOne({
            _id: req.params.user_id
        }, function (err, userAccess) {

            var result = {};

            result = ResultResponses.failed(CONSTANTS.HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
                'Some Error Occurred.', null);

            if (err) {
                throw(err);
            }

            if (userAccess) {

                if (userAccess.activated) {

                    result = ResultResponses.invalid(CONSTANTS.HTTP_CODES.SUCCESS.ALREADY_REPORTED,
                        'Already Activated. Login Now!!', null);
                } else if (!userAccess.activated && userAccess.activation_code !== req.params.activation_code) {

                    result = ResultResponses.invalid(CONSTANTS.HTTP_CODES.CLIENT_ERROR.BAD_REQUEST,
                        'Activation failed. Wrong Activation Code!!', null);
                } else if (!userAccess.activated && userAccess.activation_code == req.params.activation_code) {

                    userAccess.activated = true;
                    userAccess.activated_at = new Date();
                    userAccess.activation_code = null;

                    userAccess.save(function (err) {
                        if (err)
                            next(err);
                    })

                    result = ResultResponses.success(CONSTANTS.HTTP_CODES.SUCCESS.OK,
                        'Successfully Activated. You can Login Now!!', null);
                }
            } else if (!userAccess) {

                result = ResultResponses.invalid(CONSTANTS.HTTP_CODES.CLIENT_ERROR.BAD_REQUEST,
                    'Activation failed. User Not found!!', null);
            }
            res.json({'result': result});
        });
    }
}