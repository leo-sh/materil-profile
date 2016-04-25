// load the things we need
var mongoose = require('mongoose');
var CONSTANT = require('./../helpers/constants');

// define the schema for our user model
var userDevicesSchema = mongoose.Schema({

    _user_access_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    os_type: {
        type: Number,
        required: true,
        index: true,
        enum: [
            CONSTANT.OS_TYPE.WEB_BROWSER,
            CONSTANT.OS_TYPE.ANDROID,
            CONSTANT.OS_TYPE.IOS,
            CONSTANT.OS_TYPE.UNKNOWN,
        ]
    },
    created_at: Date,
    updated_at: Date,
    deleted_at: Date
});

// add and update the date on Every save

userDevicesSchema.pre('save', function (next) {

    var currentDate = new Date();

    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;
    }

    next();
});

// create the model for users and expose it to our app
module.exports = mongoose.model('user_devices', userDevicesSchema);
