// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var userDetailsSchema = mongoose.Schema({

    _user_access_id: mongoose.Schema.Types.ObjectId,
    first_name: String,
    last_name: String,
    dob: Date,
    show_dob: Boolean,
    sex: Boolean,
    contact_numbers: {
        id: mongoose.Schema.Types.ObjectId,
    },
    email_addresses: {
        id: mongoose.Schema.Types.ObjectId,
    },
    addresses: {
        id: mongoose.Schema.Types.ObjectId,
    },
    pic: String,
    pic_updated_at: Date,
    cover_pic: String,
    cover_pic_updated_at: Date,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date
});

// add and update the date on Every save

userDetailsSchema.pre('save', function (next) {

    var currentDate = new Date();

    this.updated_at = currentDate;

    if (this.isModified('mobile_number')) {
        this.mobile_updated_at = currentDate;
    }

    if (this.isModified('phone_number')) {
        this.phone_updated_at = currentDate;
    }

    if (this.isModified('add1') || this.isModified('add2') ||
        this.isModified('city') || this.isModified('state') || this.isModified('country') || this.isModified('pin_code')) {
        this.address_updated_at = currentDate;
    }

    if (this.isModified('pic')) {
        this.pic_updated_at = currentDate;
    }

    if (this.isModified('cover_pic')) {
        this.cover_pic_updated_at = currentDate;
    }

    if (!this.created_at) {
        this.created_at = currentDate;
    }

    next();
});

// create the model for users and expose it to our app
module.exports = mongoose.model('user_details', userDetailsSchema);
