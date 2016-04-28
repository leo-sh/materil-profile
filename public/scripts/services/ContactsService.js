// persisting email as _user in the cookies for the user to identify in the sessions.
app.service('ContactsService',
    ['$http', '$q', 'API_TYPE', 'GetURLFactory',
        function ($http, $q, API_TYPE, GetURLFactory) {

            return {
                getContactNumbers: function (limit, offset) {
                    var defer = $q.defer();

                    $http.get(GetURLFactory.getURL() + API_TYPE._CONTACTS_.PHONE_NUMBERS,
                        {
                            params: {limit: limit, offset: offset}
                        })
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