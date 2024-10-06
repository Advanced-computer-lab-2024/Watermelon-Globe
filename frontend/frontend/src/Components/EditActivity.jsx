// EditActivity.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditActivity = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activity, setActivity] = useState(null);
    const [newPrice, setNewPrice] = useState('');
    const [newDiscount, setNewDiscount] = useState('');

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/updateActivity/${id}`);
                setActivity(response.data);
                setNewPrice(response.data.Price);
                setNewDiscount(response.data.Discount);
            } catch (error) {
                console.error('Error fetching activity:', error);
            }
        };

        fetchActivity();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/activities/${id}`, {
                Price: newPrice,
                Discount: newDiscount
            });
            alert('Activity updated successfully');
            navigate('/'); // Redirect back to HomeScreen
        } catch (error) {
            console.error('Error updating activity:', error);
            alert('Error updating activity');
        }
    };

    if (!activity) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Edit Activity</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                    />
                </div>
                <div>
                    <label>Discount:</label>
                    <input
                        type="number"
                        value={newDiscount}
                        onChange={(e) => setNewDiscount(e.target.value)}
                    />
                </div>
                <button type="submit">Update Activity</button>
            </form>
        </div>
    );
};

export default EditActivity;
