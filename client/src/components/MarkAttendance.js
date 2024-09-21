import React, { useState } from 'react';
import axios from 'axios';

const MarkAttendance = () => {
    const [uniqueId, setUniqueId] = useState('');
    const [message, setMessage] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send POST request to the backend with the uniqueId
            const response = await axios.post('/api/attendance/mark-attendance', { uniqueId }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`  // Send token for verification
                }
            });

            // Display success or failure message
            if (response.data.success) {
                setMessage('Attendance marked successfully');
            } else {
                setMessage('Failed to mark attendance');
            }
        } catch (error) {
            console.error('Error marking attendance:', error);
            setMessage('Failed to mark attendance');
        }
    };

    return (
        <div>
            <h2>Mark Attendance</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Unique ID:
                    <input
                        type="text"
                        value={uniqueId}
                        onChange={(e) => setUniqueId(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Mark Attendance</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default MarkAttendance;
