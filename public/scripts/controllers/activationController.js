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