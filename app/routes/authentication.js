var userAccessController = require('./../controllers/userAccessController');
var userDetailsController = require('./../controllers/userDetailsController');
var ActivitiesAPI = require('./../api/activities');
var userAccessValidator = require('./../controllers/parameterValidators/userAccessValidator');
var ContactNumbersSettingsValidator = require('./../controllers/parameterValidators/ContactNumbersSettingsValidator');
var LabelsSettingsValidator = require('./../controllers/parameterValidators/LabelsSettingsValidator');
var LabelsSettingsController = require('./../controllers/LabelsSettingsController');
var ContactNumbersSettingsController = require('./../controllers/ContactNumbersSettingsController');
var SettingsController = require('./../controllers/SettingsController');
var multer = require('multer');
var fs = require('fs');

module.exports = function (authentication, passport, upload) {

    //----------------------------------Member Info-----------------------------------
    authentication.get('/member_info', userDetailsController.getMemberInfo);
    authentication.put('/member_info', userDetailsController.putMemberInfo);
    authentication.delete('/member_info', userDetailsController.deleteMemberInfo);

    // -----------------------------Upload Profile PIC -----------------------------------------------------------------

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            var dir_name = __dirname + './../../config/uploads/' + req.member._id + '/';

            if (!fs.existsSync(dir_name)) {
                fs.mkdirSync(dir_name);
            }
            cb(null, dir_name);
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, 'profile_' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
        }
    });

    var upload = multer({ //multer settings
        storage: storage
    }).single('file');

    authentication.post('/profile/pic', function (req, res, next) {

        upload(req, res, function (err) {

            if (err) {
                console.log(err);
                return;
            }

            next();
        });
    }, userDetailsController.postProfilePic);

    //-----------------------------------Defaults and Customs ----------------------------------------------------------
    authentication.get('/labels', LabelsSettingsController.getLabels);
    //authentication.post('/labels', LabelsSettingsValidator.postLabelsValidator, LabelsSettingsController.postLabels);
    //authentication.patch('/labels/:label_id/:new_label_name', LabelsSettingsValidator.patchLabelsValidator, LabelsSettingsController.patchLabels);
    //authentication.delete('/labels/:label_id', LabelsSettingsValidator.deleteLabelsValidator, LabelsSettingsController.deleteLabels);

    // -------------------------------------- Phone Numbers ------------------------------------------------------------
    authentication.patch('/numbers', userAccessController.patchChangeContactNumber);

    // -------------------------------------- Email Address ------------------------------------------------------------
    authentication.patch('/emails', userAccessController.patchEmailAddress);

    // -------------------------------------- Activities ---------------------------------------------------------------
    authentication.get('/activities', ActivitiesAPI.getActivities);

    // -------------------------------------- Notifications ------------------------------------------------------------
    authentication.get('/notifications', SettingsController.getNotifications);
    authentication.put('/notifications', SettingsController.putNotifications);

    //GET: change password
    authentication.post('/change/password', userAccessValidator.changePasswordValidator,
        userAccessController.postChangePassword);

    //get user status
    authentication.get('/user/status', userAccessController.userStatus);
    //GET: check if user exists
    authentication.get('/user/:email', userAccessValidator.checkIfUserExistsValidator,
        userAccessController.checkIfUserExists);

    //Logout
    authentication.get('/logout', userAccessController.logOut);
}