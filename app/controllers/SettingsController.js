var userDetails = require('./../models/user_details');
var Notifications = require('./../models/notifications');
// loading user constants
var CONSTANTS = require('./../helpers/constants');
var ResultResponses = require('./../helpers/resultResponses');


module.exports = {

    getNotifications: function (req, res) {

        var result = {};

        result = ResultResponses.failed(CONSTANTS.HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
            'Some Error Occurred.');

        Notifications.findOne({_user_access_id: req.member._id}, function (err, notifications) {

            if (err) {
                console.log('Error: SettingsController->getNotifications');
                throw err;
            }

            if (notifications) {

                result = ResultResponses.success(CONSTANTS.HTTP_CODES.SUCCESS.OK,
                    'Successfully Fetched!!', notifications);
            } else {

                var notifications = new Notifications();
                notifications._user_access_id = req.member._id;

                notifications.save(function (err) {

                    if (err) {
                        console.log('Notifications Save Error: SettingsController->getNotifications');
                        throw err;
                    }
                });

                result = ResultResponses.success(CONSTANTS.HTTP_CODES.SUCCESS.OK,
                    'Successfully Fetched!!', notifications);
            }

            res.json({'result': result})
        });
    },
    putNotifications: function (req, res) {

        var result = {};

        result = ResultResponses.failed(CONSTANTS.HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR,
            'Some Error Occurred.');

        Notifications.findOne({_user_access_id: req.member._id}, function (err, notifications) {

            if (err) {
                console.log('Error: SettingsController->putNotifications');
                throw err;
            }

            if (notifications) {

                notifications.email_news = req.body.email_news;
                notifications.email_offers = req.body.email_offers;
                notifications.mobile_news = req.body.mobile_news;
                notifications.mobile_offers = req.body.mobile_offers;

                notifications.save(function (err) {

                    if (err) {
                        console.log('Notifications Save Error: SettingsController->putNotifications');
                        throw err;
                    }
                });

                result = ResultResponses.success(CONSTANTS.HTTP_CODES.SUCCESS.OK,
                    'Successfully Modified!!', notifications);
            } else {

                result = ResultResponses.invalid(CONSTANTS.HTTP_CODES.CLIENT_ERROR.UNAUTHORISED,
                    'Notifications not found.!!');
            }

            res.json({'result': result})
        });
    }
}