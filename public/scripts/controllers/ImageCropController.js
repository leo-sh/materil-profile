app.controller('ImageCropController',
    ['$scope', 'showToastService', 'SettingsService',
        function ($scope, showToastService, SettingsService) {
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

            $scope.uploadPicture = function (profilePic) {
                console.log(profilePic);
                SettingsService.postProfilePic(profilePic)
                    .success(function (uploadResponse) {
                        // Handle response from server
                        console.log(uploadResponse);
                    }).error(function (error) {
                    // Handle error from server
                    console.log(error);
                });
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