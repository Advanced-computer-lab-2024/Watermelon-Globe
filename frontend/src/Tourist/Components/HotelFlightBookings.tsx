import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TouristNavbar from "../Components/TouristNavBar";
import {
  FaUser,
  FaCalendar,
  FaBed,
  FaDollarSign,
  FaPlaneDeparture,
  FaPlaneArrival,
} from "react-icons/fa";

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
      const response = await axios.get(
        `/api/Tourist/getHotelBookingsByTouristId/${touristId}`
      );
      setHotelBookings(response.data.bookings);
    } catch (err) {
      setError("Failed to fetch hotel bookings.");
    }
  };

  const fetchFlightBookings = async () => {
    try {
      const response = await axios.get(
        `/api/Tourist/getFlightBookingsByTouristId/${touristId}`
      );
      setFlightBookings(response.data.bookings);
    } catch (err) {
      setError("Failed to fetch flight bookings.");
    }
  };

  useEffect(() => {
    if (touristId) {
      fetchHotelBookings();
      fetchFlightBookings();
    } else {
      setError("Tourist ID is missing.");
    }
  }, [touristId]);

  return (
    <div className="min-h-screen bg-background p-8" style={{ margin: "-20px" }}>
      <TouristNavbar id={touristId} />
      <p>hello</p>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary p-5">
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-full p-3">
                <FaUser className="h-16 w-16 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">
                  My Bookings
                </h2>
                <p className="text-white opacity-75">
                  Manage your Hotel and Flight bookings
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-12">
            {/* Hotel Bookings Section */}
            <div>
              <h3 className="text-2xl font-semibold text-black mb-4">
                Hotel Bookings
              </h3>
              <div className="space-y-4">
                {hotelBookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out"
                  >
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      <FaBed className="inline mr-2 text-primary" />
                      {`Hotel: ${booking.hotelId}`}
                    </h3>
                    <p className="text-sm text-secondary mb-1">
                      <FaBed className="inline mr-2 text-primary" />
                      {`Room: ${booking.roomType}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      <FaDollarSign className="inline mr-2 text-primary" />
                      {`${booking.currency} ${booking.price}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      <FaCalendar className="inline mr-2 text-primary" />
                      {`Check-in: ${new Date(
                        booking.checkInDate
                      ).toLocaleDateString()}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      <FaCalendar className="inline mr-2 text-primary" />
                      {`Check-out: ${new Date(
                        booking.checkOutDate
                      ).toLocaleDateString()}`}
                    </p>
                  </div>
                ))}
                {hotelBookings.length === 0 && (
                  <p className="text-center text-gray-500">
                    No hotel bookings found.
                  </p>
                )}
              </div>
            </div>

            {/* Flight Bookings Section */}
            <div>
              <h3 className="text-2xl font-semibold text-black mb-4">
                Flight Bookings
              </h3>
              <div className="space-y-4">
                {flightBookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out"
                  >
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      <FaPlaneDeparture className="inline mr-2 text-primary" />
                      {`Flight: ${booking.flightNumber1}`}
                    </h3>
                    <p className="text-sm text-secondary mb-1">
                      <FaPlaneArrival className="inline mr-2 text-primary" />
                      {`Airline: ${booking.airline}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      <FaDollarSign className="inline mr-2 text-primary" />
                      {`${booking.currency} ${booking.price}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      <FaPlaneDeparture className="inline mr-2 text-primary" />
                      {`Departure: ${new Date(
                        booking.departure1
                      ).toLocaleString()}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      <FaPlaneArrival className="inline mr-2 text-primary" />
                      {`Arrival: ${new Date(
                        booking.arrival1
                      ).toLocaleString()}`}
                    </p>
                  </div>
                ))}
                {flightBookings.length === 0 && (
                  <p className="text-center text-gray-500">
                    No flight bookings found.
                  </p>
                )}
              </div>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-center mt-4 bg-red-100 py-2 px-4 rounded-lg">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
