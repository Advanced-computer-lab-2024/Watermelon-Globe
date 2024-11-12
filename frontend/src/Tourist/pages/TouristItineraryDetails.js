import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ItineraryDetails.css';

const TouristItineraryDetails = () => {
    const { id } = useParams(); // ID for ChildItinerary
    const [childItinerary, setChildItinerary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchChildItinerary = async () => {
        try {
            const response = await fetch(`/api/TouristItinerary/getChildItinerary/${id}`);
            if (!response.ok) {
                throw new Error('Child itinerary not found');
            }
            const data = await response.json();
            setChildItinerary(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChildItinerary();
    }, [id]);


    useEffect(() => {
        console.log("Child Itinerary Data:", childItinerary); // Check the data structure here
    }, [childItinerary]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const { itinerary, chosenDates, chosenTimes, totalPrice, status, completed } = childItinerary;

    return (
        <div className="itinerary-details">
            <h2>Child Itinerary Details</h2>
            <h3>Parent Itinerary: {itinerary?.name}</h3>

            <h3>Activities</h3>
            <ul>
                {itinerary?.activities.map((activity, index) => (
                    <li key={index}>
                        {activity.activityName} - {activity.duration}
                    </li>
                ))}
            </ul>

            <h3>Locations</h3>
            <p>{itinerary?.locations.join(', ')}</p>

            <h3>Chosen Dates</h3>
            <ul>
                {chosenDates.map((date, index) => (
                    <li key={index}>{new Date(date).toLocaleDateString()}</li>
                ))}
            </ul>

            <h3>Chosen Times</h3>
            <ul>
                {chosenTimes.map((time, index) => (
                    <li key={index}>{time}</li>
                ))}
            </ul>

            <h3>Total Price</h3>
            <p>${totalPrice}</p>

            <h3>Status</h3>
            <p>{status}</p>

            <h3>Completed</h3>
            <p>{completed ? 'Yes' : 'No'}</p>
        </div>
    );
};

export default TouristItineraryDetails;
