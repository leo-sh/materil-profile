var userAccessController = require('./../controllers/userAccessController');
var AuthenticationTokenAPI = require('./../api/authenticationToken_api');
var userAccessValidator = require('./../controllers/parameterValidators/userAccessValidator');
var settingsValidator = require('./../controllers/parameterValidators/settingsValidator');
var settingsController = require('./../controllers/settingsController');

module.exports = function (authentication, passport) {

    authentication.get('/member_info', AuthenticationTokenAPI.getMemberInfo);

    // get all the user labels: Defaults and Customs
    authentication.get('/custom_labels', settingsController.getCustomLabels);

    // -------------------------------------- Phone Numbers ----------------------------------------------------------------
    authentication.post('/phone_number', settingsValidator.postAddNewPhoneNumberValidator, settingsController.postAddNewPhoneNumber);

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