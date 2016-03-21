'use strict';

app.controller('activationController', ['$scope', 'authenticationService', '$state', '$stateParams', 'HTTP_CODES',
    function ($scope, authenticationService, $state, $stateParams, HTTP_CODES) {

        $scope.alerts = [];

        if ($stateParams.alertParam) {
            $scope.alerts.push({type: 'danger', msg: $stateParams.alertParam.statusText});
        }

        authenticationService.userActivation($stateParams.user_id, $stateParams.activation_code)
            .then(function (response) {
                if (response.statusCode == HTTP_CODES.CLIENT_ERROR.BAD_REQUEST) {

                    $scope.alerts.push({type: 'danger', msg: response.statusText});
                } else if (response.statusCode == HTTP_CODES.SUCCESS.OK || response.statusCode == HTTP_CODES.SUCCESS.ALREADY_REPORTED) {
                    $state.transitionTo('authentication.signin', {alertParam: response});
                } else {
                    $scope.alerts.push({type: 'danger', msg: 'Something Went wrong!!'});
                }
            })
    }
]);
app.controller('resetPasswordController', ['$scope', 'authenticationService', '$state', '$stateParams', 'HTTP_CODES',
    function ($scope, authenticationService, $state, $stateParams, HTTP_CODES) {

        $scope.alerts = [];

        if ($stateParams.alertParam) {
            $scope.alerts.push({type: 'danger', msg: $stateParams.alertParam.statusText});
        }

        console.log($stateParams);

        authenticationService.resetPassword($stateParams.user_id, $stateParams.reset_code)
            .then(function (response) {
                if (response.statusCode == HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR ||
                    response.statusCode == HTTP_CODES.CLIENT_ERROR.BAD_REQUEST || response.statusCode == HTTP_CODES.CLIENT_ERROR.NOT_FOUND) {

                    $scope.alerts.push({type: 'danger', msg: response.statusText});
                } else if (response.statusCode == HTTP_CODES.SUCCESS.OK) {

                    $state.transitionTo('authentication.change-password', {alertParam: response});
                } else {

                    $scope.alerts.push({type: 'danger', msg: 'Something Went wrong!!'});
                }
            })
    }
]);