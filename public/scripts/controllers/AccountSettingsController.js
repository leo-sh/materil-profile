'use strict';

app.controller('AccountSettingsController',
    ['$rootScope', '$scope', '$state', '$stateParams', 'HTTP_CODES', 'envService', 'SettingsService', '$filter', '$mdDialog', '$mdMedia', 'showToastService',
        function ($rootScope, $scope, $state, $stateParams, HTTP_CODES, envService, SettingsService, $filter, $mdDialog, $mdMedia, showToastService) {

            $scope.setNewContactNumber = function (ev) {

                $mdDialog.show({
                        controller: changeContactNumber,
                        templateUrl: 'views/pages/partials/settings/change_contact_number.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                    })
                    .then(function (user) {

                        SettingsService.changeContactNumber(user)
                            .then(function (response) {

                                if (response.statusCode == HTTP_CODES.SUCCESS.OK) {

                                    $rootScope.user.contact_number = response.data.contact_number;
                                    $rootScope.user.country_code = response.data.country_code;
                                    showToastService.showSimpleToast(response.statusText);
                                } else {
                                    showToastService.showSimpleToast(response.statusText);
                                }

                            }, function (response) {
                                showToastService.showSimpleToast(response.statusText);
                            })
                    });
            };

            $scope.setNewPrimaryEmail = function (ev) {

                $mdDialog.show({
                        controller: changePrimaryEmail,
                        templateUrl: 'views/pages/partials/settings/change_primary_email.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                    })
                    .then(function (user) {

                        SettingsService.changeEmailAddress(user)
                            .then(function (response) {

                                if (response.statusCode == HTTP_CODES.SUCCESS.OK) {

                                    $rootScope.user.primary_email = response.data.email;
                                    $rootScope.user.email = response.data.email;
                                    showToastService.showSimpleToast(response.statusText);
                                } else {
                                    showToastService.showSimpleToast(response.statusText);
                                }

                            }, function (response) {
                                showToastService.showSimpleToast(response.statusText);
                            })
                    });
            };

            $scope.setNewPassword = function (ev) {

                $mdDialog.show({
                        controller: changePassword,
                        templateUrl: 'views/pages/partials/settings/change_password.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                    })
                    .then(function () {
                        showToastService.showSimpleToast('Your Password is changed!!');
                    });
            };

            $scope.showConfirmDelete = function (ev) {
                // Appending dialog to document.body to cover sidenav in docs app
                var confirm = $mdDialog.confirm()
                    .title('Confirm Account Deletion')
                    .textContent('Would you like to delete your Account??')
                    .ariaLabel('Bad Day')
                    .targetEvent(ev)
                    .ok('Yes!!')
                    .cancel('Cancel!!');
                $mdDialog.show(confirm)
                    .then(function () {
                        console.log('You decided to get rid of your debt.');
                    });
            };
        }
    ]);

function changeContactNumber($scope, $mdDialog) {
    $scope.userState = '';
    $scope.states = ('IND ( + 91), JP ( + 81) ').split(',').map(function (state) {
        return {abbrev: state};
    });

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };
    $scope.changeNumber = function (user) {
        $mdDialog.hide(user);
    };

}

function changePrimaryEmail($scope, $mdDialog) {

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };
    $scope.changeEmail = function (user) {
        $mdDialog.hide(user);
    };

}

function changePassword($scope, $mdDialog) {

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };
    $scope.changeUserPassword = function (user) {
        $mdDialog.hide(user);
    };

}
