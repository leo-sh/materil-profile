'use strict';

app.controller('HomeController', ['$scope', 'HomeService', '$state', '$stateParams', 'HTTP_CODES',
    function ($scope, HomeService, $state, $stateParams, HTTP_CODES) {

        var user = {};

        HomeService.getUserInfo()
            .then(function (response) {

                user.full_name = response.first_name + ' ' + response.last_name;
                user.email = response.primary_email;

            });

        $scope.user = user;
    }
]);