var UserAccess = require('./../models/user_access');
// loading user constants
var CONSTANTS = require('./../helpers/constants');

module.exports = {

    checkIfUserExists: function (req, res, next) {

        var email = req.params.email;

        UserAccess.findOne({email: email}, '_id email activated', function (err, userAccess) {

            if (err)
                next(err);

            var result = {
                'status': CONSTANTS.STATUS_TYPE.FAILED,
                'statusCode': CONSTANTS.HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
                'statusText': 'Some Error Occurred.'
            }

            if (userAccess) {

                if (!userAccess.activated) {

                    var result = {
                        'status': CONSTANTS.STATUS_TYPE.SUCCESS,
                        'statusCode': CONSTANTS.HTTP_CODES.SUCCESS.NON_AUTHORITATIVE_INFORMATION,
                        'statusText': 'User Not activated!!'
                    }
                } else {

                    var result = {
                        'status': CONSTANTS.STATUS_TYPE.SUCCESS,
                        'statusCode': CONSTANTS.HTTP_CODES.SUCCESS.OK,
                        'data': userAccess,
                        'statusText': 'User Found!!'
                    }
                }
            } else {

                var result = {
                    'status': CONSTANTS.STATUS_TYPE.INVALID,
                    'statusCode': CONSTANTS.HTTP_CODES.CLIENT_ERROR.BAD_REQUEST,
                    'statusText': 'User Not Found!!'
                }
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

            var result = {
                'status': CONSTANTS.STATUS_TYPE.FAILED,
                'statusCode': CONSTANTS.HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
                'statusText': 'Some Error Occurred.'
            }

            if (err) {
                next(err);
            }

            if (userAccess) {

                if (userAccess.activated) {

                    var result = {
                        'status': CONSTANTS.STATUS_TYPE.INVALID,
                        'statusCode': CONSTANTS.HTTP_CODES.SUCCESS.ALREADY_REPORTED,
                        'statusText': 'Already Activated. Login Now!!'
                    }
                } else if (!userAccess.activated && userAccess.activation_code != req.params.activation_code) {

                    var result = {
                        'status': CONSTANTS.STATUS_TYPE.INVALID,
                        'statusCode': CONSTANTS.HTTP_CODES.CLIENT_ERROR.BAD_REQUEST,
                        'statusText': 'Activation failed. Wrong url or You are not registered yet!!'
                    }
                } else if (userAccess.activation_code == req.params.activation_code) {

                    userAccess.activated = true;
                    userAccess.activated_at = new Date();
                    userAccess.activation_code = null;

                    userAccess.save(function (err) {
                        if (err)
                            next(err);
                    })

                    var result = {
                        'status': CONSTANTS.STATUS_TYPE.SUCCESS,
                        'statusCode': CONSTANTS.HTTP_CODES.SUCCESS.OK,
                        'statusText': 'Successfully Activated. You can Login Now!!'
                    }
                }
            } else if (!userAccess) {

                var result = {
                    'status': CONSTANTS.STATUS_TYPE.INVALID,
                    'statusCode': CONSTANTS.HTTP_CODES.CLIENT_ERROR.BAD_REQUEST,
                    'statusText': 'Activation failed. Wrong url or You are not registered yet!!'
                }
            }
            res.json({'result': result});
        });
    }
}