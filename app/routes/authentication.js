var userAccessController = require('./../controllers/userAccessController');
var userDetailsController = require('./../controllers/userDetailsController');
var ActivitiesAPI = require('./../api/activities');
var userAccessValidator = require('./../controllers/parameterValidators/userAccessValidator');
var ContactNumbersSettingsValidator = require('./../controllers/parameterValidators/ContactNumbersSettingsValidator');
var LabelsSettingsValidator = require('./../controllers/parameterValidators/LabelsSettingsValidator');
var LabelsSettingsController = require('./../controllers/labelsSettingsController');
var ContactNumbersSettingsController = require('./../controllers/ContactNumbersSettingsController');
var SettingsController = require('./../controllers/SettingsController');

module.exports = function (authentication, passport) {

    //----------------------------------Member Info-----------------------------------
    authentication.get('/member_info', userDetailsController.getMemberInfo);
    authentication.put('/member_info', userDetailsController.putMemberInfo);
    authentication.delete('/member_info', userDetailsController.deleteMemberInfo);

    //-----------------------------------Defaults and Customs ----------------------------------------------------------------
    authentication.get('/labels', LabelsSettingsController.getLabels);
    authentication.post('/labels', LabelsSettingsValidator.postLabelsValidator, LabelsSettingsController.postLabels);
    authentication.patch('/labels/:label_id/:new_label_name', LabelsSettingsValidator.patchLabelsValidator, LabelsSettingsController.patchLabels);
    authentication.delete('/labels/:label_id', LabelsSettingsValidator.deleteLabelsValidator, LabelsSettingsController.deleteLabels);

    // -------------------------------------- Phone Numbers ----------------------------------------------------------------
    authentication.patch('/numbers', userAccessController.patchChangeContactNumber);

    // -------------------------------------- Email Address ----------------------------------------------------------------
    authentication.patch('/emails', userAccessController.patchEmailAddress);

    // -------------------------------------- Activities ----------------------------------------------------------------
    authentication.get('/activities', ActivitiesAPI.getActivities);

    // -------------------------------------- Notifications ----------------------------------------------------------------
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