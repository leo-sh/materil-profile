'use strict';

app.controller('ProfileController',
    ['$scope', '$state', '$stateParams', 'HTTP_CODES', 'AuthService', 'ProfileService', 'LabelsService', 'ContactsService',
        function ($scope, $state, $stateParams, HTTP_CODES, AuthService, ProfileService, LabelsService, ContactsService) {

            AuthService.getMemberInfo()
                .then(
                    function (response) {
                        $scope.member_info = response.data;
                    }
                );

            LabelsService.getLabels()
                .then(
                    function(response){
                        $scope.labels = response.data;
                    }
                )

            ContactsService.getContactNumbers()
                .then(
                    function(response){

                        $scope.phone_numbers = response.data.phone_numbers;
                    }
                )

            var limit = 10, offset = 0;
            $scope.activities = [];

            var count = 0;

            $scope.images = [1, 2, 3, 4, 5, 6, 7, 8];

            $scope.stop = false;

            $scope.loadMore = function() {

                var increment = 10;

                ProfileService.getActivities(limit, offset)
                    .then(
                        function (response) {
                            console.log(response.data);
                            console.log(response.data.activities);
                            var items = response.data.activities;
                            offset = offset + increment;
                            for(var i = 0; i < items.length; i++ ){
                                $scope.activities.push(items[i]);

                                count = count + 1;
                            }
                        }
                    );
            };

            $scope.loadMore();

        }
    ]);