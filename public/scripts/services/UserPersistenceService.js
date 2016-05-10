// persisting email as _user in the cookies for the user to identify in the sessions.
app.service('UserPersistenceService', ['$http', 'LOCAL_STORAGE', function ($http, LOCAL_STORAGE) {

    var isAuthenticated = false;
    var authToken;

    return {
        loadUserCredentials: function () {
            var token = window.localStorage.getItem(LOCAL_STORAGE._TOKEN_KEY_);
            if (token) {
                this.useCredentials(token);
            }
        },
        storeUserCredentials: function (token) {
            window.localStorage.setItem(LOCAL_STORAGE._TOKEN_KEY_, token);
            this.useCredentials(token);
        },
        useCredentials: function (token) {
            isAuthenticated = true;
            authToken = token;

            // Set the token as header for your requests!
            $http.defaults.headers.common.Authorization = authToken;
        },
        destroyUserCredentials: function () {
            authToken = undefined;
            isAuthenticated = false;
            $http.defaults.headers.common.Authorization = undefined;
            window.localStorage.removeItem(LOCAL_STORAGE._TOKEN_KEY_);
        },
        isAuthenticated: function () {
            return isAuthenticated;
        }
    }
}])