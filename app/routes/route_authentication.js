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
    app.get('/authentication/user/status', function (req, res) {

        if (!req.isAuthenticated()) {
            return res.status(200).json({
                status: false
            });
        }
        res.status(200).json({
            status: true
        });
    });

    //Logout
    app.get('/authentication/logout', function (req, res) {

        req.logout();
        res.status(200).json({
            status: 'Logged Out Successfully!!'
        });
    });
}