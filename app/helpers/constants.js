var define = require("node-constants")(exports);

// User Type
define('TOKEN', {
    EXPIRATION_TIME_IN_MINUTES: 60,
})// User Type
define('USER_TYPE', {
    TEST_USER: 'test',
})
// OS types for user devices
define('OS_TYPE', {
    WEB_BROWSER: 1,
    ANDROID: 2,
    IOS: 3,
    UNKNOWN: 9,
})
// Status Types
define('RESPONSE_TYPE', {
    _VALID_: {
        SUCCESS: 'success',
        INVALID: 'invalid',
        FAILED: 'failed',
    },
    _INVALID_: {
        VALIDATION_ERROR: 'validation_error',
        ERROR: 'error'
    }
})
// Http Codes
define('HTTP_CODES', {
    SUCCESS: {
        OK: 200,
        NON_AUTHORITATIVE_INFORMATION: 203,
        NO_CONSENT: 204,
        ALREADY_REPORTED: 208
    },
    CLIENT_ERROR: {
        BAD_REQUEST: 400,
        UNAUTHORISED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        NOT_ACCEPTABLE: 406,
        CONFLICT: 409,
    },
    SERVER_ERROR: {
        INTERNAL_SERVER_ERROR: 500
    }
});