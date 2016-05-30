app.controller('ImageCropController',
    ['$scope', 'showToastService', 'SettingsService', 'Upload', 'showToastService', 'HomeService', 'HTTP_CODES',
        function ($scope, showToastService, SettingsService, Upload, showToastService, HomeService, HTTP_CODES) {
            $scope.myImage = '';
            $scope.myCroppedImage = '';
            $scope.cropType = "circle";
            $scope.uploadPic = false;

            var handleFileSelect = function (evt) {
                var file = evt.currentTarget.files[0];

                var file = evt.currentTarget.files[0];

                if (!validateFile(file.name)) {
                    showToastService.showSimpleToast('Invalid Image File (JPG or PNG only)');
                    return;
                }
                $scope.uploadPic = true;
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function ($scope) {
                        $scope.myImage = evt.target.result;
                    });
                };
                reader.readAsDataURL(file);
            };
            angular.element(document.querySelector('#profilePic')).on('change', handleFileSelect);

            $scope.clear = function () {
                angular.element(document.querySelector('#profilePic')).val(null);
                $scope.myImage = '';
                $scope.uploadPic = false;
            };

            $scope.uploadPicture = function (myForm) {
                SettingsService.postProfilePic(myForm.profilePic)
                    .then(function (response) {
                        console.log(response);
                        if (response.statusCode == HTTP_CODES.SUCCESS.OK) {

                            showToastService.showSimpleToast(response.statusText);
                            HomeService.setProfilePic(response.data.profile_pic, response.data._user_access_id);
                            $scope.clear();
                        } else {
                            showToastService.showSimpleToast(response.statusText);
                        }

                    }, function (response) {
                        showToastService.showSimpleToast(response.statusText);
                    })
            }
        }]
)
var validateFile = function (value) {
    var validFormats = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'];
    var ext = value.substr(value.lastIndexOf('.') + 1);
    if (ext == '')
        return false;
    if (validFormats.indexOf(ext) == -1) {
        return false;
    }
    return true;
}