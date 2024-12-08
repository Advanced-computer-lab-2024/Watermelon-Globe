'use client'

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHotelIdsByCity } from '../api';
import { FaSearch } from 'react-icons/fa';

interface HotelSearchProps {
  token: string;
  setHotels: React.Dispatch<React.SetStateAction<any[]>>;
  hotels: any[]; // Adding hotels prop to the interface
}

interface Hotel {
  hotelId: string;
  name?: string;
  location?: string;
  distance?: string;
  longitude?: number;
  latitude?: number;
}

const HotelSearch: React.FC<HotelSearchProps> = ({ token, setHotels, hotels }) => {
  const [cityCode, setCityCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const hotelData: Hotel[] = await getHotelIdsByCity(token, cityCode);
      console.log('Hotel data:', hotelData);
      setHotels(hotelData);
    } catch (err) {
      setError('Failed to fetch hotels. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleHotelClick = (hotelId: string, hotelName: string | undefined) => {
    navigate(`/HotelOffers/${hotelId}/${hotelName || 'UnnamedHotel'}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Enter city code (e.g., NYC)"
          value={cityCode}
          onChange={(e) => setCityCode(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary transition-colors"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondaryHover transition-colors flex items-center"
        >
          <FaSearch className="mr-2" />
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="hotel-list space-y-4">
        {hotels?.length > 0 ? (
          hotels.map((hotel: Hotel) => {
            const {
              hotelId,
              name = 'No name available',
              location = 'Location not available',
              distance = 'Distance not available',
              latitude = 'Latitude not available',
              longitude = 'Longitude not available',
            } = hotel;

            return (
              <div
                key={hotelId}
                className="border rounded-md p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleHotelClick(hotelId, name)}
              >
                <h4 className="font-bold text-lg">{name}</h4>
                <p className="text-gray-700">
                  <strong>Location:</strong> {location}
                </p>
                <p className="text-gray-700">
                  <strong>Distance:</strong> {distance}
                </p>
                <p className="text-gray-700">
                  <strong>Coordinates:</strong> {latitude}, {longitude}
                </p>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">No hotels found. Please search for a city.</p>
        )}
      </div>
    </div>
  );
};

export default HotelSearch;
