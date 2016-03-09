module.exports = function(app){

    var sampleAPi = require('./../api/sample_api');

    app.get('/sample/:id/:name', sampleAPi.sample_get);

}