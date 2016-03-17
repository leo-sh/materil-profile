angular.module('app')
    .constant('SERVER', {
        'URL': 'http://localhost:8080'
    })
    .constant('API_TYPE', {
        '_MEMBERSHIP_': {
            'SIGN_UP': '/authentication/signup',
            'LOG_IN': '/authentication/login',
            'LOG_OUT': '/authentication/logout',
            'USER_STATUS': '/authentication/user/status',
        }
    })
    .constant('OS_TYPE', {
        'WEB_BROWSER': 1,
        'ANDROID': 2,
        'IOS': 3,
        'UNKNOWN': 2,
    })
    .constant('HTTP_CODES', {
        'SUCCESS': {
            'OK': 200,
            'NO_CONSENT': 204
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
    })
;
