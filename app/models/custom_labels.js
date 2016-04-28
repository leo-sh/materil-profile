// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var CustomLabelsSchema = mongoose.Schema({

        _user_access_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        label_name: {
            type: String,
            required: true,
            index: true
        },
        label_icon: {
            type: String,
            required: true
        }
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

CustomLabelsSchema.virtual('label_id').get(
    function () {
        return this._id;
    }
);

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
