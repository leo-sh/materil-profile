'use strict';

app.controller('HomeController', ['$rootScope', '$scope', 'HomeService', '$state', '$stateParams', 'HTTP_CODES',
    function ($rootScope, $scope, HomeService, $state, $stateParams, HTTP_CODES) {

        HomeService.getUserInfo()
            .then(function (response) {
                $rootScope.user = HomeService.userUtility(response);
            });
    }
]);