import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { fetchAccessToken, getHotelOffersById } from '../api';

const BookingPage = () => {
  const { hotelId, touristId } = useParams();

  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [adults, setAdults] = useState(1);
  const [roomQuantity, setRoomQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const [hotelOffers, setHotelOffers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const fetchedToken = await fetchAccessToken();
        setToken(fetchedToken);
      } catch (error) {
        console.error('Error fetching access token:', error);
        setMessage('Error fetching access token');
      }
    };

    fetchToken();
  }, []);

  const handleSearchClick = async () => {
    if (!token) {
      setMessage('Error: Access token is missing.');
      return;
    }

    setLoading(true);
    setMessage('');
    setHotelOffers([]); // Reset before making a new request

    try {
      const formattedCheckInDate = checkInDate.toISOString().split('T')[0];
      const formattedCheckOutDate = checkOutDate.toISOString().split('T')[0];

      const response = await getHotelOffersById({
        token,
        hotelId: [hotelId],
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        adults: parseInt(adults, 10),
        roomQuantity: parseInt(roomQuantity, 10),
        currency: 'USD',
      });

      console.log("Hotel Offers:", response);

      // Assuming response.data contains offers directly
      if (response && response[0] && response[0].offers && response[0].offers.length > 0) {
        setHotelOffers(response[0].offers); // Correctly set the offers from the response
      } else {
        setMessage('No offers found for the selected dates and parameters.');
      }
    } catch (error) {
      console.error('Error fetching hotel offers:', error);
      setMessage('Failed to fetch hotel offers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = async (offer) => {
    const { roomType, price, currency, checkInDate, checkOutDate } = offer;



    try {
      const response = await axios.post(`/api/Tourist/bookHotel/${touristId}`, {
        hotelId,
        roomType: offer?.room?.description?.text,
        price: offer?.price?.base,
        currency: offer?.price?.currency,
        checkInDate,
        checkOutDate,
      });

      const response2 = await axios.put(`/api/Tourist/updateLoyaltyPoints/${touristId}`, {
        amountPaid: offer?.price?.base
      });



      console.log('Booking successful:', response.data);
      alert(`Booking successful!\nLoyalty Points: ${response2.data.loyaltyPoints}\nBadge: ${response2.data.badge}`);
    } catch (error) {
      console.error('Error booking hotel:', error);
      alert('Booking failed. Please try again.');
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
        onClick={handleSearchClick}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search Offers
      </button>
      {loading && <p className="mt-4">Loading offers...</p>}
      {message && <p className="mt-4">{message}</p>}

      {hotelOffers.length > 0 ? (
        <div className="mt-4">
          <h4>Hotel Offers:</h4>
          {hotelOffers.map((offer, index) => (
            <div key={index} className="border p-4 mb-4">
              <h5>Hotel: {offer?.hotel?.name}</h5>
              <p><strong>Price:</strong> {offer?.price?.base} {offer?.price?.currency}</p>
              <p><strong>Check-In Date:</strong> {offer?.checkInDate}</p>
              <p><strong>Check-Out Date:</strong> {offer?.checkOutDate}</p>
              <p><strong>Room Type:</strong> {offer?.room?.description?.text}</p>
              <button
                onClick={() => handleBookClick(offer)}
                className="bg-green-600 text-white px-4 py-2 rounded mt-4"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No hotel offers available.</p>
      )}
    </div>
  );
};

export default BookingPage;
