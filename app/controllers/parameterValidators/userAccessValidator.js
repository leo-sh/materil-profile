var util = require('util');
var ResultResponses = require('./../../helpers/resultResponses');
// loading user constants
var CONSTANTS = require('./../../helpers/constants');
module.exports = {
    loginValidator: function (req, res, next) {
        var result = {};

        var email = req.body.email;
        var password = req.body.password;

        req.checkBody('email', 'Valid Email is Required').isEmail();
        req.checkBody('password', 'Password is Required').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            result = ResultResponses.validationError(CONSTANTS.HTTP_CODES.CLIENT_ERROR.NOT_ACCEPTABLE,
                'Invalid Request Parameters', errors);
            return res.json({'result': result});
        }
        next();
    },
    signupValidator: function (req, res, next) {
        var result = {};

        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
        var email = req.body.email;
        var password = req.body.password;
        var contact_number = req.body.contact_number;
        var country_code = req.body.country_code;

        req.checkBody('first_name', 'First Name is Required').notEmpty();
        req.checkBody('last_name', 'Last Name is Required').notEmpty();
        req.checkBody('email', 'Valid Email is Required').isEmail();
        req.checkBody('password', 'Password is Required').notEmpty();
        req.checkBody('contact_number', 'Contact Number is Required').notEmpty();
        req.checkBody('country_code', 'Country Code is Required').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            result = ResultResponses.validationError(CONSTANTS.HTTP_CODES.CLIENT_ERROR.NOT_ACCEPTABLE,
                'Invalid Request Parameters', errors);
            return res.json({'result': result});
        }
        next();
    },
    changePasswordValidator: function (req, res, next) {
        var result = {};
        var new_password = req.body.new_password;
        var confirm_new_password = req.body.confirm_password;
        var current_password = req.body.current_password;

        console.log(req.body);

        req.checkBody('new_password', 'Invalid password').isLength({
            min: 6, max: 36
        });
        req.checkBody('current_password', 'Invalid Current Password').notEmpty();

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
        req.checkParams('user_id', 'Invalid User Id').isLength({
            min: 24, max: 24
        });
        req.checkParams('activation_code', 'Invalid Activation Code').isLength({
            min: 10, max: 10
        });
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
        req.checkParams('user_id', 'Invalid User Id').isLength({
            min: 24, max: 24
        });
        req.checkParams('reset_code', 'Invalid Reset Password Code').isLength({
            min: 10, max: 10
        });;
        var errors = req.validationErrors();
        if (errors) {
            result = ResultResponses.validationError(CONSTANTS.HTTP_CODES.CLIENT_ERROR.NOT_ACCEPTABLE,
                'Invalid Request Parameters', errors);
            return res.json({'result': result});
        }
        next();
    }
}