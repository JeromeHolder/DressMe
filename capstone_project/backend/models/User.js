const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

// Create User schema
const userSchema = Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
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
    blurb: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;