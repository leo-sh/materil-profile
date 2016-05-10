'use strict';

app.controller('PublicSettingsController',
    ['$rootScope', '$scope', '$state', '$stateParams', 'HTTP_CODES', 'envService', 'SettingsService', '$filter', 'HomeService', 'showToastService',
        function ($rootScope, $scope, $state, $stateParams, HTTP_CODES, envService, SettingsService, $filter, HomeService, showToastService) {

            $scope.changeMemberInfo = function (user) {

                SettingsService.changeMemberInfo(user)
                    .then(function (response) {

                        if (response.statusCode == HTTP_CODES.SUCCESS.OK) {

                            HomeService.setFirstName(response.data.first_name);
                            HomeService.setLastName(response.data.last_name);
                            HomeService.setNickName(response.data.nick_name);
                            HomeService.setSex(response.data.sex);
                            HomeService.setDateOfBirth(response.data.dob);

                            showToastService.showSimpleToast(response.statusText);
                        } else {
                            showToastService.showSimpleToast(response.statusText);
                        }
                    }, function (response) {
                        showToastService.showSimpleToast(response.statusText);
                    });
            }
        }
    ]);