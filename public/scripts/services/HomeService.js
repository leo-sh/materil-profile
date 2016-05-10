// persisting email as _user in the cookies for the user to identify in the sessions.
app.service('HomeService',
    ['$rootScope', '$http', '$q', 'API_TYPE', 'envService',
        function ($rootScope, $http, $q, API_TYPE, envService) {

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
                setFirstName: function (name) {

                    $rootScope.user.first_name = name;
                    this.setFullName(name, $rootScope.user.last_name);
                },
                setLastName: function (name) {

                    $rootScope.user.last_name = name;
                    this.setFullName($rootScope.user.first_name, name);
                },
                setNickName: function (name) {

                    $rootScope.user.nick_name = name;
                },
                setFullName: function (first_name, last_name) {

                    $rootScope.user.full_name = first_name + ' ' + last_name;
                },
                setEmail: function (email) {

                    $rootScope.user.primary_email = email;
                    $rootScope.user.email = email;
                },
                setSex: function (sex) {

                    $rootScope.user.sex = sex;
                },
                setCountryCode: function (country_code) {

                    $rootScope.user.country_code = country_code;
                },
                setContactNumber: function (contact_number) {

                    $rootScope.user.contact_number = contact_number;
                },
                setShowDob: function (show_dob) {

                    $rootScope.user.show_dob = show_dob;
                },
                setDateOfBirth: function (dob) {

                    $rootScope.user.dob = new Date(dob);
                },
                unSetUser: function () {

                    $rootScope.user = {};
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