import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import './HomeScreen.css';

const HomeScreen = () => {
    const [activities, setActivities] = useState([]);
    const [advertiser, setAdvertiser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdvertiser = async () => {
            try {
                const response = await axios.get('/api/Advertiser/lastApprovedAdvertiser');
                setAdvertiser(response.data);
            } catch (error) {
                console.error('Error fetching advertiser profile: ', error);
            }
        };

        const fetchActivities = async () => {
            try {
                const activities = await axios.get('/api/Activities/activities');
                setActivities(activities.data);
            } catch (error) {
                console.error('Error fetching activities', error);
            }
        };

        fetchAdvertiser();
        fetchActivities();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this activity?');
        if (confirmDelete) {
            try {
                await axios.delete(`/api/Activities/deleteActivity/${id}`);
                setActivities(prevActivities => prevActivities.filter(activity => activity._id !== id));
                alert('Activity deleted successfully');
            } catch (error) {
                console.error('Error deleting activity:', error);
                alert('Error deleting activity');
            }
        }
    };

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm('Are you sure you want to delete your account? This action is irreversible.');
        if (confirmed) {
            try {
                
                const response = await fetch(`/api/Advertiser/requestDeletionAdvertiser/670646ffa799826e8ac9fd1a`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    alert('Your account has been successfully deleted.');
                    navigate('/'); // Redirect to home or login after deletion
                } else {
                    alert('Failed to delete account. Please try again.');
                }
            } catch (error) {
                console.error('Error deleting account:', error);
                alert('An error occurred while trying to delete the account.');
            }
        }
    };

    return (
        <div className="home-screen">
            {/* Sidebar Component */}
            {advertiser && (
                <Sidebar
                    advertiserId={advertiser._id}
                    advertiser={advertiser}
                    onProfileView={() => navigate(`/advertiserProfile/${advertiser._id}`)}
                    onCreateActivity={() => navigate(`/add-activity/${advertiser._id}`)}
                // ChangePassword={() => navigate('/changeAdvertiserPassword')}
                />
            )}

            <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 mb-4 text-white rounded-md transition duration-200"
                style={{ backgroundColor: 'rgb(220, 38, 38)', hover: { backgroundColor: 'rgb(185, 28, 28)' } }}
            >
                Delete Account
            </button>

            {/* Main Content */}
            <div className="main-content">
                <h1>Activities</h1>
                {activities.map(activity => (
                    <div key={activity._id} className="activity-card">
                        <h2>{activity.Name}</h2>
                        <p><strong>Date:</strong> {new Date(activity.Date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {activity.Time}</p>
                        <p><strong>Location:</strong> {activity.Location.coordinates.join(', ')}</p>
                        <p><strong>Price:</strong> ${activity.Price}</p>
                        <p><strong>Discount:</strong> {activity.Discount}%</p>
                        <p><strong>Advertiser:</strong> {activity.Advertiser?.Name || 'Unknown Advertiser'}</p>

                        <button onClick={() => navigate(`/activityDetails/${activity._id}`)}>View Details</button>

                        {advertiser && activity.Advertiser?._id === advertiser._id && (
                            <>
                                <button onClick={() => navigate(`/editActivity/${activity._id}`)}>Edit Activity</button>
                                <button onClick={() => handleDelete(activity._id)}>Delete Activity</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeScreen;