import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import './HomeScreen.css';

const HomeScreen = () => {
    const [activities, setActivities] = useState ([]);
    const [advertiser, setAdvertiser] = useState (null);
    const navigate = useNavigate();

    useEffect (() => {
        const fetchAdvertiser = async () => {
            try{
                const response = await axios.get('/api/Advertiser/lastApprovedAdvertiser');
                setAdvertiser(response.data);
            } catch(error){
                console.error('Error fetching advertiser profile: ', error);
            }
        };

        const fetchActivities = async () => {
            try{
                const activities = await axios.get('/api/Activities/activities');
                setActivities(activities.data);
            }catch (error){
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
                await axios.delete(`http://localhost:8000/api/Activities/deleteActivity/${id}`);
                setActivities(prevActivities => prevActivities.filter(activity => activity._id !== id));
                alert('Activity deleted successfully');
            } catch (error) {
                console.error('Error deleting activity:', error);
                alert('Error deleting activity');
            }
        }
    };

    return (
        <div className="home-screen">
            {/* Sidebar Component */}
            {advertiser && (
                <Sidebar 
                    advertiserId = {advertiser._id}
                    advertiser={advertiser} 
                    onProfileView={() => navigate(`/advertiserProfile/${advertiser._id}`)}
                    onCreateActivity={() => navigate(`/add-activity/${advertiser._id}`)}
                    // ChangePassword={() => navigate('/changeAdvertiserPassword')}
                />
            )}

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