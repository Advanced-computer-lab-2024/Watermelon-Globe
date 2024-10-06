// src/SignupPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = ({ onSignup }) => {
    const [formData, setFormData] = useState({ Name: '', About: '', Hotline: '', Link: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/createProfile', formData);
            onSignup(response.data.profile);  // Call parent method to update isSignedUp state
            navigate('/account');  // Redirect to account page
        } catch (err) {
            setError('Error signing up');
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="Name" placeholder="Name" onChange={handleChange} required />
                <input type="text" name="About" placeholder="About" onChange={handleChange} required />
                <input type="text" name="Hotline" placeholder="Hotline" onChange={handleChange} required />
                <input type="text" name="Link" placeholder="Link" onChange={handleChange} required />
                <button type="submit">Sign Up</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default SignupPage;
