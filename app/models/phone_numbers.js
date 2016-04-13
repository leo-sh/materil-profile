// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var PhoneNumbersSchema = mongoose.Schema({

        _type_id: mongoose.Schema.Types.ObjectId,
        number: String
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

PhoneNumbersSchema.pre('save', function (next) {

    var currentDate = new Date();

    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;
    }

    next();
});

// create the model for users and expose it to our app
module.exports = mongoose.model('phone_numbers', PhoneNumbersSchema);
