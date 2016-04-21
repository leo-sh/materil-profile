var User = require('./../models/user_access');
var UserDetails = require('./../models/user_details');
var Activities = require('./../models/activities');
// loading user constants
var CONSTANTS = require('./../helpers/constants');
var ResultResponses = require('./../helpers/resultResponses');
var getTokenFromHeader = require('./../helpers/getTokenFromHeader');
var CONFIG = require('./../../config/config');
var jwt = require("jsonwebtoken");

module.exports = {

    getActivities: function (req, res, next) {

        var member_id = req.member._id;
        var limit = req.query.limit;
        var offset = req.query.offset;
        var data, result = {};

        result = ResultResponses.failed(CONSTANTS.HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
            'Some Error Occurred.');

        Activities.find({_user_access_id: member_id}, {__v: 0}, {
            skip: offset,
            limit: limit
        }, function (err, activities) {

            if (err) {
                console.log('Error while Fetching Activities: Activities API');
                throw err;
            }

            data = {
                limit: limit,
                offset: offset,
                activities: activities
            }

            Activities.count({_user_access_id: member_id}, function (err, TotalCount) {

                data.count = TotalCount;

                result = ResultResponses.success(CONSTANTS.HTTP_CODES.SUCCESS.OK,
                    'Successfully fetched all Activities.', data);
                res.json({'result': result})
            })
        });
    }
}