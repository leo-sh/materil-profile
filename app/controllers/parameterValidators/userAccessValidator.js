var util = require('util');
var ResultResponses = require('./../../helpers/resultResponses');
// loading user constants
var CONSTANTS = require('./../../helpers/constants');
module.exports = {
    changePasswordValidator: function (req, res, next) {
        var result = {};
        var new_password = req.body.new_password;
        var confirm_password = req.body.confirm_password;
        var user_id = req.body.user_id;

        req.checkBody('new_password', 'Invalid password');
        req.checkBody('confirm_password', 'Invalid Confirm Password');
        req.checkBody('user_id', 'Invalid User Id');

        var errors = req.validationErrors();
        if (errors) {
            result = ResultResponses.validationError(CONSTANTS.HTTP_CODES.CLIENT_ERROR.NOT_ACCEPTABLE,
                'Invalid Request Parameters', errors);
            return res.json({'result': result});
        }
        next();
    },
    activateValidator: function (req, res, next) {
        var result = {};
        req.checkParams('user_id', 'Invalid User Id');
        req.checkParams('activation_code', 'Invalid Activation Code');
        var errors = req.validationErrors();
        if (errors) {
            result = ResultResponses.validationError(CONSTANTS.HTTP_CODES.CLIENT_ERROR.NOT_ACCEPTABLE,
                'Invalid Request Parameters', errors);
            return res.json({'result': result});
        }
        next();
    },
    checkIfUserExistsValidator: function (req, res, next) {
        var result = {};
        req.checkParams('email', 'Invalid Email Address').isEmail();
        var errors = req.validationErrors();
        if (errors) {
            result = ResultResponses.validationError(CONSTANTS.HTTP_CODES.CLIENT_ERROR.NOT_ACCEPTABLE,
                'Invalid Request Parameters', errors);
            return res.json({'result': result});
        }
        next();
    },
    checkResetCodeValidator: function (req, res, next) {
        var result = {};
        req.checkParams('user_id', 'Invalid User Id');
        req.checkParams('reset_code', 'Invalid Reset Password Code');
        var errors = req.validationErrors();
        if (errors) {
            result = ResultResponses.validationError(CONSTANTS.HTTP_CODES.CLIENT_ERROR.NOT_ACCEPTABLE,
                'Invalid Request Parameters', errors);
            return res.json({'result': result});
        }
        next();
    }
}