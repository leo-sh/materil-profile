// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var randomstring = require("randomstring");
var CheckUserType = require('./../helpers/checkUserType');
var CONSTANTS = require('./../helpers/constants');
var Activities = require('./activities');

// define the schema for our user model
var userAccessSchema = mongoose.Schema({

    email: {
        type: String,
        index: true,
        unique: true
    },
    email_updated_at: {
        type: Date
    },
    password: {
        type: String
    },
    password_updated_at: {
        type: Date
    },
    country_code: {
        type: String,
    },
    contact_number: {
        type: String,
        index: true,
        unique: true
    },
    contact_number_updated_at: {
        type: Date
    },
    activated: {
        type: Boolean
    },
    activation_code: {
        type: String, default: '', trim: true
    },
    activated_at: {
        type: Date
    },
    reset_password_code: {
        type: String, default: '', trim: true
    },
    created_at: Date,
    updated_at: Date,
    deleted_at: Date
});

// generating a hash
userAccessSchema.methods.generateHash = function (param) {
    return bcrypt.hashSync(param, bcrypt.genSaltSync(8), null);
};

//generating a random string for activation of user
userAccessSchema.methods.generateActivationCode = function () {
    return randomstring.generate(10);
};

// checking if password is valid
userAccessSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// add and update the date on Every save

userAccessSchema.pre('save', function (next) {

    var currentDate = new Date();

    this.updated_at = currentDate;

    if (this.email && this.isModified('email')) {
        this.email_updated_at = currentDate;

        var newActivity = new Activities();
        newActivity._user_access_id = this._id;
        newActivity.activity_type = CONSTANTS.ACTIVITY_TYPES.DETAILS_UPDATING_ACTIVITY;
        newActivity.activity_text = 'Updated Email Address';
        newActivity.icon = 'mdi-action-face-unlock';

        newActivity.save(function (err) {
            if (err) {
                console.log('Error in saving activity: UserAccess->Email Address Activity');
                throw err;
            }
        });
    }

    if (this.isModified('contact_number')) {
        this.contact_number_updated_at = currentDate;

        var newActivity = new Activities();
        newActivity._user_access_id = this._id;
        newActivity.activity_type = CONSTANTS.ACTIVITY_TYPES.DETAILS_UPDATING_ACTIVITY;
        newActivity.activity_text = 'Updated Contact Number';
        newActivity.icon = 'mdi-action-face-unlock';

        newActivity.save(function (err) {
            if (err) {
                console.log('Error in saving activity: UserAccess->Contact Number Activity');
                throw err;
            }
        });
    }

    if (!this.password_updated_at || this.isModified('password')) {
        this.password_updated_at = currentDate;
    }

    if (!this.created_at) {
        this.created_at = currentDate;

        var newActivity = new Activities();
        newActivity._user_access_id = this._id;
        newActivity.activity_type = CONSTANTS.ACTIVITY_TYPES.SIGN_UP_ACTIVITY;
        newActivity.activity_text = 'Thank You for Signing UP';
        newActivity.icon = 'mdi-action-face-unlock';

        newActivity.save(function (err) {
            if (err) {
                console.log('Error in saving activity: UserAccess->CreatedAt Activity');
                throw err;
            }
        });

        if (CheckUserType.checkIfTestEmail(this.email)) {
            this.activated = true;
        } else {
            this.activated = false;
        }
    }

    next();
});

// create the model for users and expose it to our app
module.exports = mongoose.model('user_access', userAccessSchema);
