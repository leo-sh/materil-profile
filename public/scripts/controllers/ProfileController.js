'use strict';

app.controller('ProfileController',
    ['$scope', '$state', '$stateParams', 'HTTP_CODES', 'AuthService', 'ProfileService', '$filter', '$mdDialog',
        function ($scope, $state, $stateParams, HTTP_CODES, AuthService, ProfileService, $filter, $mdDialog) {

            AuthService.getMemberInfo()
                .then(
                    function (response) {
                        $scope.member_info = response.data;
                    }
                );

            ProfileService.getActivities()
                .then(
                    function (response) {
                        console.log(response);
                        $scope.activities = response.data.activities;
                    }
                );

        }
    ]);