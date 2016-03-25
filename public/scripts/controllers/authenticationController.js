'use strict';

app.controller('authenticationController', ['$scope', 'authenticationService', '$state', '$stateParams', 'HTTP_CODES',
    function ($scope, authenticationService, $state, $stateParams, HTTP_CODES) {

        $scope.alerts = [];

        if ($stateParams.alertParam) {
            $scope.alerts.push({type: 'danger', msg: $stateParams.alertParam.statusText});
        }

        $scope.closeAlert = function (index) {
            console.log(index);
            $scope.alerts.splice(index, 1);
        };

        function closeEarlierAlert() {
            $scope.alerts.splice(0, 1);
        }

        // function to run when signup button is clicked
        $scope.submitSignUp = function () {
            authenticationService.registration($scope.user)
                .then(function (response) {
                    closeEarlierAlert();
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
                    closeEarlierAlert();
                    if (response.statusCode == HTTP_CODES.CLIENT_ERROR.CONFLICT || response.statusCode == HTTP_CODES.CLIENT_ERROR.UNAUTHORISED ||
                        response.statusCode == HTTP_CODES.SUCCESS.NON_AUTHORITATIVE_INFORMATION) {
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
                    closeEarlierAlert();
                    $state.transitionTo('authentication.signin', {alertParam: {'statusText': 'Logged Out!!'}});
                })
        }

        // check email is valid or not
        $scope.forgotPassword = function () {
            authenticationService.forgotPassword($scope.email)
                .then(function (response) {
                    closeEarlierAlert();
                    if (response.statusCode == HTTP_CODES.CLIENT_ERROR.BAD_REQUEST || response.statusCode == HTTP_CODES.CLIENT_ERROR.NOT_ACCEPTABLE ||
                        response.statusCode == HTTP_CODES.SUCCESS.NON_AUTHORITATIVE_INFORMATION || response.statusCode == HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR) {

                        $scope.alerts.push({type: 'danger', msg: response.statusText});
                    } else if (response.statusCode == HTTP_CODES.SUCCESS.OK) {
                        $state.transitionTo('authentication.signin', {alertParam: response});
                    } else {
                        $scope.alerts.push({type: 'danger', msg: 'something Went wrong!!'});
                    }
                })
        }

        // change password
        $scope.changePassword = function () {
            var new_password = $scope.user.new_password;
            var confirm_password = $scope.user.confirm_password;

            if (new_password == confirm_password) {

                authenticationService.forgotPasswords($scope.email)
                    .then(function (response) {
                        closeEarlierAlert();
                        if (response.statusCode == HTTP_CODES.CLIENT_ERROR.NOT_ACCEPTABLE) {
                            console.log(response);
                        } else if (response.statusCode == HTTP_CODES.CLIENT_ERROR.CONFLICT || response.statusCode == HTTP_CODES.CLIENT_ERROR.BAD_REQUEST ||
                            response.statusCode == HTTP_CODES.SUCCESS.NON_AUTHORITATIVE_INFORMATION) {

                            $scope.alerts.push({type: 'danger', msg: response.statusText});
                        } else if (response.statusCode == HTTP_CODES.SUCCESS.OK) {
                            $state.transitionTo('page.home', {userParam: response});
                        } else {
                            $scope.alerts.push({type: 'danger', msg: 'something Went wrong!!'});
                        }
                    })
            }
            $scope.alerts.push({type: 'danger', msg: 'Passwords are not same.!!'});
        }
    }
]);