// load the things we need
var mongoose = require('mongoose');
var CONSTANT = require('./../helpers/constants');
var Activities = require('./activities');
// define the schema for our user model
var userDetailsSchema = mongoose.Schema({

        _user_access_id: mongoose.Schema.Types.ObjectId,
        first_name: {
            type: String,
            index: true
        },
        last_name: {
            type: String,
            index: true
        },
        nick_name: {
            type: String,
            index: true
        },
        dob: {
            type: Date,
            default: '1991-01-01',
        },
        show_dob: {
            type: Boolean,
            default: CONSTANT.USER_SHOW_OTHERS.DONT_SHOW_TO_OTHERS, //0: Don't show to others
        },
        sex: {
            type: Number,
            enum: [
                CONSTANT.USER_SEX.SEX_FEMALE, //0: female
                CONSTANT.USER_SEX.SEX_MALE,   //1: male
            ]
        },
        contact_numbers: [
            {
                phone_number_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    index: true
                },
                _id: false
            }
        ],
        email_addresses: [
            {
                email_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    index: true
                },
                _id: false
            }
        ],
        addresses: [
            {
                address_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    index: true
                },
                _id: false
            }
        ],
        pic: {
            type: String,
        },
        pic_updated_at: {
            type: Date,
            default: Date.now,
        },
        cover_pic: {
            type: String,
        },
        cover_pic_updated_at: {
            type: Date,
            default: Date.now,
        },
        created_at: Date,
        updated_at: Date,
        deleted_at: Date
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    },
    {
        versionKey: false
    }
);

// add and update the date on Every save

userDetailsSchema.pre('save', function (next) {

    var currentDate = new Date();

    this.updated_at = currentDate;

    if (this.isModified('first_name') || this.isModified('last_name')) {

        var activity = new Activities();
        activity._user_access_id = this._user_access_id;
        activity.activity_type = CONSTANT.ACTIVITY_TYPES.DETAILS_UPDATING_ACTIVITY;
        activity.activity_time = currentDate;
        activity.activity_text = 'Updated Name to ';
        activity.activity_item = this.first_name + ' ' + this.last_name;
        activity.icon = 'mdi-social-person-add';
        activity.image = null;

        activity.save(function (err) {

            if (err) {
                console.log('Error in saving Name to activities: UserDetailsModel');
                throw err;
            }

        });
    }

    if (this.isModified('nick_name')) {

        var activity = new Activities();
        activity._user_access_id = this._user_access_id;
        activity.activity_type = CONSTANT.ACTIVITY_TYPES.DETAILS_UPDATING_ACTIVITY;
        activity.activity_time = currentDate;
        activity.activity_text = 'Updated Nick Name to ';
        activity.activity_item = this.nick_name;
        activity.icon = 'mdi-social-person-outline';
        activity.image = null;

        activity.save(function (err) {

            if (err) {
                console.log('Error in saving Nick Name to activities: UserDetailsModel');
                throw err;
            }

        });
    }

    if (this.isModified('dob')) {

        var activity = new Activities();
        activity._user_access_id = this._user_access_id;
        activity.activity_type = CONSTANT.ACTIVITY_TYPES.DETAILS_UPDATING_ACTIVITY;
        activity.activity_time = currentDate;
        activity.activity_text = 'Updated Date Of Birth to ';
        activity.activity_item = this.dob;
        activity.icon = 'mdi-social-cake';
        activity.image = null;

        activity.save(function (err) {

            if (err) {
                console.log('Error in saving Date Of Birth to activities: UserDetailsModel');
                throw err;
            }

        });
    }

    if (this.isModified('sex')) {

        var activity = new Activities();
        activity._user_access_id = this._user_access_id;
        activity.activity_type = CONSTANT.ACTIVITY_TYPES.DETAILS_UPDATING_ACTIVITY;
        activity.activity_time = currentDate;
        activity.activity_text = 'Updated Sex to ';
        activity.activity_item = this.sex;
        activity.icon = 'mdi-editor-border-color';
        activity.image = null;

        activity.save(function (err) {

            if (err) {
                console.log('Error in saving Sex to activities: UserDetailsModel');
                throw err;
            }

        });
    }

    if (this.isModified('contact_numbers')) {

        var activity = new Activities();
        activity._user_access_id = this._user_access_id;
        activity.activity_type = CONSTANT.ACTIVITY_TYPES.DETAILS_UPDATING_ACTIVITY;
        activity.activity_time = currentDate;
        activity.activity_text = 'Updated Mobile phone book';
        activity.activity_item = this.contact_numbers;
        activity.icon = 'mdi-editor-border-color';
        activity.image = null;

        activity.save(function (err) {

            if (err) {
                console.log('Error in saving Phone Number to activities: UserDetailsModel');
                throw err;
            }

        });
    }

    if (this.isModified('email_addresses')) {

        var activity = new Activities();
        activity._user_access_id = this._user_access_id;
        activity.activity_type = CONSTANT.ACTIVITY_TYPE.DETAILS_UPDATING_ACTIVITY;
        activity.activity_time = currentDate;
        activity.activity_text = 'Updated Email Address book';
        activity.activity_item = this.email_addresses;
        activity.icon = 'mdi-action-face-unlock';
        activity.image = null;

        activity.save(function (err) {

            if (err) {
                console.log('Error in saving Email Addresses to activities: UserDetailsModel');
                throw err;
            }

        });
    }

    if (this.isModified('addresses')) {

        var activity = new Activities();
        activity._user_access_id = this._user_access_id;
        activity.activity_type = CONSTANT.ACTIVITY_TYPE.DETAILS_UPDATING_ACTIVITY;
        activity.activity_time = currentDate;
        activity.activity_text = 'Updated Address book';
        activity.activity_item = this.addresses;
        activity.icon = 'mdi-action-face-unlock';
        activity.image = null;

        activity.save(function (err) {

            if (err) {
                console.log('Error in saving Addresses to activities: UserDetailsModel');
                throw err;
            }

        });
    }

    if (this.isModified('pic')) {
        this.pic_updated_at = currentDate;

        var activity = new Activities();
        activity._user_access_id = this._user_access_id;
        activity.activity_type = CONSTANT.ACTIVITY_TYPE.DETAILS_UPDATING_ACTIVITY;
        activity.activity_time = currentDate;
        activity.activity_text = 'Updated Profile Pic';
        activity.activity_item = this.pic;
        activity.icon = 'mdi-action-face-unlock';
        activity.image = null;

        activity.save(function (err) {

            if (err) {
                console.log('Error in saving Profile pic to activities: UserDetailsModel');
                throw err;
            }

        });
    }

    if (this.isModified('cover_pic')) {
        this.cover_pic_updated_at = currentDate;

        var activity = new Activities();
        activity._user_access_id = this._user_access_id;
        activity.activity_type = CONSTANT.ACTIVITY_TYPE.DETAILS_UPDATING_ACTIVITY;
        activity.activity_time = currentDate;
        activity.activity_text = 'Updated Cover Pic';
        activity.activity_item = this.cover_pic;
        activity.icon = 'mdi-action-face-unlock';
        activity.image = null;

        activity.save(function (err) {

            if (err) {
                console.log('Error in saving Cover Pic to activities: UserDetailsModel');
                throw err;
            }

        });
    }

    if (!this.created_at) {
        this.created_at = currentDate;
    }

    next();
});

// create the model for users and expose it to our app
module.exports = mongoose.model('user_details', userDetailsSchema);
