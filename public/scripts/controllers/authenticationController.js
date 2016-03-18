'use strict';

app.controller('authenticationController', ['$scope', 'authenticationService', '$state', '$stateParams', 'HTTP_CODES',
    function ($scope, authenticationService, $state, $stateParams, HTTP_CODES) {

        $scope.alerts = [];

        if ($stateParams.alertParam) {
            $scope.alerts.push({type: 'danger', msg: $stateParams.alertParam.statusText});
        }

        // function to run when signup button is clicked
        $scope.submitSignUp = function () {
            authenticationService.registration($scope.user)
                .then(function (response) {
                    if (response.statusCode == HTTP_CODES.CLIENT_ERROR.CONFLICT || response.statusCode == HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR) {

                        $scope.alerts.push({type: 'danger', msg: response.statusText});
                    } else if (response.statusCode == HTTP_CODES.SUCCESS.OK) {
                        $state.transitionTo('authentication.signin', {alertParam: response});
                    } else {
                        $scope.alerts.push({type: 'danger', msg: 'Something Went wrong!!'});
                    }
                })
        }

        // function to run when signup button is clicked
        $scope.submitSignIn = function () {

            authenticationService.login($scope.user)
                .then(function (response) {
                    if (response.statusCode == HTTP_CODES.CLIENT_ERROR.CONFLICT || response.statusCode == HTTP_CODES.CLIENT_ERROR.UNAUTHORISED ||
                        HTTP_CODES.SUCCESS.NON_AUTHORITATIVE_INFORMATION) {
                        $scope.alerts.push({type: 'danger', msg: response.statusText});
                    } else if (response.statusCode == HTTP_CODES.SUCCESS.OK) {
                        $state.transitionTo('page.home', {userParam: response});
                    } else {
                        $scope.alerts.push({type: 'danger', msg: 'something Went wrong!!'});
                    }
                })
        }

        // function to run when logout is clicked
        $scope.logOut = function () {
            authenticationService.logout()
                .then(function () {
                    $state.transitionTo('authentication.signin', {alertParam: {'statusText': 'Logged Out!!'}});
                })
        }
    }
]);