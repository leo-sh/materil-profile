var define = require("node-constants")(exports);
// define is a function that binds "constants" to an object (commonly exports)

define("PI", 3.14);
// OS types for user devices
define('OS_TYPE', {
    'WEB_BROWSER': 1,
    'ANDROID': 2,
    'IOS': 3,
    'UNKNOWN': 9,
})
// Status Types
define('STATUS_TYPE', {
    'SUCCESS': 'success',
    'INVALID': 'invalid',
    'FAILED': 'failed',
})
// Http Codes
define('HTTP_CODES', {
    'SUCCESS': {
        'OK': 200,
        'NON_AUTHORITATIVE_INFORMATION': 203,
        'NO_CONSENT': 204,
        'ALREADY_REPORTED': 208
    },
    'CLIENT_ERROR': {
        'BAD_REQUEST': 400,
        'UNAUTHORISED': 401,
        'FORBIDDEN': 403,
        'NOT_FOUND': 404,
        'CONFLICT': 409,
    },
    'SERVER_ERROR': {
        'INTERNAL_SERVER_ERROR': 500
    }
});