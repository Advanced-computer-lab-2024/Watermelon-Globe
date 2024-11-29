import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ActivityDetails = () => {
    const { id, profileId } = useParams();
    const [activity, setActivity] = useState(null);
    const [advertiser, setAdvertiser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await fetch(`/api/Activities/getActivityById/${id}`);
                const data = await response.json();
                setActivity(data);
            } catch (error) {
                console.error('Error fetching activity:', error);
            }
        };

        const fetchAdvertiser = async () => {
            try {
                const response = await axios.get(`/api/Advertiser/profiles/${profileId}`); 
                setAdvertiser(response.data);
            } catch (error) {
                console.error('Error fetching advertiser:', error);
            }
        }

        fetchActivity();
        fetchAdvertiser();
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this activity?");
        if (!confirmDelete) return;

        try {
        await axios.delete(`/api/Activities/deleteActivity/${id}`);
        alert("Activity deleted successfully!");
        navigate('/advertiser');
        } catch (error) {
        console.error('Error deleting activity:', error);
        alert('Error deleting activity');
        }
    }

    if (!activity || !advertiser) {
        return <div>Loading...</div>;
    }

    const isOwner = activity.Advertiser._id === advertiser._id;

    return (
        <div>
            <h1><strong>Activity Details</strong></h1>
            {/* <h2>{activity.Category}</h2> */}
            <p><strong>Date:</strong> {new Date(activity.Date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {activity.Time}</p>
            <p><strong>Location:</strong> {activity.Location.coordinates.join(', ')}</p>
            <p><strong>Price:</strong> ${activity.Price}</p>
            {activity.priceRange && (
                <p><strong>Price Range:</strong> {activity.priceRange.join(' - ')}</p>
            )}
            <p><strong>Discount:</strong> {activity.Discount}%</p>
            <p><strong>Advertiser:</strong> {activity.Advertiser?.Name|| 'Unknown Advertiser'}</p>
            <p><strong>Tag Types:</strong> {activity.tags.map(tag => tag.type).join(', ')}</p>
            <p><strong>Tag Historical Period:</strong> {activity.tags.map(tag => tag.historicPeriod).join(', ')}</p>
            {/* <button onClick={() => navigate(`/editActivity/${activity._id}`)}>Edit Activity</button> */}
            {isOwner && (
                <div>
                    <button onClick={() => navigate(`/editActivity/${activity._id}`)}>Edit Activity</button>
                    <button onClick={handleDelete}>Delete Activity</button>
                </div>
            )}  
            <button onClick={() => navigate(`/advertiser`)}>Back to Main Page</button>
        </div>
    );
};

export default ActivityDetails;