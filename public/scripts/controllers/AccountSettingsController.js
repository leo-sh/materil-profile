'use strict';

app.controller('AccountSettingsController',
    ['$scope', '$state', '$stateParams', 'HTTP_CODES', 'envService', 'SettingsService', '$filter', '$mdDialog', '$mdMedia', 'showToastService',
        function ($scope, $state, $stateParams, HTTP_CODES, envService, SettingsService, $filter, $mdDialog, $mdMedia, showToastService) {

            $scope.user.primary_email = 'Summmmit44@gmail.com';
            $scope.user.country_code = '81';
            $scope.user.contact_number = '87-6537-7003';

            $scope.setNewContactNumber = function (ev) {

                $mdDialog.show({
                        controller: changeContactNumber,
                        templateUrl: 'views/pages/partials/settings/change_contact_number.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                    })
                    .then(function (user) {
                        $scope.user.contact_number = user.new_contact_number;
                        ShowToast.showSimpleToast('Your Contact Number is changed!!');
                    }, function () {
                        //$scope.status = 'You cancelled the dialog.';
                        console.log('Sorry cant update your Number right now');
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
                        $scope.user.primary_email = user.new_primary_email;
                        showToastService.showSimpleToast('Primary Email is changed!!');
                    }, function () {
                        //$scope.status = 'You cancelled the dialog.';
                        console.log('Sorry cant update your email right now');
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
                    }, function () {
                        //$scope.status = 'You cancelled the dialog.';
                        console.log('Sorry cant update your Password right now');
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
                $mdDialog.show(confirm).then(function () {
                    console.log('You decided to get rid of your debt.');
                }, function () {
                    console.log('You decided to keep your debt.');
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
        console.log(user);
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
