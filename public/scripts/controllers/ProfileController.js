'use strict';

app.controller('ProfileController',
    ['$scope', '$state', '$stateParams', 'HTTP_CODES', 'AuthService', 'ProfileService', 'LabelsService',
        function ($scope, $state, $stateParams, HTTP_CODES, AuthService, ProfileService, LabelsService) {

            LabelsService.getLabels()
                .then(
                    function(response){
                        $scope.labels = response.data;
                    }
                )

            var limit = 10, offset = 0;
            $scope.activities = [];

            var count = 0;

            $scope.images = [1, 2, 3, 4, 5, 6, 7, 8];

            $scope.stop = false;

            $scope.loadMore = function() {

                var increment = 10;

                //ProfileService.getActivities(limit, offset)
                //    .then(
                //        function (response) {
                //            console.log(response.data);
                //            console.log(response.data.activities);
                //            var items = response.data.activities;
                //            offset = offset + increment;
                //            for(var i = 0; i < items.length; i++ ){
                //                //$scope.activities.push(items[i]);
                //
                //                count = count + 1;
                //            }
                //        }
                //    );
            };

            $scope.loadMore();

        }
    ]);