app.service('authenticationService', function ($http, $q) {
    return {
        'registration': function (user) {

            console.log(user);

            var defer = $q.defer();
            //$http.get('http://localhost:8080/authentication/signup')
            //    .success(function (resp) {
            //        console.log(resp);
            //        defer.resolve(resp);
            //    })
            //    .error(function (err) {
            //        console.log(resp);
            //        defer.reject(err);
            //    });
            $http.get("http://localhost:8080/authentication/signup")
                .then(function(response) {
                    //First function handles success
                    console.log(response);
                    defer.resolve(response);
                }, function(response) {
                    //Second function handles error
                    console.log(response);
                    defer.resolve(response);
                });
            return defer.promise;
        }
    }
});