// Required Models
var User = require('./../models/user_access');
var CustomLabels = require('./../models/custom_labels');

// loading user constants
var CONSTANTS = require('./../helpers/constants');
var ResultResponses = require('./../helpers/resultResponses');

module.exports = {
    // Get All the user and custom labels
    getLabels: function (req, res, next) {

        var result = {};

        result = ResultResponses.failed(CONSTANTS.HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
            'Some Error Occurred.');

        CustomLabels.find({_user_access_id: req.member._id}, {
            __v: 0,
            _user_access_id: 0,
            created_at: 0,
            updated_at: 0
        }, function (err, customLabels) {

            if (err)
                throw err;

            if (!customLabels) {

                result = ResultResponses.invalid(CONSTANTS.HTTP_CODES.CLIENT_ERROR.UNAUTHORISED,
                    'Authentication failed. User not found.!!');
            } else {

                result = ResultResponses.success(CONSTANTS.HTTP_CODES.SUCCESS.OK,
                    'Successfully Fetched!!', customLabels);
            }

            res.json({'result': result})
        })
    },
    // Delete a custom label
    deleteLabels: function (req, res, next) {

        var label_id = req.params.label_id;
        var result = {};

        result = ResultResponses.failed(CONSTANTS.HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
            'Some Error Occurred.');

        CustomLabels.findOneAndRemove({_id: label_id}, function (err, label) {

            if (err) {
                console.log('Label Delete Error: LabelSettingsController');
                throw err;
            }

            if (label) {

                result = ResultResponses.success(CONSTANTS.HTTP_CODES.SUCCESS.OK,
                    'Successfully Deleted!!', label);
            } else {

                result = ResultResponses.failed(CONSTANTS.HTTP_CODES.CLIENT_ERROR.BAD_REQUEST,
                    'Failed to delete label!!', label);
            }

            res.json({'result': result})
        });
    },
    // Change a custom label
    patchLabels: function (req, res, next) {

        var label_id = req.params.label_id;
        var new_label_name = req.params.new_label_name;
        var result = {};

        result = ResultResponses.failed(CONSTANTS.HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
            'Some Error Occurred.');

        CustomLabels.findOneAndUpdate({_id: label_id}, {label_name: new_label_name}, function (err, label) {

            if (err) {
                console.log('Label Update Error: LabelSettingsController');
                throw err;
            }

            if (label) {

                result = ResultResponses.success(CONSTANTS.HTTP_CODES.SUCCESS.OK,
                    'Successfully Updated!!', label);
            } else {

                result = ResultResponses.failed(CONSTANTS.HTTP_CODES.CLIENT_ERROR.BAD_REQUEST,
                    'Failed to update label!!', label);
            }

            res.json({'result': result})
        });
    },
    // Create a custom label
    postLabels: function (req, res, next) {

        var label_name = req.body.label_name;
        var user_id = req.body.user_id;
        var result = {};

        result = ResultResponses.failed(CONSTANTS.HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
            'Some Error Occurred.');

        var customLabel = new CustomLabels();
        customLabel.label_name = label_name;
        customLabel._user_access_id = user_id;

        customLabel.save(function (err) {
            if (err) {
                console.log('Custom Label Save Error: LabelSettingsController');
                throw err;
            }

            result = ResultResponses.success(CONSTANTS.HTTP_CODES.SUCCESS.OK,
                'Successfully Created!!', customLabel);
        });

        res.json({'result': result})
    }
}