'use strict';

app.controller('authenticationController', ['$scope', 'authenticationService', '$state', '$stateParams',
    function ($scope, authenticationService, $state, $stateParams) {

        $scope.alerts = [];

        if ($stateParams.alertParam) {
            $scope.alerts.push({type: 'danger', msg: $stateParams.alertParam.statusText});
        }

        // function to run when signup button is clicked
        $scope.submitSignUp = function () {

            authenticationService.login($scope.user)
                .then(function (response) {
                    if (response.statusCode == 409 || response.statusCode == 401) {
                        $scope.alerts.push({type: 'danger', msg: response.statusText});
                    } else if (response.statusCode == 200) {
                        $state.transitionTo('authentication.signin', {alertParam: response});
                    } else {
                        $scope.alerts.push({type: 'danger', msg: 'something Went wrong!!'});
                    }
                })
        }

        // function to run when signup button is clicked
        $scope.submitSignIn = function () {

            authenticationService.login($scope.user)
                .then(function (response) {
                    if (response.statusCode == 409 || response.statusCode == 401) {
                        $scope.alerts.push({type: 'danger', msg: response.statusText});
                    } else if (response.statusCode == 200) {
                        $state.transitionTo('page.home', {userParam: response});
                    } else {
                        $scope.alerts.push({type: 'danger', msg: 'something Went wrong!!'});
                    }
                })
        }
    }
]);