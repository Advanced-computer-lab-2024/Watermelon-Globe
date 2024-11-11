import React, { useState } from 'react';
import axios from 'axios';

const FlightBooking = ({ flight, touristId }) => {
  const [message, setMessage] = useState('');
  

  const handleBookFlight = async () => {
    try {

      const segments = flight.itineraries[0]?.segments || [];
    const firstSegment = segments[0] || {};
    const secondSegment = segments[1] || {};

    
      // Sending POST request to the correct backend route
      const response = await axios.post(`/api/Tourist/bookFlight/${touristId}`, {
        airline: flight.validatingAirlineCodes[0],
      flightNumber1: firstSegment?.carrierCode + firstSegment?.number,
      departure1: firstSegment?.departure?.at,
      arrival1: firstSegment?.arrival?.at,
      flightNumber2: secondSegment?.carrierCode + secondSegment?.number,
      departure2: secondSegment?.departure?.at,
      arrival2: secondSegment?.arrival?.at,
      price: flight.price?.grandTotal,
      currency: flight.price?.currency,
      });
      const response2 = await axios.put(`/api/Tourist/updateLoyaltyPoints/${touristId}`, {
        amountPaid: flight.price?.grandTotal
      });

      // Display success message upon successful booking
      setMessage('You have successfully booked your flight!');
    } catch (error) {
      console.error('Error booking flight:', error);
      setMessage('Sorry, there was an issue booking your flight. Please try again.');
    }
  };

  if (!flight) return <div>Select a flight to book.</div>;

  return (
    <div>
      <h3>Booking: {flight.validatingAirlineCodes[0]}</h3>
      <p>Flight: {flight.itineraries[0]?.segments[0]?.carrierCode} {flight.itineraries[0]?.segments[0]?.number}</p>
      <button onClick={handleBookFlight}>Book Flight</button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default FlightBooking;
