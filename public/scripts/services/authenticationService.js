app.service('authenticationService', function ($http, $q) {
    return {
        'registration': function (user) {

            var defer = $q.defer();
            $http.post("http://localhost:8080/authentication/signup", user)
                .then(function (response) {
                    //First function handles success
                    console.log(response);
                    defer.resolve(response);
                }, function (response) {
                    //Second function handles error
                    console.log(response);
                    defer.resolve(response);
                });
            return defer.promise;
        },
        'login': function(user){

            var defer = $q.defer();
            $http.post("http://localhost:8080/authentication/login", user)
                .then(function (response) {
                    //First function handles success
                    console.log(response);
                    defer.resolve(response);
                }, function (response) {
                    //Second function handles error
                    console.log(response);
                    defer.resolve(response);
                });
            return defer.promise;
        }
    }
});