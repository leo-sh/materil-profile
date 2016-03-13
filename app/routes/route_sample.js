module.exports = function(app, boomError){

    var sampleAPi = require('./../api/sample_api');
    var throws = require('./../errors/notFoundError');

    app.get('/sample/:id/:name', sampleAPi.sample_get);
    app.get('/sample', function(req, res, next){

        var suit = true;

        if(suit){var error = new Error('Unexpected input');
            boomError.wrap(error, 400);
            res.send(error);
        }

    });

}