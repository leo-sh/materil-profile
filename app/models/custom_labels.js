// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var CustomLabelsSchema = mongoose.Schema({

    _user_access_id: mongoose.Schema.Types.ObjectId,
    label_name: String,
    created_at: Date,
    updated_at: Date
});

// add and update the date on Every save

CustomLabelsSchema.pre('save', function (next) {

    var currentDate = new Date();

    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;
    }

    next();
});

// create the model for users and expose it to our app
module.exports = mongoose.model('custom_labels', CustomLabelsSchema);
