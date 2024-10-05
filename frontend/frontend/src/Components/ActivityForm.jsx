import React, { useState } from 'react';
import axios from 'axios';

const ActivityForm = () => {
    const [activity, setActivity] = useState({
        date: '',
        time: '',
        location: '',
        price: '',
        category: '',
        tags: '',
        discount: '',
        bookingOpen: false,
    });

    const handleChange = (e) => {
        setActivity({
            ...activity,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/activities', activity);
            console.log('Activity created:', response.data);
        } catch (error) {
            console.error('Error creating activity:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="date" name="date" value={activity.date} onChange={handleChange} placeholder="Date" />
            <input type="time" name="time" value={activity.time} onChange={handleChange} placeholder="Time" />
            <input type="text" name="location" value={activity.location} onChange={handleChange} placeholder="Location" />
            <input type="text" name="price" value={activity.price} onChange={handleChange} placeholder="Price" />
            <input type="text" name="category" value={activity.category} onChange={handleChange} placeholder="Category" />
            <input type="text" name="tags" value={activity.tags} onChange={handleChange} placeholder="Tags" />
            <input type="text" name="discount" value={activity.discount} onChange={handleChange} placeholder="Special Discounts" />
            <label>
                Booking Open:
                <input type="checkbox" name="bookingOpen" checked={activity.bookingOpen} onChange={() => setActivity({ ...activity, bookingOpen: !activity.bookingOpen })} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ActivityForm;
