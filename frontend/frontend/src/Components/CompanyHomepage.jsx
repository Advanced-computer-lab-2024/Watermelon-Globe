import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Components/Navbar.css';

const HomeScreen = () => {
    const [activities, setActivities] = useState([]);
    const [advertisers, setAdvertisers] = useState({}); // To hold advertiser names

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get('http://localhost:8000/activities');
                setActivities(response.data);

                const advertiserIds = response.data.map(activity => activity.Advertiser);
                const uniqueAdvertiserIds = [...new Set(advertiserIds)];

                const advertiserPromises = uniqueAdvertiserIds.map(id => 
                    axios.get(`http://localhost:8000/profiles/${id}`).catch(error => {
                        console.error(`Error fetching advertiser with ID ${id}:`, error);
                        return null; // Return null on error
                    })
                );

                // Wait for all advertiser promises to resolve
                const advertiserResponses = await Promise.all(advertiserPromises);
                
                // Filter out null responses and map valid responses to advertiser IDs
                const advertisersData = advertiserResponses.reduce((acc, res) => {
                    if (res && res.data) {
                        acc[res.data._id] = res.data.Name; // Ensure res.data is valid
                    }
                    return acc;
                }, {});

                setAdvertisers(advertisersData); 

            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };

        fetchActivities();
    }, []);

    return (
        <div>
            <h1>Activities</h1>
            {activities.map(activity => (
                <div key={activity._id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
                    <h2>{activity.Category}</h2>
                    <p><strong>Date:</strong> {new Date(activity.Date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {activity.Time}</p>
                    <p><strong>Location:</strong> {activity.Location.coordinates.join(', ')}</p>
                    <p><strong>Price:</strong> ${activity.Price}</p>
                    <p><strong>Discount:</strong> {activity.Discount}%</p>
                    <p><strong>Advertiser:</strong> {advertisers[activity.Advertiser] || 'Unknown Advertiser'}</p>
                </div>
            ))}
            <Link to="/add-activity">
                <button className='add-new-activity'>
                    Add New Activity
                </button>
            </Link>
        </div>
    );
};

export default HomeScreen;
