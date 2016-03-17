// load the things we need
var mongoose = require('mongoose');

const OS_NOT_YET_USED = 0;

const OS_USED = 1;

// define the schema for our user model
var userAccessDetailsSchema = mongoose.Schema({

    _user_access_id: mongoose.Schema.Types.ObjectId,
    ios: Boolean,
    android: Boolean,
    web_browser: Boolean,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date
});

// add and update the date on Every save

userAccessDetailsSchema.pre('save', function (next) {

    var currentDate = new Date();

    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;
    }

    next();
});

// create the model for users and expose it to our app
module.exports = mongoose.model('user_access_details', userAccessDetailsSchema);
