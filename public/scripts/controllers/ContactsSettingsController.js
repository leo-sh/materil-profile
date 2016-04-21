'use strict';

app.controller('ContactsSettingsController',
    ['$scope', '$state', '$stateParams', 'HTTP_CODES', 'envService', 'SettingsService', '$filter', '$mdDialog',
        function ($scope, $state, $stateParams, HTTP_CODES, envService, SettingsService, $filter, $mdDialog) {

            var phone_numbers = {
                _phone_numbers: [
                    {
                        _type_id: '5716ea2b423f3d4411dfc5d2', number: '3467702134', _id: '570db97cfc93958c1887b168'
                    }
                ],
                getPhoneNumbers: function () {
                    return this._phone_numbers;
                },
                setPhoneNumbers: function (phone_number) {
                    this._phone_numbers.push(phone_number);
                }
            }

            $scope.phone_numbers = phone_numbers.getPhoneNumbers();

            SettingsService.getAllLabels()
                .then(
                    function (response) {
                        console.log(response.data);
                        $scope.contact_lable_types = response.data;
                    }
                )

            $scope.DeletePhoneNumber = function (index, phone_number_id) {
                console.log(phone_number_id);
                var foundItem = $filter('filter')(phone_numbers, {_id: phone_number_id}, true)[0];
                //get the index
                var index = phone_numbers.indexOf(foundItem);

                $scope.phone_numbers.splice(index, 1);

            }

            $scope.AddPhoneNumber = function (new_phone_number) {

                console.log(new_phone_number);

                var phone_number = {
                    _type_id: new_phone_number.type._id,
                    number: new_phone_number.number,
                }

                phone_numbers.setPhoneNumbers(phone_number);
                $scope.new_phone_number = [];
            }

            $scope.createCustomLabel = function(ev) {

                $mdDialog.show({
                        controller: createLabelController,
                        templateUrl: 'views/pages/partials/settings/custom_label.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                    })
                    .then(function (label) {

                        $scope.contact_lable_types.push(label);
                    }, function () {
                        //$scope.status = 'You cancelled the dialog.';
                        console.log('You clicked cancel');
                    });
            };
        }
    ]);

function createLabelController($scope, $mdDialog) {

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };
    $scope.createLabel = function (user) {

        var label = {
            _id: "",
            label_name: user.new_label
        };
        $mdDialog.hide(label);
    };
}