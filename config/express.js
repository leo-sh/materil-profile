// set up ======================================================================
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var multer = require('multer');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var validator = require('express-validator');
var config = require('./config');
var favicon = require('serve-favicon');


module.exports = function () {

    //-------------------------------------DEBUG-------------------------------------------
    console.log("Starting Application---------------------------------------------------------------");

    var app = express();

    require('./passport')(passport); // pass passport for configuration

    //Mongoose configuration ===============================================================
    mongoose.set('debug', true);
    mongoose.connect(config.DATABASE); // connect to our database
    mongoose.connection.on('error', function () {
        console.log('Mongoose connection error');
    });
    mongoose.connection.once('open', function callback() {
        console.log("Mongoose connected to the database");
    });


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

    // HTTP Request handling configurations--------------------------------------------------------------------------------
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
        next();
    });

    // Set Session variables
    app.set('SESSION_SECRET', config.ENV.SESSION_.SECRET); // secret variable

    // Express Validator-------------------------------for parameters validations--------------------
    app.use(validator());

    // EJS -------------------------------------------------------------------------------Setting Templating Engine------------------------------------------------
    app.set('view engine', 'ejs'); // set up ejs for templating

    // Passport            -----------------------------------------------------------------------Passport Settings-----------------------------------------
    app.use(session({
            saveUninitialized: true,
            resave: true,
            secret: config.ENV.SESSION_.SECRET
        })
    ); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session

    app.use(express.static(__dirname + './../public'));
    app.use('/bower_components', express.static(__dirname + './../bower_components'));


    app.use(favicon(__dirname + './../public/favicon.ico'));

    var throwjs = require('throw.js');

    // Routes ======================================================================var fs = require('fs');

    var api_routes = express.Router();
    var route_user = express.Router();
    var route_authentication = express.Router();
    var membership_route = express.Router();
    //require('./../app/routes.js')(app, passport, express); // load our routes and pass in our app and fully configured passport
    require('./../app/routes/sample')(app);

    // token route for api
    require('./../app/routes/token')(api_routes);

    // membership api routes
    require('./../app/routes/membership')(passport, membership_route);
    api_routes.use('/membership', membership_route);   // adding '/api/membership ' prefix to all the routes

    // routes for authentication of users
    var authenticated_urls = require('./../app/middlewares/authenticated_urls');
    route_authentication.use(authenticated_urls);

    require('./../app/routes/authentication')(route_authentication, passport);
    api_routes.use('/authentication', route_authentication);

    api_routes.use('/api', api_routes);   // adding '/api ' prefix to all the routes

    app.use(multer({
        dest: './public/uploads',
        changeDest: function(dest, req, res){
            dest += '/haha/';
            try{
                stat = fs.statSync(dest);
            }catch(err){
                fs.mkdirSync(dest);
            }
            return dest;
        },
        onFileUploadStart: function(file){
            console.log('starting');
        }
    }));

    // routes for authentication of users
    //require('./../app/routes/user')(route_user);
    //app.use('/api', route_user);

    return app;
}