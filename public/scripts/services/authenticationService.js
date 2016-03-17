'use strict';

app.service('authenticationService', ['$http', '$q', 'SERVER', 'userPersistenceService', 'deviceDetector', 'detectUtils', 'OS_TYPE', 'HTTP_CODES', 'API_TYPE',
    function ($http, $q, SERVER, userPersistenceService, deviceDetector, detectUtils, OS_TYPE, HTTP_CODES, API_TYPE) {

        var _user = null;

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

        return {
            //----------------------- for registration of users -------------------------------------
            'registration': function (user) {

                var defer = $q.defer();
                $http.post(SERVER.URL + API_TYPE._MEMBERSHIP_.SIGN_UP, user)
                    .then(function (response) {
                        defer.resolve(response.data.result[0]);
                    }, function (response) {
                        defer.resolve(response.data.result[0]);
                    });
                return defer.promise;
            },
            //---------------------------------for login of users ------------------------------------------------
            'login': function (user) {

                // give user object the device type
                user.os_type = checkDeviceType();

                var defer = $q.defer();
                $http.post(SERVER.URL + API_TYPE._MEMBERSHIP_.LOG_IN, user)
                    .then(function (response) {
                        // set cookies for user
                        if (response.data.result[0].statusCode == HTTP_CODES.SUCCESS.OK) {
                            _user = response.data.result[0].data.email;
                            userPersistenceService.setCookieData(_user);
                        }
                        defer.resolve(response.data.result[0]);
                    }, function (response) {
                        //user = false;
                        userPersistenceService.clearCookieData();
                        defer.resolve(response.data.result[0]);
                    });
                return defer.promise;
            },
            //-------------------------------check if user is logged in or not------------------------------
            'isLoggedIn': function () {

                var isLoggedIn = userPersistenceService.getCookieData();
                if (isLoggedIn) {
                    return true;
                } else {
                    return false;
                }
            },
            // ----------------------------------get current user status--------------------------------------------
            'getUserStatus': function () {
                $http.get(SERVER.URL + API_TYPE._MEMBERSHIP_.USER_STATUS)
                    // handle success
                    .success(function (data) {
                        if (data.status) {
                            userPersistenceService.setCookieData(_user);
                        } else {
                            //user = false;
                            userPersistenceService.clearCookieData();
                        }
                    })
                    // handle error
                    .error(function (data) {
                        //user = false;
                        userPersistenceService.clearCookieData();
                    });
            },
            //-------------------------------------logout the user--------------------------------------------------------
            'logout': function () {

                var deferred = $q.defer();
                $http.get(SERVER.URL + API_TYPE._MEMBERSHIP_.LOG_OUT)
                    .success(function (data) {
                        //user = false;
                        userPersistenceService.clearCookieData();
                        deferred.resolve();
                    })
                    .error(function (data) {
                        //user = false;
                        userPersistenceService.clearCookieData();
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;
            }
        }
    }]);