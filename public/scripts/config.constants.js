angular.module('app')

    .constant('AUTH_EVENTS', {
        notAuthenticated: 'auth-not-authenticated'
    })
    .constant('ACTIVITY_TYPES', {
        NO_ACTIVITY: 0,
        SIGN_UP_ACTIVITY: 1,
        DETAILS_UPDATING_ACTIVITY: 2,
    })
    .constant('LOCAL_STORAGE', {
        _TOKEN_KEY_: 'user_id'
    })
    .constant('API_TYPE', {
        _TOKEN_: {
            GET_TOKEN: '/api/x/token'
        },
        _AUTHENTICATION_: {
            MEMBER_INFO: '/api/authentication/member_info',
            GET_ALL_LABELS: '/api/authentication/labels',
            CHANGE_PASSWORD: '/api/authentication/change/password',
            CHANGE_CONTACT_NUMBER: '/api/authentication/numbers',
            CHANGE_EMAIL_ADDRESS: '/api/authentication/emails',
            CHANGE_PROFILE_PIC: '/api/authentication/profile/pic',
        },
        _MEMBERSHIP_: {
            SIGN_UP: '/api/membership/signup',
            LOG_IN: '/api/membership/login',
            LOG_OUT: '/authentication/logout',
            USER_STATUS: '/authentication/user/status',
            USER_ACTIVATION: '/authentication/activate/',
            CHECK_IF_USER_EXISTS: '/authentication/user/',
            RESET_PASSWORD: '/authentication/reset/',
            CHANGE_PASSWORD: '/authentication/change/password',
        },
        _ACTIVITIES_: {
            FETCH: '/api/authentication/activities',
        },
        _LABELS_: {
            FETCH: '/api/authentication/labels',
        },
        _NOTIFICATIONS_: {
            FETCH: '/api/authentication/notifications',
        },
        _CONTACTS_: {
            PHONE_NUMBERS: '/api/authentication/numbers',
        }
    })
    .constant('RESULT_RESPONSE_TYPE', {
        SUCCESS: 'success',
        INVALID: 'invalid',
        FAILED: 'failed',
    })
    .constant('OS_TYPE', {
        WEB_BROWSER: 1,
        ANDROID: 2,
        IOS: 3,
        UNKNOWN: 9,
    })
    .constant('HTTP_CODES', {
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
    })
;
