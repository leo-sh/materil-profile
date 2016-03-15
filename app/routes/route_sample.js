module.exports = function (app) {

    app.get('/sample', function (req, res, next) {

        var flash = {
            'status': 'failed',
            'statusCode': 401,
            'statusText': 'Some Error Occurred.'
        }

        res.json({'result': flash});

    });

}