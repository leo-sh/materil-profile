'use strict';

app.service('AuthService', ['$http', '$q', 'UserPersistenceService', 'deviceDetector', 'detectUtils', 'OS_TYPE', 'HTTP_CODES', 'API_TYPE', 'envService',
    function ($http, $q, UserPersistenceService, deviceDetector, detectUtils, OS_TYPE, HTTP_CODES, API_TYPE, envService) {

        var API_URL = envService.read('API_URL');

        var LOCAL_TOKEN_KEY = 'yourTokenKey';
        var isAuthenticated = false;
        var authToken;

        loadUserCredentials();

        return {
            login: function (user) {
                // give user object the device type
                user.os_type = checkDeviceType();

                var defer = $q.defer();
                $http.post(API_URL + API_TYPE._TOKEN_.GET_TOKEN, user)
                    .then(function (response) {
                        // set cookies for user
                        if (response.data.result.statusCode == HTTP_CODES.SUCCESS.OK) {
                            storeUserCredentials(response.data.result.data.token);
                        }
                        defer.resolve(response.data.result);
                    }, function (response) {
                        //user = false;
                        reject.resolve(response.data.result);
                    });
                return defer.promise;
            },
            register: function (user) {

                var defer = $q.defer();
                $http.post(API_URL + API_TYPE._MEMBERSHIP_.SIGN_UP, user)
                    .then(function (response) {
                        defer.resolve(response.data.result[0]);
                    }, function (response) {
                        reject(response.data.result[0]);
                    });
                return defer.promise;
            },
            logout: function () {
                destroyUserCredentials();
            },
            isAuthenticated: function () {
                return isAuthenticated;
            }
        };

        function checkDeviceType() {

            if (detectUtils.isAndroid()) {
                return OS_TYPE.ANDROID;
            } else if (detectUtils.isIOS()) {
                return OS_TYPE.IOS;
            } else if (detectUtils.isMobile() || deviceDetector.isDesktop()) {
                return OS_TYPE.WEB_BROWSER;
            }
            return OS_TYPE.UNKNOWN;
        }
    }])


app.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
    return {
        responseError: function (response) {
            $rootScope.$broadcast({
                401: AUTH_EVENTS.notAuthenticated,
            }[response.status], response);
            return $q.reject(response);
        }
    };
})

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});