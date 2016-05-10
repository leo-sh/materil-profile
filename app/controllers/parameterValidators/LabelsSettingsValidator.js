var util = require('util');
var ResultResponses = require('./../../helpers/resultResponses');
// loading user constants
var CONSTANTS = require('./../../helpers/constants');
module.exports = {

    deleteLabelsValidator: function (req, res, next) {

        var result = {};

        req.checkParams('label_id', 'Invalid Label Id').isLength({
            min: 24, max: 24
        });

        if (req.validationErrors()) {
            result = ResultResponses.validationError(CONSTANTS.HTTP_CODES.CLIENT_ERROR.NOT_ACCEPTABLE,
                'Invalid Request Parameters', errors);
            return res.json({'result': result});
        }
        next();
    },

    patchLabelsValidator: function (req, res, next) {

        var result = {};

        req.checkParams('label_id', 'Invalid Label Id').isLength({
            min: 24, max: 24
        });

        req.checkParams('new_label_name', 'Label Name Required').notEmpty();

        if (req.validationErrors()) {
            result = ResultResponses.validationError(CONSTANTS.HTTP_CODES.CLIENT_ERROR.NOT_ACCEPTABLE,
                'Invalid Request Parameters', errors);
            return res.json({'result': result});
        }
        next();
    },

    postLabelsValidator: function (req, res, next) {

        var result = {};

        var label_name = req.body.number;
        var user_id = req.body.user_id;

        req.checkBody('label_name', 'Valid Label Name is Required').notEmpty();
        req.checkBody('user_id', 'Valid User Id is Required').notEmpty();

        if (req.validationErrors()) {
            result = ResultResponses.validationError(CONSTANTS.HTTP_CODES.CLIENT_ERROR.NOT_ACCEPTABLE,
                'Invalid Request Parameters', errors);
            return res.json({'result': result});
        }
        next();
    },
}