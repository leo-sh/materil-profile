var CONSTANTS = require('./constants');

module.exports = {

    checkIfTestEmail: function (email) {
        var parted = email.split('@');
        var test = parted[1].split('.');
        if (test[0] == CONSTANTS.USER_TYPE.TEST_USER) {
            return true;
        }

        return false;
    }
}