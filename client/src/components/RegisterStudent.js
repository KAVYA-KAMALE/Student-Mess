import React, { useState } from 'react';
import axios from 'axios';
import './RegisterStudent.css'; // Ensure this CSS file exists

const RegisterStudent = () => {
    // State for registration
    const [uniqueId, setUniqueId] = useState('');
    const [name, setName] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [branch, setBranch] = useState('');
    const [semester, setSemester] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [feePaid, setFeePaid] = useState(''); // Default to empty string

    // State for unregistration
    const [unregisterId, setUnregisterId] = useState('');

    // State for updating student
    const [updateId, setUpdateId] = useState('');
    const [updateName, setUpdateName] = useState('');
    const [updateRollNo, setUpdateRollNo] = useState('');
    const [updateBranch, setUpdateBranch] = useState('');
    const [updateSemester, setUpdateSemester] = useState('');
    const [updatePhoneNo, setUpdatePhoneNo] = useState('');
    const [updateFeePaid, setUpdateFeePaid] = useState('');

    // State for messages
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/students/register', {
                uniqueId,
                name,
                rollNo,
                branch,
                semester,
                phoneNo,
                feePaid
            });
            setMessage('Student registered successfully!');
            setError('');
            // Clear the form fields
            setUniqueId('');
            setName('');
            setRollNo('');
            setBranch('');
            setSemester('');
            setPhoneNo('');
            setFeePaid('');
        } catch (err) {
            setError('Error registering student');
            setMessage('');
        }
    };

    const handleUnregister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/students/unregister', { uniqueId: unregisterId });
            setMessage('Student unregistered successfully!');
            setError('');
            // Clear the uniqueId field
            setUnregisterId('');
        } catch (err) {
            setError('Error unregistering student');
            setMessage('');
        }
    };

    const handleUpdateFetch = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`http://localhost:5000/api/students/details/${updateId}`);
            const student = res.data;
            setUpdateName(student.name || '');
            setUpdateRollNo(student.rollNo || '');
            setUpdateBranch(student.branch || '');
            setUpdateSemester(student.semester || '');
            setUpdatePhoneNo(student.phoneNo || '');
            setUpdateFeePaid(student.feePaid || '');
            setError('');
        } catch (err) {
            setError('Error fetching student details');
            setMessage('');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:5000/api/students/update', {
                uniqueId: updateId,
                name: updateName,
                rollNo: updateRollNo,
                branch: updateBranch,
                semester: updateSemester,
                phoneNo: updatePhoneNo,
                feePaid: updateFeePaid
            });
            setMessage('Student details updated successfully!');
            setError('');
            // Clear the form fields
            setUpdateId('');
            setUpdateName('');
            setUpdateRollNo('');
            setUpdateBranch('');
            setUpdateSemester('');
            setUpdatePhoneNo('');
            setUpdateFeePaid('');
        } catch (err) {
            setError('Error updating student details');
            setMessage('');
        }
    };

    const handleResetRegister = () => {
        // Clear all fields for registration
        setUniqueId('');
        setName('');
        setRollNo('');
        setBranch('');
        setSemester('');
        setPhoneNo('');
        setFeePaid('');
        setMessage('');
        setError('');
    };

    const handleResetUnregister = () => {
        // Clear all fields for unregistration
        setUnregisterId('');
        setMessage('');
        setError('');
    };

    const handleResetUpdate = () => {
        // Clear all fields for updating
        setUpdateId('');
        setUpdateName('');
        setUpdateRollNo('');
        setUpdateBranch('');
        setUpdateSemester('');
        setUpdatePhoneNo('');
        setUpdateFeePaid('');
        setMessage('');
        setError('');
    };

    return (
        <div className="register-student-container">
            <h2>Register, Unregister, or Update Student</h2>

            <div className="form-section register-form">
                <h3>Register Student</h3>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="uniqueId">Unique ID</label>
                        <input
                            type="text"
                            id="uniqueId"
                            placeholder="Enter Unique ID"
                            value={uniqueId}
                            onChange={(e) => setUniqueId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rollNo">Roll No</label>
                        <input
                            type="text"
                            id="rollNo"
                            placeholder="Enter Roll No"
                            value={rollNo}
                            onChange={(e) => setRollNo(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="branch">Branch</label>
                        <input
                            type="text"
                            id="branch"
                            placeholder="Enter Branch"
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="semester">Current Semester</label>
                        <input
                            type="text"
                            id="semester"
                            placeholder="Enter Semester"
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNo">Phone No</label>
                        <input
                            type="text"
                            id="phoneNo"
                            placeholder="Enter Phone No"
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="feePaid">Fee Paid</label>
                        <select
                            id="feePaid"
                            value={feePaid}
                            onChange={(e) => setFeePaid(e.target.value)}
                            required
                        >
                            <option value="">Select Fee Status</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <button type="submit" className="register-button">
                        Register
                    </button>
                    <button type="button" onClick={handleResetRegister} className="reset-button">
                        Reset
                    </button>
                </form>
            </div>

            <div className="form-section unregister-form">
                <h3>Unregister Student</h3>
                <form onSubmit={handleUnregister}>
                    <div className="form-group">
                        <label htmlFor="unregisterId">Unique ID</label>
                        <input
                            type="text"
                            id="unregisterId"
                            placeholder="Enter Unique ID"
                            value={unregisterId}
                            onChange={(e) => setUnregisterId(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="unregister-button">
                        Unregister
                    </button>
                    <button type="button" onClick={handleResetUnregister} className="reset-button">
                        Reset
                    </button>
                </form>
            </div>

            <div className="form-section update-form">
                <h3>Update Student Details</h3>
                <form onSubmit={handleUpdateFetch}>
                    <div className="form-group">
                        <label htmlFor="updateId">Unique ID</label>
                        <input
                            type="text"
                            id="updateId"
                            placeholder="Enter Unique ID to Fetch"
                            value={updateId}
                            onChange={(e) => setUpdateId(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="update-fetch-button">
                        Fetch Details
                    </button>
                </form>

                <form onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label htmlFor="updateName">Name</label>
                        <input
                            type="text"
                            id="updateName"
                            placeholder="Enter Name"
                            value={updateName}
                            onChange={(e) => setUpdateName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="updateRollNo">Roll No</label>
                        <input
                            type="text"
                            id="updateRollNo"
                            placeholder="Enter Roll No"
                            value={updateRollNo}
                            onChange={(e) => setUpdateRollNo(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="updateBranch">Branch</label>
                        <input
                            type="text"
                            id="updateBranch"
                            placeholder="Enter Branch"
                            value={updateBranch}
                            onChange={(e) => setUpdateBranch(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="updateSemester">Current Semester</label>
                        <input
                            type="text"
                            id="updateSemester"
                            placeholder="Enter Semester"
                            value={updateSemester}
                            onChange={(e) => setUpdateSemester(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="updatePhoneNo">Phone No</label>
                        <input
                            type="text"
                            id="updatePhoneNo"
                            placeholder="Enter Phone No"
                            value={updatePhoneNo}
                            onChange={(e) => setUpdatePhoneNo(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="updateFeePaid">Fee Paid</label>
                        <select
                            id="updateFeePaid"
                            value={updateFeePaid}
                            onChange={(e) => setUpdateFeePaid(e.target.value)}
                        >
                            <option value="">Select Fee Status</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <button type="submit" className="update-button">
                        Update
                    </button>
                    <button type="button" onClick={handleResetUpdate} className="reset-button">
                        Reset
                    </button>
                </form>
            </div>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default RegisterStudent;
