'use strict';

app.controller('authentication', ['$scope', 'authenticationService', '$state',
    function ($scope, authenticationService, $state) {

        $scope.submitSignUp = function () {

            console.log($scope.user);
            var done = authenticationService.registration($scope.user)

            console.log(done.data);

            if(done.statusText = "OK"){

                $state.transitionTo('authentication.signin');

            }
        }
        $scope.alerts = [ ];

        $scope.alerts.push({type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.'});

    }
]);