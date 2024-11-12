import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ActivityDetails = () => {
    const { id } = useParams();
    const [activity, setActivity] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await fetch(`/api/Activities/getActivityById/${id}`);
                const data = await response.json();
                setActivity(data);
                console.log("Fetched activity details: ", response.data);
            } catch (error) {
                console.error('Error fetching activity:', error);
            }
        };

        fetchActivity();
    }, [id]);

    if (!activity) {
        return <div>Loading activity...</div>;
    }

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
            <p><strong>Advertiser:</strong> {activity.Advertiser.Name || 'Unknown Advertiser'}</p>
            <p><strong>Tag Types:</strong> {activity.tags.map(tag => tag.type).join(', ')}</p>
            <p><strong>Tag Historical Period:</strong> {activity.tags.map(tag => tag.historicPeriod).join(', ')}</p>
            <button onClick={() => navigate(`/editActivity/${activity._id}`)}>Edit Activity</button>
            <button onClick={() => navigate(`/advertiser`)}>Back to Main Page</button>
        </div>
    );
};

export default ActivityDetails;

