// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userAccessSchema = mongoose.Schema({

    email: {
        type: String, required: true, unique: true
    },
    email_updated_at: Date,
    password: {
        type: String, required: true
    },
    password_updated_at: Date,
    activated: Boolean,
    activation_code: String,
    activated_at: Date,
    reset_password_code: String,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date
});

// generating a hash
userAccessSchema.methods.generateHash = function (param) {
    return bcrypt.hashSync(param, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userAccessSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// add and update the date on Every save

userAccessSchema.pre('save', function (next) {

    var currentDate = new Date();

    this.updated_at = currentDate;

    if(!this.email_updated_at || this.isModified('email')){
        this.email_updated_at = currentDate;
    }

    if(!this.password_updated_at || this.isModified('password')){
        this.password_updated_at = currentDate;
    }

    if (!this.created_at) {
        this.created_at = currentDate;
        this.activated = false;
    }

    next();
});

// create the model for users and expose it to our app
module.exports = mongoose.model('user_access', userAccessSchema);
