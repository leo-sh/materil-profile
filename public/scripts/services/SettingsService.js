// persisting email as _user in the cookies for the user to identify in the sessions.
app.service('SettingsService',
    ['$http', 'HTTP_CODES', 'API_TYPE', 'envService', '$q',
        function ($http, HTTP_CODES, API_TYPE, envService, $q) {

            var API_URL = envService.read('API_URL');

            return {
                getAllLabels: function () {

                    var defer = $q.defer(), reject = $q.reject();
                    $http.get(API_URL + API_TYPE._AUTHENTICATION_.GET_ALL_LABELS)
                        .then(
                            // success
                            function (response) {
                                defer.resolve(response.data.result);
                            },
                            // failed
                            function (response) {
                                //user = false;
                                reject.resolve(response.data.result);
                            }
                        );
                    return defer.promise;
                }
            }
        }
    ]
)