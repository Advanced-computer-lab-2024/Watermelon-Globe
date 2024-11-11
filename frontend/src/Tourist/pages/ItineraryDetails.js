import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ItineraryDetails.css';

const ItineraryDetails = ({ itinerary: propItinerary }) => {
    const { id } = useParams();
    const [itinerary, setItinerary] = useState(propItinerary || null);
    const [loading, setLoading] = useState(!propItinerary);
    const [error, setError] = useState(null);
    const [rating, setRating] = useState(0);

    const fetchItinerary = async () => {
        try {
            const response = await fetch(`/api/Itinerary/getItinerary/${id}`);
            if (!response.ok) {
                throw new Error('Itinerary not found');
            }
            const data = await response.json();
            setItinerary(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!propItinerary) {
            fetchItinerary();
        }
    }, [id, propItinerary]);

    // Function to handle rating submission
    const handleRate = async () => {
        try {
            const response = await fetch(`/api/Itinerary/updateRating/${id}?rating=${rating}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                console.log(response.status, response.statusText);
                throw new Error('Failed to submit rating');
            }
            alert('Rating submitted successfully!');
            fetchItinerary(); // Refresh the itinerary after rating
        } catch (error) {
            console.error('Error submitting rating:', error);
            alert('Failed to submit rating. Please try again.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Render the itinerary details with conditional checks for each property
    return (
        <div className="itinerary-details">
            <h2>{itinerary?.name || 'Itinerary'}</h2>
            <h3>Activities</h3>
            <ul>
                {itinerary?.activities?.map((activity) => (
                    <li key={activity.activityName}>
                        {activity.activityName} - {activity.duration}
                    </li>
                )) || <p>No activities available</p>}
            </ul>
            <h3>Locations</h3>
            <p>{itinerary?.locations ? itinerary.locations.join(', ') : 'No locations available'}</p>
            <h3>Timeline</h3>
            <p>{itinerary?.timeline || 'No timeline available'}</p>
            <h3>Language of Tour</h3>
            <p>{itinerary?.languageOfTour || 'No language specified'}</p>
            <h3>Price</h3>
            <p>${itinerary?.priceOfTour || 'Price not available'}</p>
            <h3>Available Dates</h3>
            <ul>
                {itinerary?.availableDates?.map((date) => (
                    <li key={date}>{new Date(date).toLocaleDateString()}</li>
                )) || <p>No available dates</p>}
            </ul>
            <h3>Available Times</h3>
            <ul>
                {itinerary?.availableTimes?.map((time) => (
                    <li key={time}>{time}</li>
                )) || <p>No available times</p>}
            </ul>
            <h3>Accessibility</h3>
            <p>{itinerary?.accessibility ? 'Yes' : 'No'}</p>
            <h3>Pickup/Drop-off Locations</h3>
            <ul>
                {itinerary?.pickupDropoffLocations?.map((location, index) => (
                    <li key={index}>
                        Pickup: {location.pickup}, Drop-off: {location.dropoff}
                    </li>
                )) || <p>No pickup/drop-off locations available</p>}
            </ul>
            <h3>Bookings Available</h3>
            <p>{itinerary?.bookings ? 'Yes' : 'No'}</p>

            <h3>Average Rating</h3>
            <p>{itinerary?.rating || 'No ratings yet'}</p>
            
            <h3>Rate this Itinerary</h3>
            <div className="rating-container">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                        key={star}
                        className={`star ${rating >= star ? 'filled' : ''}`}
                        onClick={() => setRating(star)}
                    >
                        ★
                    </span>
                ))}
            </div>
            <button onClick={handleRate} className="rate-button">Submit Rating</button>
        </div>
    );
};

export default ItineraryDetails;
