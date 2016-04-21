// load the things we need
var mongoose = require('mongoose');
var CONSTANT = require('./../helpers/constants');

// define the schema for our user model
var ActivitiesSchema = mongoose.Schema({

        _user_access_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        activity_type: {
            type: Number,
            required: true,
            index: true
        },
        activity_time: {
            type: Date,
            default: Date.now,
        },
        activity_text: {
            type: String
        },
        icon: {
            type: String
        },
        image: {
            type: String
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

ActivitiesSchema.pre('save', function (next) {

    var currentDate = new Date();

    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;
        this.activity_time = currentDate;
    }

    next();
});

// create the model for users and expose it to our app
module.exports = mongoose.model('activities', ActivitiesSchema);
