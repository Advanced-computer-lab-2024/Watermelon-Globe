// src/AdminComponent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminComponent = () => {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const response = await axios.get('/getAllAdmin');
            setAdmins(response.data);
        } catch (error) {
            console.error('Error fetching admins:', error);
        }
    };

    const deleteAdmin = async (id) => {
        try {
            await axios.delete(`/Admin/${id}`);
            fetchAdmins();  // Refresh the admin list
        } catch (error) {
            console.error('Error deleting admin:', error);
        }
    };

    return (
        <div>
            <h2>Admins</h2>
            {/* Button to navigate to create admin page */}
            <Link to="/create-admin">
                <button>Create New Admin</button>
            </Link>
            <ul>
                {admins.map(admin => (
                    <li key={admin._id}>
                        {admin.username} 
                        <button onClick={() => deleteAdmin(admin._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminComponent;
