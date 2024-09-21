const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    rollNo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Present', 'Absent'],  // Default enum values for attendance
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
