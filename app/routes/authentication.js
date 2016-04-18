var userAccessController = require('./../controllers/userAccessController');
var userDetailsController = require('./../controllers/userDetailsController');
var AuthenticationTokenAPI = require('./../api/authenticationToken_api');
var userAccessValidator = require('./../controllers/parameterValidators/userAccessValidator');
var ContactNumbersSettingsValidator = require('./../controllers/parameterValidators/ContactNumbersSettingsValidator');
var LabelsSettingsValidator = require('./../controllers/parameterValidators/LabelsSettingsValidator');
var LabelsSettingsController = require('./../controllers/labelsSettingsController');
var ContactNumbersSettingsController = require('./../controllers/ContactNumbersSettingsController');

module.exports = function (authentication, passport) {

    //----------------------------------Member Info-----------------------------------
    authentication.get('/member_info', userDetailsController.getMemberInfo);
    authentication.put('/member_info', userDetailsController.putMemberInfo);

    //-----------------------------------Defaults and Customs ----------------------------------------------------------------
    authentication.get('/labels', LabelsSettingsController.getLabels);
    authentication.post('/labels', LabelsSettingsValidator.postLabelsValidator, LabelsSettingsController.postLabels);
    authentication.patch('/labels/:label_id/:new_label_name', LabelsSettingsValidator.patchLabelsValidator, LabelsSettingsController.patchLabels);
    authentication.delete('/labels/:label_id', LabelsSettingsValidator.deleteLabelsValidator, LabelsSettingsController.deleteLabels);

    // -------------------------------------- Phone Numbers ----------------------------------------------------------------
    authentication.get('/numbers', ContactNumbersSettingsController.getNumbers);
    authentication.post('/numbers', ContactNumbersSettingsValidator.postNumbersValidator, ContactNumbersSettingsController.postNumbers);
    authentication.put('/numbers', ContactNumbersSettingsValidator.postNumbersValidator, ContactNumbersSettingsController.postNumbers);
    authentication.delete('/numbers/:number_id', ContactNumbersSettingsValidator.deleteNumbersValidator, ContactNumbersSettingsController.deleteNumbers);

    //get user status
    authentication.get('/user/status', userAccessController.userStatus);
    //GET: check if user exists
    authentication.get('/user/:email', userAccessValidator.checkIfUserExistsValidator,
        userAccessController.checkIfUserExists);

    //GET: change password
    authentication.post('/change/password', userAccessValidator.changePasswordValidator,
        userAccessController.changePassword);

    //Logout
    authentication.get('/logout', userAccessController.logOut);
}