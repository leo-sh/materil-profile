// persisting email as _user in the cookies for the user to identify in the sessions.
app.service('SettingsService',
    ['$http', 'HTTP_CODES', 'API_TYPE', 'GetURLFactory', '$q',
        function ($http, HTTP_CODES, API_TYPE, GetURLFactory, $q) {

            return {
                getNotifications: function () {

                    var defer = $q.defer(), reject = $q.reject();
                    $http.get(GetURLFactory.getURL() + API_TYPE._NOTIFICATIONS_.FETCH)
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
                },
                changeNotifications: function (notification) {

                    var defer = $q.defer(), reject = $q.reject();
                    $http.put(GetURLFactory.getURL() + API_TYPE._NOTIFICATIONS_.FETCH, notification)
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
                },
                getAllLabels: function () {

                    var defer = $q.defer(), reject = $q.reject();
                    $http.get(GetURLFactory.getURL() + API_TYPE._AUTHENTICATION_.GET_ALL_LABELS)
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