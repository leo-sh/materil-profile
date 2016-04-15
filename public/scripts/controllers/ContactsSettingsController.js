'use strict';

app.controller('ContactsSettingsController',
    ['$scope', '$state', '$stateParams', 'HTTP_CODES', 'envService', 'SettingsService', '$filter',
        function ($scope, $state, $stateParams, HTTP_CODES, envService, SettingsService, $filter) {

            var phone_numbers = {
                _phone_numbers: [
                    {
                        _type_id: '570db97cfc93958c1887b168', number: '3467702134', _id: '570db97cfc93958c1887b168'
                    },
                    {
                        _type_id: '570db97cfc93958c1887b167', number: '12365478523', _id: '570db97cfc93958c3387b168'
                    },
                    {
                        _type_id: '570db97cfc93958c1887b168', number: '9842576314', _id: '570db97cfc93958c1887b138'
                    }
                ],
                getPhoneNumbers: function () {
                    return this._phone_numbers;
                },
                setPhoneNumbers: function (phone_number) {
                    this._phone_numbers.push(phone_number);
                }
            }

            $scope.phone_numbers = phone_numbers;

            SettingsService.getAllLabels()
                .then(
                    function (response) {
                        $scope.contact_lable_types = response.data;
                        var custom_label = {
                            _id: '999999999',
                            label_name: 'Custom'
                        };
                        $scope.contact_lable_types.push(custom_label);
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

                $scope.phone_numbers.setPhoneNumbers(phone_number);
                $scope.new_phone_number = [];
            }
        }
    ]);