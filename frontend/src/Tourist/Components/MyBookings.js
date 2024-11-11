import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MyBookings = () => {
  const [hotelBookings, setHotelBookings] = useState([]);
  const { touristId } = useParams();
  const [flightBookings, setFlightBookings] = useState([]);
  const [error, setError] = useState('');

  // Fetch hotel bookings
  const fetchHotelBookings = async () => {
    try {
      const response = await axios.get(`/api/Tourist/getHotelBookingsByTouristId/${touristId}`);
      setHotelBookings(response.data.bookings);
    } catch (err) {
      setError('Failed to fetch hotel bookings.');
    }
  };

  // Fetch flight bookings
  const fetchFlightBookings = async () => {
    try {
      const response = await axios.get(`/api/Tourist/getFlightBookingsByTouristId/${touristId}`);
      setFlightBookings(response.data.bookings);
    } catch (err) {
      setError('Failed to fetch flight bookings.');
    }
  };

  useEffect(() => {
    if (touristId) {
      fetchHotelBookings();
      fetchFlightBookings();
    }
  }, [touristId]);

  return (
    <div className="my-bookings-page p-8 max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">My Bookings</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Hotel Bookings Section */}
      <div className="booking-section mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Hotel Bookings</h2>
        {hotelBookings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotelBookings.map((booking) => (
              <div key={booking._id} className="booking-card p-4 border rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                <p className="text-lg font-semibold text-gray-700">{`Hotel: ${booking.hotelId} | Room: ${booking.roomType}`}</p>
                <p className="text-gray-600">{`Price: ${booking.currency} ${booking.price}`}</p>
                <p className="text-gray-600">{`Check-in: ${new Date(booking.checkInDate).toLocaleDateString()}`}</p>
                <p className="text-gray-600">{`Check-out: ${new Date(booking.checkOutDate).toLocaleDateString()}`}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No hotel bookings found.</p>
        )}
      </div>

      {/* Flight Bookings Section */}
      <div className="booking-section">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Flight Bookings</h2>
        {flightBookings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {flightBookings.map((booking) => (
              <div key={booking._id} className="booking-card p-4 border rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                <p className="text-lg font-semibold text-gray-700">{`Flight: ${booking.flightNumber1} | Airline: ${booking.airline}`}</p>
                <p className="text-gray-600">{`Price: ${booking.currency} ${booking.price}`}</p>
                <p className="text-gray-600">{`Departure: ${new Date(booking.departure1).toLocaleString()}`}</p>
                <p className="text-gray-600">{`Arrival: ${new Date(booking.arrival1).toLocaleString()}`}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No flight bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
