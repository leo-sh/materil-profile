// server.js

// set up ======================================================================
var express = require('express');
var app = express();
var router = express.Router();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

// Body Parser        ----------------------------------------------------------------To get Information from the Form------------------------------------------------
app.use(bodyParser()); // get information from html forms
app.use(bodyParser.json()); // get information in json format
app.use(bodyParser.urlencoded({
    extended: true
})); // get information in urlEncodedForm

// EJS -------------------------------------------------------------------------------Setting Templating Engine------------------------------------------------
app.set('view engine', 'ejs'); // set up ejs for templating

// Passport            -----------------------------------------------------------------------Passport Settings-----------------------------------------
app.use(session({
        secret: 'materialProfileAuthenticationApp'
    })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

// Routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


var errorNotFoundHandler = require('./app/errors/notFoundError.js');

//app.get('*', function (req, res, next) {
//    var err = new Error();
//    err.status = 404;
//    next(err);
//});

// handling 404 errors
//app.use(errorNotFoundHandler);
// launch ======================================================================

var server = app.listen(8080, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Materil-Profile app listening at http://%s:%s', host, port);

});

