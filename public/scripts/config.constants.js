angular.module('app')
    .constant('SERVER', {
        'URL': 'http://localhost:8080'
    })
    .constant('API_TYPE', {
        _MEMBERSHIP_: {
            SIGN_UP: '/authentication/signup',
            LOG_IN: '/authentication/login',
            LOG_OUT: '/authentication/logout',
            USER_STATUS: '/authentication/user/status',
            USER_ACTIVATION: '/authentication/activate/',
            CHECK_IF_USER_EXISTS: '/authentication/user/',
            RESET_PASSWORD: '/authentication/reset/',
            CHANGE_PASSWORD: '/authentication/change/password',
        }
    })
    .constant('RESULT_RESPONSE_TYPE', {
        'SUCCESS': 'success',
        'INVALID': 'invalid',
        'FAILED': 'failed',
    })
    .constant('OS_TYPE', {
        'WEB_BROWSER': 1,
        'ANDROID': 2,
        'IOS': 3,
        'UNKNOWN': 9,
    })
    .constant('HTTP_CODES', {
        'SUCCESS': {
            'OK': 200,
            'NON_AUTHORITATIVE_INFORMATION': 203,
            'NO_CONSENT': 204,
            'ALREADY_REPORTED': 208
        },
        'CLIENT_ERROR': {
            BAD_REQUEST: 400,
            UNAUTHORISED: 401,
            FORBIDDEN: 403,
            NOT_FOUND: 404,
            NOT_ACCEPTABLE: 406,
            CONFLICT: 409,
        },
        'SERVER_ERROR': {
            'INTERNAL_SERVER_ERROR': 500
        }
    })
;
