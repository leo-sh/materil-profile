// persisting email as _user in the cookies for the user to identify in the sessions.
app.service('userPersistenceService', ['$cookies', function ($cookies) {

    var _user = "";

    return {
        setCookieData: function (user_email) {
            _user = user_email;
            $cookies.put("_user", _user);
        },
        getCookieData: function () {
            _user = $cookies.get("_user");
            return _user;
        },
        clearCookieData: function () {
            _user = "";
            $cookies.remove("_user");
        }
    }
}])