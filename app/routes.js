module.exports = function (app, passport, express) {

    var route_user = express.router();

    require('./routes/route_sample')(app);
    require('./routes/route_authentication')(app, passport);   // routes for authentication of users
    require('./routes/route_user')(route_user);   // routes for authentication of users

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function (req, res) {
        res.render('index.html');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user
        });
    });

    app.use('/api', route_user);
}

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/#/authentication/signin');
}
