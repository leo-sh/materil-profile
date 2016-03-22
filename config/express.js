// set up ======================================================================
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var validator = require('express-validator');
var config = require('./config');


module.exports = function () {

    var app = express();

    require('./passport')(passport); // pass passport for configuration

// configuration ===============================================================
    mongoose.connect(config.mongoDbUrl); // connect to our database

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(cookieParser()); // read cookies (needed for auth)

// Body Parser        ----------------------------------------------------------------To get Information from the Form------------------------------------------------
    app.use(bodyParser()); // get information from html forms
    app.use(bodyParser.json()); // get information in json format
    app.use(bodyParser.urlencoded({
        extended: true
    })); // get information in urlEncodedForm

// Express Validator-------------------------------for parameters validations--------------------
    app.use(validator());

// EJS -------------------------------------------------------------------------------Setting Templating Engine------------------------------------------------
    app.set('view engine', 'ejs'); // set up ejs for templating

// Passport            -----------------------------------------------------------------------Passport Settings-----------------------------------------
    app.use(session({
            saveUninitialized: true,
            resave: true,
            secret: config.sessionSecret
        })
    ); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session

    app.use(express.static(__dirname + './../public'));
    app.use('/bower_components', express.static(__dirname + './../bower_components'));

    var throwjs = require('throw.js');

// Routes ======================================================================

    require('./../app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

    return app;
}