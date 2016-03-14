module.exports = function (err, req, res, next) {

    if (err.status !== 500) {
        return next();
    }

    res.send('500 Error');
}