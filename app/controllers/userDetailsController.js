var userDetails = require('./../models/user_details');

module.exports = {

    createUser: function (req, res) {

        var user = new userDetails();
        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;
        user.dob = req.body.dob;
        user.show_dob = 1;
        user.sex = req.body.sex;
        user.mobile_number = req.body.mobile_number;
        user.show_mobile_number = 1;
        user.phone_number = req.body.phone_number;
        user.show_phone_number = 1;
        user.add1 = req.body.add1;
        user.add2 = req.body.add2;
        user.city = req.body.city;
        user.state = req.body.state;
        user.country = req.body.country;
        user.pin_code = req.body.pin_code;
        user.show_address = 1;
        user._user_access_id = req.body._user_access_id;

        user.save(function (err) {
            if (err)
                throw(err);
        });

    },

    getUser: function (req, res) {

        userAccess.findById(req.params.auth_id, function (err, user) {
            if (err)
                res.send(err);

            res.json(user);
        });
    }
}