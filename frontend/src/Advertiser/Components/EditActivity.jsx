import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditActivity = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activity, setActivity] = useState(null);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await axios.get(`/api/Activities/getActivityById/${id}`);
                setActivity(response.data);
                setName(response.data.Name);
                setDate(response.data.Date);
                setTime(response.data.Time);
                setPrice(response.data.Price);
                setCategory(response.data.Category);
                setTags(response.data.Tags.join(', ')); // Assuming tags are an array
            } catch (error) {
                console.error('Error fetching activity:', error);
            }
        };

        fetchActivity();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert tags to an array
        const tagsArray = tags.split(',').map(tag => tag.trim());

        try {
            await axios.put(`/api/Activities/updateActivity/${id}`, {
                Name: name,
                Date: date,
                Time: time,
                Price: price,
                Category: category,
                Tags: tagsArray
            });
            alert('Activity updated successfully');
            navigate('/advertiser');
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
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>Time:</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div>
                    <label>Tags (comma separated):</label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>
                <button type="submit">Update Activity</button>
            </form>
        </div>
    );
};

export default EditActivity;
