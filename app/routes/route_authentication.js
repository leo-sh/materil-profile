var userAccessController = require('./../controllers/userAccessController');

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
    app.get('/authentication/user/:email', userAccessController.checkIfUserExists);

    //User Activation
    app.get('/authentication/activate/:user_id/:activation_code', userAccessController.activate);

    //Logout
    app.get('/authentication/logout', userAccessController.logOut);
}