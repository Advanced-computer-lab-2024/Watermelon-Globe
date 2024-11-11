import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Correct imports for navigation
import AccessToken from '../Components/AccessToken';
import HotelSearch from '../Components/HotelSearch'; // For hotel search functionality
import HotelBooking from '../Components/HotelBooking'; // For booking functionality

const HotelMain = () => {
  const [token, setToken] = useState('');
  const { touristId } = useParams();
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const navigate = useNavigate(); // For navigation to booking page

  // Adjusted function to get hotel details based on the new data structure
  const getHotelDetails = (hotel) => {
    return {
      name: hotel.name,
      address: hotel.address.countryCode, // Using countryCode from the address object
      latitude: hotel.geoCode.latitude,
      longitude: hotel.geoCode.longitude,
      distance: hotel.distance ? `${hotel.distance.value} ${hotel.distance.unit}` : '',
      lastUpdate: hotel.lastUpdate,
    };
  };

  const handleHotelSelect = (hotel) => {
    // When a hotel is clicked, set it as selected and navigate to the booking page
    setSelectedHotel(hotel);
    navigate(`/HotelBooking/${hotel.hotelId}`); // Using hotelId for booking page URL
  };

  return (
    <div className="min-w-full px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Hotel Booking</h1>

      {!token ? (
        <div className="bg-white shadow-md rounded-lg p-6 w-full">
          <h2 className="text-xl font-semibold mb-4">Access Token Required</h2>
          <AccessToken setToken={setToken} />
        </div>
      ) : (
        <>
          <div className="bg-white shadow-md rounded-lg p-6 mb-8 w-full">
            <h2 className="text-xl font-semibold mb-4">Search Hotels</h2>
            <HotelSearch token={token} setHotels={setHotels} />
          </div>

          {hotels?.length > 0 && (
            <div className="bg-white shadow-md rounded-lg p-6 mb-8 w-full">
              <h2 className="text-xl font-semibold mb-4">Hotel Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hotels.map((hotel) => {
                  const details = getHotelDetails(hotel);
                  return (
                    <div
                      key={hotel.hotelId} // Using hotelId as the key for each hotel card
                      className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                      onClick={() => handleHotelSelect(hotel)}
                    >
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{details.name}</h3>
                          <p className="mt-2 text-sm text-gray-600">Address: {details.address}</p>
                          <p className="mt-2 text-sm text-gray-600">Distance: {details.distance}</p>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-gray-600">Last Update: {details.lastUpdate}</p>
                          <button
                            className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                          >
                            Select
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {selectedHotel && (
            <div className="bg-white shadow-md rounded-lg p-6 w-full">
              <h2 className="text-xl font-semibold mb-4">Hotel Booking</h2>
              <HotelBooking hotel={selectedHotel} touristId={touristId} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HotelMain;
