// persisting email as _user in the cookies for the user to identify in the sessions.
app.service('userPersistenceService', ['$cookies', function ($cookies) {

    var _user = "";

    return {
        setCookieData: function (user_email, remember_me) {
            _user = user_email;
            var now = new Date();
            now.setDate(now.getDate() + 7);

            if(remember_me){
                $cookies.put("_user", _user, {
                    expires: now
                });
            }else{
                $cookies.put("_user", _user);
            }
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