'use client'

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHotelIdsByCity } from '../api';
import { FaSearch } from 'react-icons/fa';

interface HotelSearchProps {
  token: string;
  setHotels: React.Dispatch<React.SetStateAction<any[]>>;
  hotels: any[]; // Adding hotels prop to the interface
  touristId: string;
}

interface Hotel {
  id: string;
  name?: string;
  location?: string;
  distance?: string;
  longitude?: number;
  latitude?: number;
}

const HotelSearch: React.FC<HotelSearchProps> = ({ token, setHotels, hotels , touristId }) => {
  const [cityCode, setCityCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    console.log(cityCode);
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
    navigate(`/HotelOffers/${hotelId}/${touristId}/${hotelName || 'UnnamedHotel'}`);
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
    </div>
  );
};

export default HotelSearch;
