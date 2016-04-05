var AuthenticationTokenAPI = require('./../api/authenticationToken_api');
var userAccessValidator = require('./../controllers/parameterValidators/userAccessValidator');
var userDetailsController = require('./../controllers/userDetailsController');

module.exports = function (route) {

    // Token API
    route.post('/x/token', userAccessValidator.loginValidator, AuthenticationTokenAPI.getToken);
}