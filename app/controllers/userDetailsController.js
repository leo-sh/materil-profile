var userDetails = require('./../models/user_details');
var UserAccess = require('./../models/user_access');
// loading user constants
var CONSTANTS = require('./../helpers/constants');
var ResultResponses = require('./../helpers/resultResponses');


module.exports = {

    getMemberInfo: function (req, res, next) {

        var result = ResultResponses.success(CONSTANTS.HTTP_CODES.SUCCESS.OK,
            'Successfully Authenticated!!', req.member);

        res.json({'result': result})
    },
    deleteMemberInfo: function (req, res) {

        var result = {};

        result = ResultResponses.failed(CONSTANTS.HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
            'Some Error Occurred.');

        UserAccess.findOne({_id: req.member._id}, function (err, user) {

            if (err) {
                console.log('User Delete Error: userDetailsController->deleteMemberInfo');
                throw err;
            }

            if (user) {

                user.deleted_at = new Date();
                user.save(function (err) {

                    if (err) {
                        console.log('User Delete update Error: userDetailsController->deleteMemberInfo');
                        throw err;
                    }
                });

                result = ResultResponses.success(CONSTANTS.HTTP_CODES.SUCCESS.OK,
                    'Successfully Deleted!!', user);
            } else {

                result = ResultResponses.invalid(CONSTANTS.HTTP_CODES.CLIENT_ERROR.UNAUTHORISED,
                    'User not found.!!');
            }

            res.json({'result': result})
        });
    },
    putMemberInfo: function (req, res) {

        var result = {};

        result = ResultResponses.failed(CONSTANTS.HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
            'Some Error Occurred.');

        userDetails.findOne({_id: req.member.member_details_id}, function (err, user) {

            if (err) {
                console.log('User Update Error: userDetailsController');
                throw err;
            }

            if (user) {

                user.first_name = req.body.first_name;
                user.last_name = req.body.last_name;
                user.nick_name = req.body.nick_name;
                user.sex = req.body.sex;
                user.show_dob = req.body.show_dob;
                user.dob = new Date(req.body.dob);

                user.save(function (err) {

                    if (err) {
                        console.log('User Save Error: userDetailsController');
                        throw err;
                    }
                });

                result = ResultResponses.success(CONSTANTS.HTTP_CODES.SUCCESS.OK,
                    'Details Successfully Updated!!', user);
            } else {

                result = ResultResponses.invalid(CONSTANTS.HTTP_CODES.CLIENT_ERROR.UNAUTHORISED,
                    'User not found.!!');
            }

            res.json({'result': result})
        });
    }
}