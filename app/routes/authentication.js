var userAccessController = require('./../controllers/userAccessController');
var AuthenticationTokenAPI = require('./../api/authenticationToken_api');
var userAccessValidator = require('./../controllers/parameterValidators/userAccessValidator');

module.exports = function (authentication, passport) {

    authentication.get('/member_info', AuthenticationTokenAPI.getMemberInfo);

    authentication.get('/custom_labels', AuthenticationTokenAPI.getCustomLabels);

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