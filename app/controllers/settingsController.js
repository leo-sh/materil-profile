// Required Models
var User = require('./../models/user_access');
var UserDetails = require('./../models/user_details');
var CustomLabels = require('./../models/custom_labels');
var PhoneNumbers = require('./../models/phone_numbers');
var userDetailsSchema = require('./../models/user_details');

// loading user constants
var CONSTANTS = require('./../helpers/constants');
var ResultResponses = require('./../helpers/resultResponses');
var getTokenFromHeader = require('./../helpers/getTokenFromHeader');

module.exports = {

    postAddNewPhoneNumber: function (req, res, next) {

        var number = req.body.number;
        var _type_id = req.body._type_id;
        var member_id = req.member.member_details_id;

        var result = {};

        var phone_number = new PhoneNumbers();
        phone_number._type_id = _type_id;
        phone_number.number = number;
        phone_number.save(function (err) {

            if (err) {
                console.log('Error in Saving Phone Number');
                throw err;
            }

        });

        // insert the record in user access collection
        userDetailsSchema.findOne(member_id, function (err, user) {

            if (err) {
                console.log('Error while saving contact number');
                throw err;
            }
            if (!user) {
                console.log('User Not found while saving contact number');
            }

            user.contact_numbers.push({phone_number_id: phone_number._id});
            user.save(function (err) {
                if (err) {
                    console.log('Error in saving Phone Number to UserDetails Document');
                    throw err;
                }
            });
        });

        result = ResultResponses.success(CONSTANTS.HTTP_CODES.SUCCESS.OK,
            'Successfully saved new Phone Number.', phone_number);

        res.json({'result': result})
    },
    getCustomLabels: function (req, res, next) {

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
    }
}