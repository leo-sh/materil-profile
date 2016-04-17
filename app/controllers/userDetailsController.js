var userDetails = require('./../models/user_details');
var UserAccess = require('./../models/user_access');
// loading user constants
var CONSTANTS = require('./../helpers/constants');
var ResultResponses = require('./../helpers/resultResponses');


module.exports = {

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

                user.first_name = req.params.first_name;
                user.last_name = req.params.last_name;
                user.nick_name = req.params.nick_name;
                user.sex = req.params.sex;
                user.dob = new Date(req.params.dob);

                user.save(function (err) {

                    if (err) {
                        console.log('User Save Error: userDetailsController');
                        throw err;
                    }
                });

                result = ResultResponses.success(CONSTANTS.HTTP_CODES.SUCCESS.OK,
                    'Successfully Fetched!!', user);
            } else {

                result = ResultResponses.invalid(CONSTANTS.HTTP_CODES.CLIENT_ERROR.UNAUTHORISED,
                    'User not found.!!');
            }

            res.json({'result': result})
        });
    }
}