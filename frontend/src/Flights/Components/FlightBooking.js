import React, { useState } from 'react';
import { bookFlight } from '../api';

const FlightBooking = ({ flight, token }) => {
  const [passengerName, setPassengerName] = useState('');

  const handleBooking = async () => {
    const bookingDetails = await bookFlight(token, flight.id, passengerName);
    alert(`Flight booked for ${passengerName}. Booking ID: ${bookingDetails.id}`);
  };

  if (!flight) return <div>Select a flight to book.</div>;

  return (
    <div>
      <h3>Booking: {flight.validatingAirlineCodes[0]}</h3>
      <p>Flight: {flight.itineraries[0]?.segments[0]?.carrierCode} {flight.itineraries[0]?.segments[0]?.number}</p>
      <input
        type="text"
        placeholder="Passenger Name"
        onChange={(e) => setPassengerName(e.target.value)}
      />
      <button onClick={handleBooking}>Book Flight</button>
    </div>
  );
};

export default FlightBooking;
