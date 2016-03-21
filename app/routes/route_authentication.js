var userAccessController = require('./../controllers/userAccessController');
var userAccessValidator = require('./../controllers/parameterValidators/userAccessValidator');

module.exports = function (app, passport) {

    // process the signup form
    app.post('/authentication/signup', passport.authenticate('local-signup', {
        successRedirect: '/authentication/success',
        failureRedirect: '/authentication/failure',
        failureFlash: true
    }));

    // process the login form
    app.post('/authentication/login', passport.authenticate('local-login', {
        successRedirect: '/authentication/success', // redirect to the secure profile section
        failureRedirect: '/authentication/failure', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    //registration success
    app.get('/authentication/success', function (req, res) {

        res.json(req.flash());
    });

    //registration failure
    app.get('/authentication/failure', function (req, res) {

        res.json(req.flash());
    });

    //get user status
    app.get('/authentication/user/status', userAccessController.userStatus);

    //GET: check if user exists
    app.get('/authentication/user/:email', userAccessValidator.checkIfUserExistsValidator,
        userAccessController.checkIfUserExists);

    //GET: check if user_id and reset_password_code is correct
    app.get('/authentication/reset/:user_id/:reset_code', userAccessValidator.checkResetCodeValidator,
        userAccessController.checkResetCode);

    //GET: change password
    app.post('/authentication/change/password', userAccessValidator.changePasswordValidator,
        userAccessController.changePassword);

    //User Activation
    app.get('/authentication/activate/:user_id/:activation_code', userAccessValidator.activateValidator,
        userAccessController.activate);

    //Logout
    app.get('/authentication/logout', userAccessController.logOut);
}