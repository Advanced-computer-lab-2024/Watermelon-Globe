import React, { useEffect, useState } from 'react';
import {useNavigate , Link } from 'react-router-dom';
import '../Components/Navbar.css';
import Navbar from '../Components/Navbar.jsx';


const HomeScreen = () => {
    const [activities, setActivities] = useState([]);
    const [advertisers, setAdvertisers] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch('/api/Activities/getActivitiesNew');
                const data = await response.json();
                setActivities(data.activities);                
                // const advertiserIds = response.data.map(activity => activity.Advertiser);
                // const uniqueAdvertiserIds = [...new Set(advertiserIds)];

                // const advertiserPromises = uniqueAdvertiserIds.map(id => 
                //     axios.get(`profiles/${id}`).catch(error => {
                //         console.error(`Error fetching advertiser with ID ${id}:`, error);
                //         return null;
                //     })
                // );

                // // Wait for all advertiser promises to resolve
                // const advertiserResponses = await Promise.all(advertiserPromises);
                
                // // Filter out null responses and map valid responses to advertiser IDs
                // const advertisersData = advertiserResponses.reduce((acc, res) => {
                //     if (res && res.data) {
                //         acc[res.data._id] = res.data.Name; // Ensure res.data is valid
                //     }
                //     return acc;
                // }, {});

                // setAdvertisers(advertisersData); 

            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };

        fetchActivities();
    }, []);

    const goToItineraries = () => {
        navigate('/itineraries'); // Navigate to the itineraries page
    };

    return (
        <div>

            <Navbar />
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
                    <Link to="/activityDetails">
                <button className='details-new-activity'>
                    Access Activity
                </button>
            </Link>
                </div>
            ))}
            <Link to="/add-activity">
                <button className='add-new-activity'>
                    Add New Activity
                </button>
            </Link>

            <button onClick={goToItineraries}>View Itineraries</button> {/* Button to navigate to itineraries */}

            <div>
                {activities.map((activity) => (
                    <div key={activity._id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
                        <p><strong>Date:</strong> {activity.Date}</p>
                        <p><strong>Time:</strong> {activity.Time}</p>
                        <p><strong>Location:</strong> {activity.location}</p>
                        <p><strong>Price: $</strong>{activity.Price}</p>
                        <p><strong>Category:</strong> {activity.Category}</p>
                        <p><strong>Tags:</strong> {activity.Tags && Array.isArray(activity.Tags) ? activity.Tags.join(', ') : 'No tags available'}</p>
                        <p><strong>Special Discounts:</strong> {activity.Discount}%</p>
                        <p><strong>Booking Open:</strong> {activity.bookingOpen ? 'Yes' : 'No'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeScreen;
