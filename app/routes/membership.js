var userAccessController = require('./../controllers/userAccessController');
var AuthenticationTokenAPI = require('./../api/authenticationToken_api');
var userAccessValidator = require('./../controllers/parameterValidators/userAccessValidator');
var JwtStrategy = require('passport-jwt').Strategy;

module.exports = function (passport, app) {

    // process the signup form
    app.post('/signup', userAccessValidator.signupValidator, passport.authenticate('local-signup', {
        successRedirect: '/api/membership/success',
        failureRedirect: '/api/membership/failure',
        failureFlash: true
    }));

    // process the login form
    app.post('/login', userAccessValidator.loginValidator, passport.authenticate('local-login', {
        successRedirect: '/api/membership/success',
        failureRedirect: '/api/membership/failure',
        failureFlash: true
    }));

    //registration success
    app.get('/success', function (req, res) {

        res.json(req.flash());
    });

    //registration failure
    app.get('/failure', function (req, res) {

        res.json(req.flash());
    });

    //get user status
    app.get('/user/status', userAccessController.userStatus);

    //GET: check if user exists
    app.get('/user/:email', userAccessValidator.checkIfUserExistsValidator,
        userAccessController.checkIfUserExists);

    //GET: check if user_id and reset_password_code is correct
    app.get('/reset/:user_id/:reset_code', userAccessValidator.checkResetCodeValidator,
        userAccessController.checkResetCode);

    //GET: change password
    app.post('/changes/password', userAccessValidator.changePasswordValidator,
        userAccessController.postChangePassword);

    //User Activation
    app.get('/activate/:user_id/:activation_code', userAccessValidator.activateValidator,
        userAccessController.activate);

    //Logout
    app.get('/logout', userAccessController.logOut);
}