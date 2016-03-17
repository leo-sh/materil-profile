'use strict';

app.service('authenticationService', ['$http', '$q', 'SERVER', 'userPersistenceService',
    function ($http, $q, SERVER, userPersistenceService) {

        var _user = null;

        return {
            //----------------------- for registration of users -------------------------------------
            'registration': function (user) {

                var defer = $q.defer();
                $http.post(serverAddress + "/authentication/signup", user)
                    .then(function (response) {
                        defer.resolve(response.data.result[0]);
                    }, function (response) {
                        defer.resolve(response.data.result[0]);
                    });
                return defer.promise;
            },
            //---------------------------------for login of users ------------------------------------------------
            'login': function (user) {

                var defer = $q.defer();
                $http.post(serverAddress + "/authentication/login", user)
                    .then(function (response) {
                        // set cookies for user
                        if (response.data.result[0].statusCode == 200) {
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
                $http.get(serverAddress + '/authentication/user/status')
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
                $http.get(serverAddress + "/authentication/logout")
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