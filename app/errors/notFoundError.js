module.exports = function (err, req, res, next) {

    if (err.status !== 404) {
        return next();
    }

    res.send({ 'Not Found' : 'This route is not found' });
}