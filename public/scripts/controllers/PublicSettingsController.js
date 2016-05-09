'use strict';

app.controller('PublicSettingsController',
    ['$rootScope', '$scope', '$state', '$stateParams', 'HTTP_CODES', 'envService', 'SettingsService', '$filter', 'HomeService',
        function ($rootScope, $scope, $state, $stateParams, HTTP_CODES, envService, SettingsService, $filter, HomeService) {

            $scope.changeMemberInfo = function (user) {

                SettingsService.changeMemberInfo(user)
                    .then(function (response) {

                        HomeService.setFirstName(response.data.first_name);
                        HomeService.setLastName(response.data.last_name);
                        HomeService.setNickName(response.data.nick_name);
                        HomeService.setSex(response.data.sex);
                        HomeService.setDateOfBirth(response.data.dob);
                        //$rootScope.user = HomeService.userUtility(response.data);
                    }, function (response) {

                        console.log(response);
                        console.log('Problem here-PublicSettingsController');
                    });
            }
        }
    ]);