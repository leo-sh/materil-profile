// persisting email as _user in the cookies for the user to identify in the sessions.
app.service('ProfileService',
    ['$http', '$q', 'API_TYPE', 'GetURLFactory',
        function ($http, $q, API_TYPE, GetURLFactory) {

            return {
                getActivities: function () {
                    var defer = $q.defer();

                    $http.get(GetURLFactory.getURL() + API_TYPE._ACTIVITIES_.FETCH)
                        .then(
                            // success
                            function (response) {
                                defer.resolve(response.data.result);
                            },
                            // failed
                            function (response) {
                                //user = false;
                                $q.reject(response.data.result);
                            }
                        );
                    return defer.promise;
                }
            }
        }
    ]
)