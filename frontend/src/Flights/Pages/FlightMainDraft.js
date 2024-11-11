import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns'
import { Plane } from "lucide-react"
import AccessToken from '../Components/AccessToken';
import FlightSearch from '../Components/FlightSearch';
import FlightBooking from '../Components/FlightBooking';

const FlightMain = () => {
  const [token, setToken] = useState('');
  const { touristId } = useParams();
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);

  const getFlightDetails = (flight) => {
    const segments = flight.itineraries[0]?.segments || [];
    const firstSegment = segments[0] || {};
    const secondSegment = segments[1] || {};

    return {
      airline: flight.validatingAirlineCodes[0],
      flightNumber1: firstSegment?.carrierCode + firstSegment?.number,
      departure1: firstSegment?.departure?.at,
      arrival1: firstSegment?.arrival?.at,
      flightNumber2: secondSegment?.carrierCode + secondSegment?.number,
      departure2: secondSegment?.departure?.at,
      arrival2: secondSegment?.arrival?.at,
      price: flight.price?.grandTotal,
      pricePerAdult: flight.travelerPricings?.find(tp => tp.travelerType === "ADULT")?.price?.total,
      pricePerChild: flight.travelerPricings?.find(tp => tp.travelerType === "CHILD")?.price?.total,
      pricePerInfant: flight.travelerPricings?.find(tp => tp.travelerType === "INFANT")?.price?.total,
      currency: flight.price?.currency,
    };
  };

  const FlightTicket = ({ flight, onClick }) => {
    const details = getFlightDetails(flight);

    return (
      <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer" onClick={onClick}>
        <div className="flex flex-col md:flex-row">
          <div className="flex-grow p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold">{details.airline}</h3>
                <p className="text-sm opacity-75">Flight ID: {flight.id}</p>
              </div>
              <Plane className="h-8 w-8 rotate-45" />
            </div>
            <div className="space-y-2">
              <FlightInfo
                flightNumber={details.flightNumber1}
                departure={details.departure1}
                arrival={details.arrival1}
              />
              {details.flightNumber2 && (
                <FlightInfo
                  flightNumber={details.flightNumber2}
                  departure={details.departure2}
                  arrival={details.arrival2}
                />
              )}
            </div>
          </div>
          <div className="flex-shrink-0 p-6 bg-gray-100">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600">Total Price</p>
              <p className="text-3xl font-bold text-gray-800">
                {details.currency} {details.price}
              </p>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Adults: {details.currency} {details.pricePerAdult}</p>
              <p>Children: {details.currency} {details.pricePerChild}</p>
              {details.pricePerInfant && (
                <p>Infants: {details.currency} {details.pricePerInfant}</p>
              )}
            </div>
            <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
              Select Flight
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute left-0 w-full border-t border-dashed border-gray-300 z-10"></div>
          <div className="absolute left-0 w-full flex justify-between px-4">
            <div className="w-4 h-8 bg-white border-l border-r border-b border-gray-300 rounded-b-full"></div>
            <div className="w-4 h-8 bg-white border-l border-r border-b border-gray-300 rounded-b-full"></div>
          </div>
        </div>
      </div>
    );
  };

  const FlightInfo = ({ flightNumber, departure, arrival }) => {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <Plane className="h-5 w-5" />
        </div>
        <div className="flex-grow">
          <p className="font-semibold">{flightNumber}</p>
          <p className="text-sm">
            {format(new Date(departure), "HH:mm")} → {format(new Date(arrival), "HH:mm")}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-w-full px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Amadeus Flight Booking</h1>

      {!token ? (
        <div className="bg-white shadow-md rounded-lg p-6 w-full">
          <h2 className="text-xl font-semibold mb-4">Access Token Required</h2>
          <AccessToken setToken={setToken} />
        </div>
      ) : (
        <>
          <div className="bg-white shadow-md rounded-lg p-6 mb-8 w-full">
            <h2 className="text-xl font-semibold mb-4">Search Flights</h2>
            <FlightSearch token={token} setFlights={setFlights} />
          </div>

          {flights?.length > 0 && (
            <div className="bg-white shadow-md rounded-lg p-6 mb-8 w-full">
              <h2 className="text-xl font-semibold mb-4">Flight Results</h2>
              <div className="grid grid-cols-1 gap-6">
                {flights.map((flight) => (
                  <FlightTicket
                    key={flight.id}
                    flight={flight}
                    onClick={() => setSelectedFlight(flight)}
                  />
                ))}
              </div>
            </div>
          )}

          {selectedFlight && (
            <div className="bg-white shadow-md rounded-lg p-6 w-full">
              <h2 className="text-xl font-semibold mb-4">Flight Booking</h2>
              <FlightBooking flight={selectedFlight} touristId={touristId} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FlightMain;