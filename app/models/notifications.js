// load the things we need
var mongoose = require('mongoose');
var CONSTANT = require('./../helpers/constants');
// define the schema for our user model
var notificationsSchema = mongoose.Schema({

        _user_access_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        email_notifications: {
            news_and_updates: {
                type: Boolean,
                default: CONSTANT.NOTIFICATIONS.NOTIFICATION_YES, //1: show notifications
            },
            offers: {
                type: Boolean,
                default: CONSTANT.NOTIFICATIONS.NOTIFICATION_YES, //1: show notifications
            }
        },
        mobile_notifications: {
            news_and_updates: {
                type: Boolean,
                default: CONSTANT.NOTIFICATIONS.NOTIFICATION_YES, //1: show notifications
            },
            offers: {
                type: Boolean,
                default: CONSTANT.NOTIFICATIONS.NOTIFICATION_YES, //1: show notifications
            }
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

    if (!this.created_at) {
        this.created_at = currentDate;
    }

    next();
});

// create the model for users and expose it to our app
module.exports = mongoose.model('notifications', notificationsSchema);
