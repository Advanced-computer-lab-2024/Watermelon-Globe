// Components/FlightSearch.js
import React, { useState } from 'react';
import { searchFlights } from '../api';

const FlightSearch = ({ token, setFlights }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleSearch = async () => {
    // Check if all required fields are filled
    if (!origin || !destination || !departureDate) {
      alert('Please fill in the origin, destination, and departure date.');
      return;
    }

    try {
      const flights = await searchFlights(token, origin, destination, departureDate, returnDate);
      setFlights(flights);
    } catch (error) {
      console.error('Error fetching flight offers:', error);
    }
  };

  return (
    <div>
      <h3>Search Flights</h3>
      <input placeholder="Origin" value={origin} onChange={(e) => setOrigin(e.target.value)} />
      <input placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
      <input placeholder="Departure Date" type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
      <input placeholder="Return Date" type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default FlightSearch;
