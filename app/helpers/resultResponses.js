// loading user constants
var CONSTANTS = require('./../helpers/constants');

module.exports = {
    success: function (statusCode, statusText, data) {

        var result = {
            'status': CONSTANTS.RESPONSE_TYPE._VALID_.SUCCESS,
            'statusCode': statusCode,
            'data': data != null ? data : null,
            'statusText': statusText
        }
        return result;
    },
    invalid: function (statusCode, statusText, data) {

        var result = {
            'status': CONSTANTS.RESPONSE_TYPE._VALID_.INVALID,
            'statusCode': statusCode,
            'data': data != null ? data : null,
            'statusText': statusText
        }
        return result;
    },
    failed: function (statusCode, statusText, data) {

        var result = {
            'status': CONSTANTS.RESPONSE_TYPE._VALID_.FAILED,
            'statusCode': statusCode,
            'data': data != null ? data : null,
            'statusText': statusText
        }
        return result;
    },
    validationError: function (statusCode, statusText, data) {

        var result = {
            'status': CONSTANTS.RESPONSE_TYPE._INVALID_.VALIDATION_ERROR,
            'statusCode': statusCode,
            'data': data != null ? data : null,
            'statusText': statusText
        }
        return result;
    },
    error: function (statusCode, statusText, data) {

        var result = {
            'status': CONSTANTS.RESPONSE_TYPE._INVALID_.ERROR,
            'statusCode': statusCode,
            'data': data != null ? data : null,
            'statusText': statusText
        }
        return result;
    }
}
