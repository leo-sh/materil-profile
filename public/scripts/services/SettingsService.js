// persisting email as _user in the cookies for the user to identify in the sessions.
app.service('SettingsService',
    ['$http', 'HTTP_CODES', 'API_TYPE', 'GetURLFactory', '$q',
        function ($http, HTTP_CODES, API_TYPE, GetURLFactory, $q) {

            return {
                postProfilePic: function (profilePic) {

                    console.log(profilePic);

                    var defer = $q.defer(), reject = $q.reject();
                    $http.post(GetURLFactory.getURL() + API_TYPE._AUTHENTICATION_.CHANGE_PROFILE_PIC)
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
                deleteUser: function () {

                    var defer = $q.defer(), reject = $q.reject();
                    $http.delete(GetURLFactory.getURL() + API_TYPE._AUTHENTICATION_.MEMBER_INFO)
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
                changePassword: function (user) {

                    var defer = $q.defer(), reject = $q.reject();
                    $http.post(GetURLFactory.getURL() + API_TYPE._AUTHENTICATION_.CHANGE_PASSWORD, user)
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
                changeContactNumber: function (user) {

                    var defer = $q.defer(), reject = $q.reject();
                    $http.patch(GetURLFactory.getURL() + API_TYPE._AUTHENTICATION_.CHANGE_CONTACT_NUMBER, user)
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
                changeEmailAddress: function (user) {

                    var defer = $q.defer(), reject = $q.reject();
                    $http.patch(GetURLFactory.getURL() + API_TYPE._AUTHENTICATION_.CHANGE_EMAIL_ADDRESS, user)
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
                changeMemberInfo: function (user) {

                    var defer = $q.defer(), reject = $q.reject();
                    $http.put(GetURLFactory.getURL() + API_TYPE._AUTHENTICATION_.MEMBER_INFO, user)
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