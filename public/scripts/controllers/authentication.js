'use strict';

app.controller('authentication', ['$scope', 'authenticationService',
    function ($scope, authenticationService) {


        $scope.submitSignUp = function () {

            authenticationService.registration($scope.user)
            console.log($scope.user);
        }
    }
]);