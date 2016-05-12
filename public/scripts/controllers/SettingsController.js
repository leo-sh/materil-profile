'use strict';

app.controller('SettingsController', ['$scope', '$state', '$stateParams', 'HTTP_CODES', 'envService', 'HomeService', '$mdDialog',
    function ($scope, $state, $stateParams, HTTP_CODES, envService, HomeService, $mdDialog) {

        // get Member info
        HomeService.getUserInfo()
            .then(function (response) {
                $scope.member_info = response;
            })

        $scope.setProfilePic = function (ev) {

            $mdDialog.show({
                    controller: changeProfilePic,
                    templateUrl: 'views/pages/partials/settings/change_profile_pic.html',
                    targetEvent: ev,
                    clickOutsideToClose: true,
                })
                .then(function (user) {
                    console.log('Changed!!')
                }, function () {
                    console.log('Not Changed!!')
                });

        }
    }
]);

function changeProfilePic($scope, $mdDialog) {

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

    console.log('changeProfilePic');

    $scope.myImage='';
    $scope.myCroppedImage='';
    $scope.cropType="circle";

    var handleFileSelect=function(evt) {
        var file=evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function($scope){
                $scope.myImage=evt.target.result;
            });
        };
        reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

}
