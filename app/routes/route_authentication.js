module.exports = function (app, passport) {

    // process the signup form
    app.post('/authentication/signup', passport.authenticate('local-signup', {
        successRedirect: '/authentication/signup/success',
        failureRedirect: '/authentication/signup/failure',
        failureFlash: true
    }));

    //registration success
    app.get('/authentication/signup/success', function (req, res) {

        res.json(req.flash());
    });

    //registration failure
    app.get('/authentication/signup/failure', function (req, res) {

        res.json(req.flash());
    });
}