'use strict';

app.controller('ProfileController',
    ['$rootScope', '$scope', '$state', '$stateParams', 'HTTP_CODES', 'AuthService', 'ProfileService', 'LabelsService', 'ProfileFactory',
        function ($rootScope, $scope, $state, $stateParams, HTTP_CODES, AuthService, ProfileService, LabelsService, ProfileFactory) {

            LabelsService.getLabels()
                .then(
                    function(response){
                        $scope.labels = response.data;
                    }
                )

            $scope.reddit = new ProfileFactory();
        }
    ]);