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
        type: Array
    },
    avail: [{
        type: ObjectId,
        ref: 'Schedule'
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