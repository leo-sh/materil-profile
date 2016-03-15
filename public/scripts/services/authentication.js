'use strict';

app.service('authenticationService', function ($http, $q) {

    var user = null;

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
                .then(function (response, status) {
                    console.log(status);
                    user = true;
                    defer.resolve(response.data.result[0]);
                }, function (response) {
                    user = true;
                    defer.resolve(response.data.result[0]);
                });
            return defer.promise;
        },
        //-------------------------------check if user is logged in or not------------------------------
        'isLoggedIn': function () {

            if (user) {
                return true;
            } else {
                return false;
            }
        },
        'getUserStatus': function () {
            return user;
        },
        'logout': function () {

            var deferred = $q.defer();
            $http.get(serverAddress + '/authentication/logout')
                .success(function (data) {
                    user = false;
                    deferred.resolve();
                })
                .error(function (data) {
                    user = false;
                    deferred.reject();
                });

            // return promise object
            return deferred.promise;

        }

    }
});