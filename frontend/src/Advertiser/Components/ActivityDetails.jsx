import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Chip } from '@mui/material';

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
    }, [id, profileId]);

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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Activity Details</h1>
            {activity.picture && (
                <div className="mb-4">
                    <strong>Photo: </strong>
                    <img 
                        src={activity.picture} 
                        alt={activity.Name}
                        className="max-w-md rounded-lg shadow-md"
                    />
                </div>
            )}
            <div className="space-y-4">
                <p><strong>Date:</strong> {new Date(activity.Date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {activity.Time}</p>
                <p><strong>Location:</strong> {activity.Location.coordinates.join(', ')}</p>
                <p><strong>Price:</strong> ${activity.Price}</p>
                {activity.Discount && <p><strong>Discount:</strong> {activity.Discount}%</p>}
                <p><strong>Advertiser:</strong> {activity.Advertiser?.Name || 'Unknown Advertiser'}</p>
                
                <div>
                    <p><strong>Tags:</strong> {activity.tags.map(tag => tag.tag).join(', ')}</p>
                </div>

                <div className="flex gap-4 mt-6">
                    {isOwner && (
                        <>
                            <button
                                onClick={() => navigate(`/editActivity/${activity._id}`)}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Edit Activity
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete Activity
                            </button>
                        </>
                    )}
                    <button
                        onClick={() => navigate(`/advertiser`)}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Back to Main Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActivityDetails;

