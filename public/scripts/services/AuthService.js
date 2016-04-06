'use strict';

app.service('AuthService', ['$http', '$q', 'UserPersistenceService', 'IdentifyDeviceTypeFactory', 'HTTP_CODES', 'API_TYPE', 'envService',
    function ($http, $q, UserPersistenceService, IdentifyDeviceTypeFactory, HTTP_CODES, API_TYPE, envService) {

        var API_URL = envService.read('API_URL');

        UserPersistenceService.loadUserCredentials();

        return {
            login: function (user) {

                // give user object the device type
                user.os_type = IdentifyDeviceTypeFactory.checkDeviceType();

                var defer = $q.defer();
                $http.post(API_URL + API_TYPE._MEMBERSHIP_.LOG_IN, user)
                    .then(
                        // success
                        function (response) {
                            // set cookies for user
                            if (response.data.result[0].statusCode == HTTP_CODES.SUCCESS.OK) {
                                UserPersistenceService.storeUserCredentials(response.data.result[0].data.token);
                            }
                            defer.resolve(response.data.result[0]);
                        },
                        // failed
                        function (response) {
                            //user = false;
                            reject.resolve(response.data.result);
                        }
                    );
                return defer.promise;
            },
            register: function (user) {

                var defer = $q.defer();
                $http.post(API_URL + API_TYPE._MEMBERSHIP_.SIGN_UP, user)
                    .then(
                        function (response) {
                            defer.resolve(response.data.result[0]);
                        },
                        function (response) {
                            reject(response.data.result[0]);
                        }
                    );
                return defer.promise;
            },
            logout: function () {
                UserPersistenceService.destroyUserCredentials();
            },
            isAuthenticated: function () {
                return UserPersistenceService.isAuthenticated();
            }
        };
    }]
)


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