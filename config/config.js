const util = require('util');
var environment = require('./env/' + (process.env.NODE_ENV || 'development') + '.js');
var database = function (ENV) {
    return util.format('mongodb://%s:%s@%s:%s/%s',
        ENV.MONGO_.DB_USERNAME, ENV.MONGO_.DB_PASSWORD, ENV.MONGO_.DB_HOST, ENV.MONGO_.DB_PORT, ENV.MONGO_.DB_DATABASE_NAME);
}

module.exports = {
    ENV: environment,
    DATABASE: database(environment)
}