'use strict';

app.controller('HomeController', ['$scope', 'HomeService', '$state', '$stateParams', 'HTTP_CODES',
    function ($scope, HomeService, $state, $stateParams, HTTP_CODES) {

        var user = {};

        HomeService.getUserInfo()
            .then(function (response) {
                var member_details_info = response.member_details_info;
                var member_access_info = response.member_access_info;

                user.full_name = member_details_info.first_name + ' ' + member_details_info.last_name;
                user.email = member_access_info.email;

            });

        $scope.user = user;

    }
]);