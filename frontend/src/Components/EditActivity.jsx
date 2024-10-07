import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditActivity = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activity, setActivity] = useState(null);
    const [newPrice, setNewPrice] = useState('');
    const [newDiscount, setNewDiscount] = useState('');
    const [availableTags, setAvailableTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/activities/${id}`);
                setActivity(response.data);
                setNewPrice(response.data.Price);
                setNewDiscount(response.data.Discount);
                setSelectedTags(response.data.tags); // Set selected tags from the activity
            } catch (error) {
                console.error('Error fetching activity:', error);
            }
        };

        const fetchTags = async () => {
            try {
                const response = await axios.get('http://localhost:8000/getTags'); // Adjust the endpoint for fetching tags
                setAvailableTags(response.data);
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };

        fetchActivity();
        fetchTags();
    }, [id]);

    const handleTagToggle = (tag) => {
        setSelectedTags((prev) => 
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/updateActivity/${id}`, {
                Price: newPrice,
                Discount: newDiscount,
                tags: selectedTags
            });
            alert('Activity updated successfully');
            navigate('/');
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
                <div>
                    <label>Tags:</label>
                    {availableTags.map(tag => (
                        <div key={tag._id}>
                            <input 
                                type="checkbox" 
                                checked={selectedTags.includes(tag._id)} 
                                onChange={() => handleTagToggle(tag._id)} 
                            />
                            {tag.type} ({tag.historicPeriod})
                        </div>
                    ))}
                </div>
                <button type="submit">Update Activity</button>
            </form>
        </div>
    );
};

export default EditActivity;
