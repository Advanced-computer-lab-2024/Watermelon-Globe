import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GovernorComponent = () => {
    const [governors, setGovernors] = useState([]);
    const [newGovernor, setNewGovernor] = useState('');

    useEffect(() => {
        fetchGovernors();
    }, []);

    const fetchGovernors = async () => {
        try {
            const response = await axios.get('/Governer/');
            setGovernors(response.data);
        } catch (error) {
            console.error('Error fetching governors:', error);
        }
    };

    const createGovernor = async () => {
        try {
            await axios.post('/Governer/', { name: newGovernor });
            fetchGovernors();  // Refresh the governor list
        } catch (error) {
            console.error('Error creating governor:', error);
        }
    };

    const deleteGovernor = async (id) => {
        try {
            await axios.delete(`/Governer/${id}`);
            fetchGovernors();  // Refresh the governor list
        } catch (error) {
            console.error('Error deleting governor:', error);
        }
    };

    return (
        <div>
            <h2>Governors</h2>
            <input 
                type="text" 
                placeholder="New Governor Name" 
                value={newGovernor} 
                onChange={(e) => setNewGovernor(e.target.value)} 
            />
            <button onClick={createGovernor}>Create Governor</button>
            <ul>
                {governors.map(governor => (
                    <li key={governor.id}>
                        {governor.name} 
                        <button onClick={() => deleteGovernor(governor.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GovernorComponent;
