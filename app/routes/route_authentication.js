module.exports = function (app, passport) {

    // process the signup form
    app.post('/authentication/signup',
        passport.authenticate('local-signup'),
        function (req, res) {
            console.log("1-");
            console.log(req.authInfo);
            res.json({
                'message': 'Congratulations. You have successfully Registered.'
            });
        }
    );
}