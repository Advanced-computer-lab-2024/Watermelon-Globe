// Components/BookingPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // For navigation and accessing URL params
import { getHotelOffersById } from '../api'; // Function to fetch hotel details by ID

const BookingPage = ({ token }) => {
    const { hotelId } = useParams(); // Get hotel ID from the URL
    const [hotelDetails, setHotelDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHotelDetails = async () => {
            try {
                const details = await getHotelOffersById(token, hotelId);
                setHotelDetails(details);
            } catch (err) {
                setError('Failed to load hotel details. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchHotelDetails();
    }, [hotelId, token]);

    const handleBooking = () => {
        // Implement booking logic here
        console.log('Booking confirmed!');
        // Optionally, redirect to a confirmation page
        navigate('/confirmation');
    };

    return (
        <div className="booking-container">
            {loading ? (
                <p>Loading hotel details...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                hotelDetails && (
                    <div>
                        <h2>{hotelDetails.name}</h2>
                        <p>{hotelDetails.location}</p>
                        <p>{hotelDetails.price} {hotelDetails.currency}</p>
                        <button onClick={handleBooking}>Book Now</button>
                    </div>
                )
            )}
        </div>
    );
};

export default BookingPage;
