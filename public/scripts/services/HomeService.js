// persisting email as _user in the cookies for the user to identify in the sessions.
app.service('HomeService',
    ['$http', '$q', 'API_TYPE', 'envService',
        function ($http, $q, API_TYPE, envService) {

            var API_URL = envService.read('API_URL');

            return {
                getUserInfo: function () {

                    var defer = $q.defer();

                    $http.get(API_URL + API_TYPE._AUTHENTICATION_.MEMBER_INFO)
                        .then(
                            // success
                            function (response) {

                                defer.resolve(response.data.result.data);
                            },
                            // failed
                            function (response) {
                                //user = false;
                                $q.reject(response.data.result.data);
                            }
                        );
                    return defer.promise;
                }
            }
        }
    ]
)