import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ActivityForm.css';

const ActivityForm = ({ userId }) => {
    const [activity, setActivity] = useState({
        Name: '',
        Date: '',
        Time: '',
        LocationType: 'Point',
        coordinates: '',
        Price: '',
        Category: '',
        Discount: '',
        bookingOpen: false,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setActivity({
            ...activity,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            console.error('User ID is missing. Cannot create activity.');
            return;
        }

        const coordinatesArray = activity.coordinates.split(',').map(coord => parseFloat(coord.trim()));

        const activityData = {
            ...activity,
            Location: {
                type: activity.LocationType,
                coordinates: coordinatesArray,
            },
            Advertiser: userId,
        };

        try {
            const response = await axios.post('/api/Activities/newActivity', activityData);
            alert("Activity created successfully.");
            console.log('Activity created:', response.data);
        } catch (error) {
            console.error('Error creating activity:', error.response.data);
        }
    };

    return (
        <form className="activity-form" onSubmit={handleSubmit}>
            <h2>Create a New Activity</h2>
            <div className="form-group">
                <label>Activity Name</label>
                <input
                    type="text"
                    name="Name"
                    value={activity.Name}
                    onChange={handleChange}
                    placeholder="Enter activity name"
                    required
                />
            </div>
            <div className="form-group">
                <label>Date</label>
                <input
                    type="date"
                    name="Date"
                    value={activity.Date}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Time</label>
                <input
                    type="time"
                    name="Time"
                    value={activity.Time}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Coordinates (lat, long)</label>
                <input
                    type="text"
                    name="coordinates"
                    value={activity.coordinates}
                    onChange={handleChange}
                    placeholder="Enter coordinates"
                    required
                />
            </div>
            <div className="form-group">
                <label>Price</label>
                <input
                    type="text"
                    name="Price"
                    value={activity.Price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    required
                />
            </div>
            <div className="form-group">
                <label>Category</label>
                <input
                    type="text"
                    name="Category"
                    value={activity.Category}
                    onChange={handleChange}
                    placeholder="Enter category"
                    required
                />
            </div>
            <div className="form-group">
                <label>Discount</label>
                <input
                    type="text"
                    name="Discount"
                    value={activity.Discount}
                    onChange={handleChange}
                    placeholder="Enter discount"
                />
            </div>
            <div className="form-group booking-group">
                <label>Booking Open</label>
                <input
                    type="checkbox"
                    name="bookingOpen"
                    checked={activity.bookingOpen}
                    onChange={() => setActivity({ ...activity, bookingOpen: !activity.bookingOpen })}
                />
            </div>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    );
};

export default ActivityForm;
