import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // For retrieving the hotelId from URL params
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'; // Make sure to import axios for API calls
import { fetchAccessToken } from '../api'; // Import the getAccessToken function

const BookingPage = () => {
  const { hotelId, touristId } = useParams(); // Retrieve hotelId from URL parameters

  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [adults, setAdults] = useState(1);
  const [roomQuantity, setRoomQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(''); // State to hold the access token
  const [hotelOffer, setHotelOffer] = useState(null); // Store hotel offer data

  useEffect(() => {
    // Fetch access token when component mounts
    const fetchToken = async () => {
      try {
        const fetchedToken = await fetchAccessToken();
        setToken(fetchedToken); // Store the token in state
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchToken();

    // Fetch hotel data from your API or directly from Amadeus API
    const fetchHotelOffer = async () => {
      try {
        const response = await axios.get(`/api/hotel/${hotelId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHotelOffer(response.data); // Assume response contains hotel data
      } catch (error) {
        console.error('Error fetching hotel offer:', error);
      }
    };

    if (token) {
      fetchHotelOffer();
    }
  }, [hotelId, token]); // Run only when hotelId or token changes

  const handleBookHotel = async () => {
    try {
      if (!hotelOffer) {
        setMessage('Hotel offer not available');
        return;
      }

      const hotelDetails = hotelOffer.hotel || {};
      const hotelName = hotelDetails?.name;
      const address = hotelDetails?.address?.line;
      const price = hotelOffer?.price?.totalAmount;
      const currency = hotelOffer?.price?.currency;

      // Sending POST request to the correct backend route
      const response = await axios.post(`/api/Tourist/bookHotel/${touristId}`, {
        hotelId: hotelId,
        hotelName: hotelName,
        address: address,
        price: price,
        currency: currency,
        checkInDate: checkInDate.toISOString().split('T')[0],
        checkOutDate: checkOutDate.toISOString().split('T')[0],
        adults: adults,
        roomQuantity: roomQuantity,
      });

      // Display success message upon successful booking
      setMessage('You have successfully booked your hotel!');
    } catch (error) {
      console.error('Error booking hotel:', error);
      setMessage('Sorry, there was an issue booking your hotel. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <h3>Book Hotel</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <DatePicker
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Check-In Date"
          className="w-full p-3 border rounded"
        />
        <DatePicker
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Check-Out Date"
          className="w-full p-3 border rounded"
        />
      </div>
      <input
        type="number"
        placeholder="Adults"
        value={adults}
        min="1"
        onChange={(e) => setAdults(e.target.value)}
        className="w-full p-3 border rounded mb-4"
      />
      <input
        type="number"
        placeholder="Rooms"
        value={roomQuantity}
        min="1"
        onChange={(e) => setRoomQuantity(e.target.value)}
        className="w-full p-3 border rounded mb-4"
      />
      <button
        onClick={handleBookHotel}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Book Hotel
      </button>
      {message && <p className="mt-4">{message}</p>}
      {hotelOffer && (
        <div className="mt-4">
          <h4>Hotel Details:</h4>
          <p><strong>Hotel Name:</strong> {hotelOffer.hotel?.name}</p>
          <p><strong>Address:</strong> {hotelOffer.hotel?.address?.line}</p>
          <p><strong>Price:</strong> {hotelOffer.price?.totalAmount} {hotelOffer.price?.currency}</p>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
