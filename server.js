// server.js
var package_json = require('./package');

var port = process.env.PORT || 8080;
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// configuration ===============================================================
var express = require('./config/express');

var app = express();

// launch ======================================================================
var server = app.listen(port, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Current Environment: %s', app.settings.env);
    console.log('%s App Version: %s listening at http://%s:%s', package_json.name, package_json.version, host, port);

});


module.exports = app;

