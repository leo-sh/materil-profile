var userDetails = require('./../models/user_details');
var UserAccess = require('./../models/user_access');
// loading user constants
var CONSTANTS = require('./../helpers/constants');
var ResultResponses = require('./../helpers/resultResponses');


module.exports = {

    getUser: function (req, res) {

        var result = UserAccess.findOne({'email': 'sumit@text.xx'});
        console.log(result);

        res.json({'hello': result})
    }
}