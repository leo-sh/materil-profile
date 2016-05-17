'use strict';

app.controller('EpaperController',
    ['$rootScope', '$scope', '$state', '$stateParams', 'HTTP_CODES',
        function ($rootScope, $scope, $state, $stateParams, HTTP_CODES) {

            $scope.items = [1, 2, 3, 4, 5, 6, 7];
            $scope.selectedItem;
            $scope.getSelectedText = function() {
                if ($scope.selectedItem !== undefined) {
                    return "You have selected: Item " + $scope.selectedItem;
                } else {
                    return "Please select an item";
                }
            };
            $scope.avatarData = [{
                id: "mdi-device-signal-wifi-3-bar",
                title: 'avatar 1',
                value: 'avatar-1'
            },{
                id: "mdi-device-signal-wifi-3-bar",
                title: 'avatar 2',
                value: 'avatar-2'
            },{
                id: "mdi-device-signal-wifi-3-bar",
                title: 'avatar 3',
                value: 'avatar-3'
            }];

        }
    ]);