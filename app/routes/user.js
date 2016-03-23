var userDetailsController = require('./../controllers/userDetailsController');

module.exports = function (route) {

    route.get('/user', userDetailsController.getUser);
}