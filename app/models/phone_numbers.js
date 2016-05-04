// load the things we need
var mongoose = require('mongoose');
var customLabels = require('./custom_labels');

// define the schema for our user model
var PhoneNumbersSchema = mongoose.Schema({

        _type_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        country_code: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true,
            index: true
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    },
    {
        versionKey: 0
    }
);

// add and update the date on Every save

PhoneNumbersSchema.pre('save', function (next) {

    var currentDate = new Date();

    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;
    }

    next();
});

var typeIdValidator = function (_type_id) {

    customLabels.findOne({_id: _type_id}, function (err, label) {

        if (err)
            throw err;

        if (!label) {
            return false;
        }
    });
}

// create the model for users and expose it to our app
module.exports = mongoose.model('phone_numbers', PhoneNumbersSchema);
