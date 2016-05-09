var UserAccessDetails = require('./../models/user_access_details');
var UserAccessDevices = require('./../models/user_devices');
var CustomLabels = require('./../models/custom_labels');

var AfterLoginMiddleware = {

    // Saving the device history of the user
    userDeviceUsed: function (os_type, _user_access_id) {

        UserAccessDevices.findOne({_user_access_id: _user_access_id, os_type: os_type}, function (err, userAccessDevice) {

            if (err) {
                next(err);
            }

            if (!userAccessDevice) {

                var userAccessDevice = new UserAccessDevices();
                userAccessDevice._user_access_id = _user_access_id;
                userAccessDevice.os_type = os_type;
                userAccessDevice.save(function (err) {

                    if (err)
                        throw err;
                });
            }
        })
    },
    // Saving Login Details of the user
    UserAccessDetails: function (os_type, _user_access_id) {

        // Insert login time and os_type in the database
        var userAccessDetails = new UserAccessDetails();
        userAccessDetails.login_at = new Date();
        userAccessDetails.os_type = os_type;
        userAccessDetails._user_access_id = _user_access_id;
        userAccessDetails.save(function (err) {

            if (err)
                throw err;
        });

    },
    // Creating Default Labels for Every User after first login
    CreateDefaultLabels: function (_user_access_id) {

        console.log(_user_access_id);

        CustomLabels.findOne({label_name: 'Home', _user_access_id: _user_access_id}, function (err, labelHome) {

            if (err){
                console.log('Error in finding Custom Labels: AfterLogin->CreateDefaultLabels');
                throw err;
            }

            if (!labelHome) {

                var custom_labels = new CustomLabels();
                custom_labels.label_name = 'Home';
                custom_labels._user_access_id = _user_access_id;
                custom_labels.label_icon = 'Home';
                custom_labels.save(function (err) {

                    if (err){
                        console.log('Error in creating Custom Labels: AfterLogin->CreateDefaultLabels');
                        throw err;
                    }
                });
            }
        });

        CustomLabels.findOne({label_name: 'Work', _user_access_id: _user_access_id}, function (err, labelWork) {

            if (err){
                console.log('Error in finding Custom Labels: AfterLogin->CreateDefaultLabels');
                throw err;
            }

            if (!labelWork) {

                var custom_labels = new CustomLabels();
                custom_labels.label_name = 'Work';
                custom_labels._user_access_id = _user_access_id;
                custom_labels.label_icon = 'Work';
                custom_labels.save(function (err) {

                    if (err){
                        console.log('Error in creating Custom Labels: AfterLogin->CreateDefaultLabels');
                        throw err;
                    }
                });
            }
        });
    }

}

module.exports = AfterLoginMiddleware;
