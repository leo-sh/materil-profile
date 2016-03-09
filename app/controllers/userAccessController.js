var userAccess = require('./../models/user_access');

module.exports = {

    createUser: function (req, res) {

        var currentDate = new Date();

        var user = new userAccess();
        user.email = req.body.email;
        user.email_updated_at = currentDate;
        user.password = user.generateHash(req.body.password);
        user.password_updated_at = currentDate;
        user.activated = 0;

        user.save(function (err) {
            if (err)
                res.send(err);

            return user;
        });

    },

    getUser: function (req, res) {

        userAccess.findById(req.params.auth_id, function (err, user) {
            if (err)
                throw err;

            res.json(user);
        });
    }
}