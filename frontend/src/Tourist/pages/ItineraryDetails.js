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
        fetchItinerary();
    }, [id]);



    // Function to handle rating submission
    const handleRate = async () => {
        try {
            const response = await fetch(`/api/updateRating/updateRating/${id}?rating=${rating}`, {
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

    // Share itinerary functionality
    const handleShareLink = () => {
        const itineraryUrl = `${window.location.origin}/ItineraryDetails/${id}`;
        navigator.clipboard.writeText(itineraryUrl)
            .then(() => alert('Itinerary link copied to clipboard!'))
            .catch(err => alert('Failed to copy link: ' + err));
    };

    const handleShareEmail = () => {
        const itineraryUrl = `${window.location.origin}/ItineraryDetails/${id}`;
        const subject = encodeURIComponent('Check out this itinerary!');
        const body = encodeURIComponent(`I thought you might be interested in this itinerary: ${itineraryUrl}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

        // Show loading or error state
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;

    // Render the itinerary details
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

            {/* Share Button */}
            <div className="share-buttons">
                <button onClick={handleShareLink} className="share-button">Copy Link</button>
                <button onClick={handleShareEmail} className="share-button">Share via Email</button>
            </div>
        </div>
    );
};

export default ItineraryDetails;
