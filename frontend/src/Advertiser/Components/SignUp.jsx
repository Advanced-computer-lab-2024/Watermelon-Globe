// src/SignupPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = ({ onSignup }) => {
    const [formData, setFormData] = useState({ Name: '', Email: '', Password: ''});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/Advertiser/createProfile', formData);
            onSignup(response.data.profile); 
            
            localStorage.setItem('userId', response.data.profile._id);
            const userId = localStorage.getItem('userId');
            console.log("User ID:", userId);

            navigate('/CompanyAccount');
        } catch (err) {
            setError('Error signing up');
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="Name" placeholder="Name" onChange={handleChange} required />
                <input type="text" name="Email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="Password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Sign Up</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default SignupPage;