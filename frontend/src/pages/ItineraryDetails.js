import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ItineraryDetails.css';


const ItineraryDetails = () => {
    const { id } = useParams(); // Get the id from the URL
    const [itinerary, setItinerary] = useState(null); // State to hold itinerary data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error messages
    const [rating, setRating] = useState(0); // State to hold user rating

    const fetchItinerary = async () => {
        try {
            const response = await fetch(`/getItinerary/${id}`);
            if (!response.ok) {
                throw new Error('Itinerary not found');
            }
            const data = await response.json();
            setItinerary(data); // Set the fetched itinerary data
        } catch (error) {
            setError(error.message); // Set the error message if the fetch fails
        } finally {
            setLoading(false); // Set loading to false when done
        }
    };
    useEffect(() => {
       

        fetchItinerary();
    }, [id]);

    // Show loading or error state
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Function to handle rating submission
    const handleRate = async () => {
        try {
            const response = await fetch(`/updateRating/${id}?rating=${rating}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to submit rating');
            }
            alert('Rating submitted successfully!');
        } catch (error) {
            console.error('Error submitting rating:', error);
            alert('Failed to submit rating. Please try again.');
        }
        fetchItinerary();
    };

    // Render the itinerary details
    return (
        <div className="itinerary-details">
            <h2>{itinerary.name}</h2>
            <h3>Activities</h3>
            <ul>
                {itinerary.activities.map((activity) => (
                    <li key={activity.activityName}>
                        {activity.activityName} - {activity.duration}
                    </li>
                ))}
            </ul>
            <h3>Locations</h3>
            <p>{itinerary.locations.join(', ')}</p>
            <h3>Timeline</h3>
            <p>{itinerary.timeline}</p>
            <h3>Language of Tour</h3>
            <p>{itinerary.languageOfTour}</p>
            <h3>Price</h3>
            <p>${itinerary.priceOfTour}</p>
            <h3>Available Dates</h3>
            <ul>
                {itinerary.availableDates.map((date) => (
                    <li key={date}>{new Date(date).toLocaleDateString()}</li> // Format the date
                ))}
            </ul>
            <h3>Available Times</h3>
            <ul>
                {itinerary.availableTimes.map((time) => (
                    <li key={time}>{time}</li>
                ))}
            </ul>
            <h3>Accessibility</h3>
            <p>{itinerary.accessibility ? 'Yes' : 'No'}</p>
            <h3>Pickup/Drop-off Locations</h3>
            <ul>
                {itinerary.pickupDropoffLocations.map((location, index) => (
                    <li key={index}>
                        Pickup: {location.pickup}, Drop-off: {location.dropoff}
                    </li>
                ))}
            </ul>
            <h3>Bookings Available</h3>
            <p>{itinerary.bookings ? 'Yes' : 'No'}</p>

            <h3>Average Rating</h3>
            <p>{itinerary.rating}</p>
            
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
