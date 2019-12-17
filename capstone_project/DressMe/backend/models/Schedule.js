const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.Types.ObjectId;

const scheduleSchema = Schema({
    day: {
        type: String,
        required: true
    },
    hours: [
        {
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
        }
    ]
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;