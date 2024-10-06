import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const HomeScreen = () => {
    const [activities, setActivities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get('http://localhost:8000/activities');
                setActivities(response.data);
                console.log("Fetched activities: ", response.data);
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };

        fetchActivities();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this activity?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8000/deleteActivity/${id}`);
                setActivities(prevActivities => prevActivities.filter(activity => activity._id !== id));
                alert('Activity deleted successfully');
            } catch (error) {
                console.error('Error deleting activity:', error);
                alert('Error deleting activity');
            }
        }
    };

    return (
        <div>
            <h1>Activities</h1>
            {activities.map(activity => (
                <div key={activity._id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
                    <h2>{activity.Name}</h2>
                    <p><strong>Category: </strong>{activity.Category}</p>
                    <p><strong>Date:</strong> {new Date(activity.Date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {activity.Time}</p>
                    <p><strong>Location:</strong> {activity.Location.coordinates.join(', ')}</p>
                    <p><strong>Price:</strong> ${activity.Price}</p>
                    <p><strong>Discount:</strong> {activity.Discount}%</p>
                    <p><strong>Advertiser:</strong> {activity.Advertiser?.Name || 'Unknown Advertiser'}</p>
                    <p><strong>Tag Types:</strong> {activity.tags.map(tag => tag.type).join(', ')}</p> {/* Displaying tags */}
                    <p><strong>Tag Historical Period:</strong> {activity.tags.map(tag => tag.historicPeriod).join(', ')}</p> {/* Displaying tags */}
                    <button onClick={() => navigate(`/activity/${activity._id}`)}>View Details</button>
                    <button onClick={() => navigate(`/edit-activity/${activity._id}`)}>Edit Activity</button>
                    <button onClick={() => handleDelete(activity._id)}>Delete Activity</button>
                </div>
            ))}

            <Link to="/add-activity">
                <button className='add-new-activity'>Add New Activity</button>
            </Link>
        </div>
    );
};

export default HomeScreen;
