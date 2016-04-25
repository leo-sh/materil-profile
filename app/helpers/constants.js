var define = require("node-constants")(exports);

// User Type
define('TOKEN', {
    EXPIRATION_TIME_IN_MINUTES: 3600,
})
// User Type
define('USER_TYPE', {
    TEST_USER: 'test',
})
// User Sex
define('USER_SEX', {
    SEX_MALE: 1,
    SEX_FEMALE: 0,
    MALE: 'Male',
    FEMALE: 'Female',
})
// User Show Value To Others
define('USER_SHOW_OTHERS', {
    SHOW_TO_OTHERS: 1,
    DONT_SHOW_TO_OTHERS: 0
})
// Notifications
define('NOTIFICATIONS', {
    NOTIFICATION_YES: 1,
    NOTIFICATION_NO: 0
})
// Activity Types
define('ACTIVITY_TYPES', {
    SIGN_UP_ACTIVITY: 1,
    DETAILS_UPDATING_ACTIVITY: 2,
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