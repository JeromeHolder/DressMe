const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.Types.ObjectId;

// Create SA schema
const saSchema = Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    availRad: {
        type: Number,
        required: true
    },
    rating: Number,
    address: {
        number: {
            type: Number,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        province: {
            type: String,
            required: true
        }
    },
    addressString: {
        type: String,
        required: true
    },
    image: String,
    expertise: {
        type: Array //Not sure about this
    },
    avail: [{
        day: {
            type: String,
            required: true
        },
        hours: [{
            hour: {
                type: Number,
                required: true
            },
            booked: {
                type: Boolean,
                required: true
            },
            bookedBy: {
                type: ObjectId,
                ref: 'User'
            }
        }]
    }],
    blurb: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const SA = mongoose.model('SA', saSchema);

module.exports = SA;