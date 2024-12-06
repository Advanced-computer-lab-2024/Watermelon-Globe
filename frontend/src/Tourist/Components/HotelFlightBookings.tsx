import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

type HotelBooking = {
  _id: string;
  hotelId: string;
  roomType: string;
  price: number;
  currency: string;
  checkInDate: string;
  checkOutDate: string;
};

type FlightBooking = {
  _id: string;
  flightNumber1: string;
  airline: string;
  price: number;
  currency: string;
  departure1: string;
  arrival1: string;
};

const BookingsPage = () => {
  const { touristId } = useParams<{ touristId: string }>();
  const [hotelBookings, setHotelBookings] = useState<HotelBooking[]>([]);
  const [flightBookings, setFlightBookings] = useState<FlightBooking[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchHotelBookings = async () => {
    try {
      const response = await axios.get(`/api/Tourist/getHotelBookingsByTouristId/${touristId}`);
      setHotelBookings(response.data.bookings);
    } catch (err) {
      setError('Failed to fetch hotel bookings.');
    }
  };

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
    } else {
      setError('Tourist ID is missing.');
    }
  }, [touristId]);

  return (
    <div className="p-8 bg-gradient-to-r from-primary/10 to-secondary/10" style={{ margin: '-20px' }}>
      <h1 className="text-4xl font-bold text-center text-primary mb-8 shadow-md bg-lightGray rounded-lg p-4">
        My Bookings
      </h1>

      {/* Hotel Bookings Section */}
      <div className="booking-section mb-16">
        <h2 className="text-3xl font-semibold text-secondary mb-6">Hotel Bookings</h2>
        {hotelBookings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotelBookings.map((booking) => (
              <div key={booking._id} className="booking-card p-6 border rounded-lg shadow-lg bg-cardBackground hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                <p className="text-lg font-semibold text-primary">{`Hotel: ${booking.hotelId}`}</p>
                <p className="text-lg font-semibold text-primary mb-2">{`Room: ${booking.roomType}`}</p>
                <p className="text-grayText">{`Price: ${booking.currency} ${booking.price}`}</p>
                <p className="text-gray-600">{`Check-in: ${new Date(booking.checkInDate).toLocaleDateString()}`}</p>
                <p className="text-gray-600">{`Check-out: ${new Date(booking.checkOutDate).toLocaleDateString()}`}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-black">No hotel bookings found.</p>
        )}
      </div>

      {/* Flight Bookings Section */}
      <div className="booking-section">
        <h2 className="text-3xl font-semibold text-secondary mb-6">Flight Bookings</h2>
        {flightBookings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {flightBookings.map((booking) => (
              <div key={booking._id} className="booking-card p-6 border rounded-lg shadow-lg bg-cardBackground hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                <p className="text-lg font-semibold text-primary mb-2">{`Flight: ${booking.flightNumber1} | Airline: ${booking.airline}`}</p>
                <p className="text-grayText">{`Price: ${booking.currency} ${booking.price}`}</p>
                <p className="text-gray-600">{`Departure: ${new Date(booking.departure1).toLocaleString()}`}</p>
                <p className="text-gray-600">{`Arrival: ${new Date(booking.arrival1).toLocaleString()}`}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No flight bookings found.</p>
        )}
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default BookingsPage;
