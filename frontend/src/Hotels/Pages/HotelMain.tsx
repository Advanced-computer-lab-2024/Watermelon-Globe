import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  FaHotel,
  FaChevronLeft,
} from "react-icons/fa";
import AccessToken from "../Components/AccessToken";
import HotelSearch from "../Components/HotelSearch";
import TouristNavbar from "../../Tourist/Components/TouristNavBar";

interface Hotel {
  hotelId: string;
  name: string;
  address: { countryCode: string };
  geoCode: { latitude: number; longitude: number };
  distance?: { value: number; unit: string };
  lastUpdate: string;
}

const HotelMain: React.FC = () => {
  const [token, setToken] = useState<string>("");
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const params = useParams();
  const navigate = useNavigate();
  const touristId = params.touristId as string;

  const getHotelDetails = (hotel: Hotel) => {
    return {
      name: hotel.name,
      address: hotel.address.countryCode,
      latitude: hotel.geoCode.latitude,
      longitude: hotel.geoCode.longitude,
      distance: hotel.distance ? `${hotel.distance.value} ${hotel.distance.unit}` : '',
      lastUpdate: hotel.lastUpdate,
    };
  };

  const handleHotelSelect = (hotel: Hotel) => {
    if (hotel.hotelId) {
      setSelectedHotel(hotel);
      navigate(`/HotelBooking/${hotel.hotelId}`);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background p-8" style={{margin: "-20px"}}>
      <TouristNavbar id={touristId} />
      <p>hello</p>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary p-5 relative">
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-full p-2">
                <FaHotel className="h-16 w-16 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Hotel Booking</h1>
                <p className="text-white opacity-75">Find and book your perfect stay</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {!token ? (
              <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
                <h2 className="text-xl font-semibold text-secondary mb-4">Access Token Required</h2>
                <AccessToken setToken={setToken} />
              </div>
            ) : (
              <>
                <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
                  <h2 className="text-xl font-semibold text-secondary mb-4">Search Hotels</h2>
                  <HotelSearch token={token} setHotels={setHotels} hotels={hotels}/>
                </div>

                {hotels?.length > 0 && (
                  <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
                    <h2 className="text-xl font-semibold text-secondary mb-4">Hotel Results</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {hotels.map((hotel) => {
                        const details = getHotelDetails(hotel)
                        return (
                          <div
                            key={hotel.hotelId}
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
                                  className="mt-2 w-full bg-primary text-white font-bold py-2 px-4 rounded hover:bg-hover transition-colors"
                                >
                                  Select
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelMain
