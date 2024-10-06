import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomeScreen = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        // Fetch all activities
        const fetchActivities = async () => {
            try {
                const response = await axios.get('http://localhost:8000/activities'); // Adjust the endpoint based on your backend
                setActivities(response.data);
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };

        fetchActivities();
    }, []);

    return (
        <div>
            <h1>All Activities</h1>
            <Link to="/add-activity">
                <button>Add New Activity</button>
            </Link>
            <div>
                {activities.map((activity) => (
                    <div key={activity._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                        <p><strong>Date:</strong> {activity.Date}</p>
                        <p><strong>Time:</strong> {activity.Time}</p>
                        <p><strong>Location:</strong> {activity.location}</p>
                        <p><strong>Price: $</strong>{activity.Price}</p>
                        <p><strong>Category:</strong> {activity.Category}</p>
                        <p><strong>Tags:</strong> {activity.Tags.join(', ')}</p>
                        <p><strong>Special Discounts:</strong> {activity.Discount}%</p>
                        <p><strong>Booking Open:</strong> {activity.bookingOpen ? 'Yes' : 'No'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeScreen;