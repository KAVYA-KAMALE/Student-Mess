const express = require('express');
const router = express.Router();
const Student = require('../models/Student');  // Assuming you have a Student model
const Attendance = require('../models/Attendance');  // Assuming you have an Attendance model
const verifyToken = require('../middleware/verifyToken');  // Token verification middleware

// Route to mark attendance
router.post('/mark-attendance', verifyToken, async (req, res) => {
    const { uniqueId } = req.body;

    // Validate that uniqueId is provided
    if (!uniqueId) {
        return res.status(400).json({ success: false, message: 'Unique ID is required' });
    }

    try {
        // Fetch student details from the Student collection
        const student = await Student.findOne({ uniqueId });

        // If student is not found, return an error
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        // If the student is found, mark attendance in the Attendance collection
        const attendance = new Attendance({
            rollNo: student.rollNo,
            name: student.name,
            status: 'Present',  // You can make this dynamic if required
            timestamp: new Date()
        });

        // Save the attendance record to the database
        await attendance.save();

        // Send success response
        return res.status(200).json({ success: true, message: 'Attendance marked successfully' });
    } catch (error) {
        console.error('Error marking attendance:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
