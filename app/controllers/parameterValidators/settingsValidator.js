var util = require('util');
var ResultResponses = require('./../../helpers/resultResponses');
// loading user constants
var CONSTANTS = require('./../../helpers/constants');
module.exports = {

    postAddNewPhoneNumberValidator: function (req, res, next) {

        var result = {};

        var number = req.body.number;
        var _type_id = req.body._type_id;

        req.checkBody('number', 'Valid Phone Number is Required').notEmpty().isInt();
        req.checkBody('_type_id', 'Valid type Id is Required').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            result = ResultResponses.validationError(CONSTANTS.HTTP_CODES.CLIENT_ERROR.NOT_ACCEPTABLE,
                'Invalid Request Parameters', errors);
            return res.json({'result': result});
        }
        next();
    },
}