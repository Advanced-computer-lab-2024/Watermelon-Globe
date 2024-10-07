// src/CreateAdminForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateAdminForm = () => {
    const [newAdmin, setNewAdmin] = useState({ username: '', password: '' });
    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/createAdmin', { 
                username: newAdmin.username, 
                password: newAdmin.password 
            });
            console.log('Admin created successfully:', response.data); // Log success
            navigate('/Admin'); // Redirect to the admin list page after creation
        } catch (error) {
            console.error('Error creating admin:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <h2>Create Admin</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={newAdmin.username} 
                    onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={newAdmin.password} 
                    onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })} 
                    required 
                />
                <button type="submit">Create Admin</button>
            </form>
        </div>
    );
};

export default CreateAdminForm;
