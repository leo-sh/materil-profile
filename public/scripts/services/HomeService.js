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
                },
                userUtility: function (response) {

                    var user = {};

                    user.full_name = response.first_name + ' ' + response.last_name;
                    user.primary_email = response.primary_email;
                    user.email = response.primary_email;
                    user.first_name = response.first_name;
                    user.last_name = response.last_name;
                    user.nick_name = response.nick_name;
                    user.sex = response.sex;
                    user.country_code = response.country_code;
                    user.contact_number = response.contact_number;
                    user.show_dob = response.show_dob;
                    user.dob = new Date(response.dob);

                    return user;
                }
            }
        }
    ]
)