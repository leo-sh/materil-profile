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

    getNumbers: function (req, res, next) {

        var member_id = req.member.member_details_id;
        var limit = req.query.limit;
        var offset = req.query.offset;
        var data, result;

        userDetailsSchema.findOne({_id: member_id}, function (err, userDetails) {

            if (err) {
                console.log('Error while Fetching contact numbers: ContactNumbersSettingsController');
                throw err;
            }
            if (!userDetails) {
                console.log('User Not found while Fetching contact number: ContactNumbersSettingsController');
            }

            var phoneNumberIds = [];

            for (var i = 0; i < userDetails.contact_numbers.length; i++) {
                phoneNumberIds[i] = userDetails.contact_numbers[i].phone_number_id;
            }

            PhoneNumbers.find({_id: {$in: phoneNumberIds}}, {__v: 0}, {
                skip: offset,
                limit: limit
            }, function (err, phoneNumbers) {

                if (err) {
                    console.log('Error while Fetching contact numbers: ContactNumbersSettingsController');
                    throw err;
                }
                if (!phoneNumbers) {
                    console.log('User Not found while Fetching contact number: ContactNumbersSettingsController');
                }

                data = {
                    limit: limit,
                    offset: offset,
                }

                PhoneNumbers.count({_id: {$in: phoneNumberIds}}, function (err, TotalCount) {

                    if (err) {
                        console.log('Error while Fetching contact numbers count: ContactNumbersSettingsController');
                        throw err;
                    }
                    if (!TotalCount) {
                        console.log('User Not found while Fetching contact numbers count: ContactNumbersSettingsController');
                    }

                    data.count = TotalCount;
                    data.phoneNumbers = phoneNumbers;

                    result = ResultResponses.success(CONSTANTS.HTTP_CODES.SUCCESS.OK,
                        'Successfully fetched all Phone Numbers.', data);

                    res.json({'result': result})
                })
            });
        });
    },
    postNumbers: function (req, res, next) {

        var number = req.body.number;
        var _type_id = req.body._type_id;
        var member_id = req.member.member_details_id;

        var result;

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
                console.log('Error while Saving contact number');
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
    deleteNumbers: function (req, res, next) {

        var result;
        var number_id = req.params.number_id;

        PhoneNumbers.findByIdAndRemove(number_id, function (err, phone_number) {

            if (err) {
                console.log('Error while Deleting contact number');
                throw err;
            }
            if (!phone_number) {

                result = ResultResponses.success(CONSTANTS.HTTP_CODES.SUCCESS.OK,
                    'Phone Number Not found', phone_number);

            } else {

                userDetailsSchema.findByIdAndUpdate(req.member.member_details_id,
                    {$pull: {contact_numbers: {phone_number_id: number_id}}},
                    function (err, user) {

                        if (err) {
                            console.log('Error while Saving contact number');
                            throw err;
                        }
                        if (!user) {
                            console.log('User Not found while saving contact number');
                        } else {

                            result = ResultResponses.success(CONSTANTS.HTTP_CODES.SUCCESS.OK,
                                'Successfully Deleted the Phone Number.', phone_number);
                        }

                        res.json({'result': result})
                    })
            }

            res.json({'result': result})
        })
    }
}