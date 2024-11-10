import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Correct import here
import { format } from 'date-fns'
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {flights.map((flight) => {
                  const details = getFlightDetails(flight)
                  return (
                    <div
                      key={flight.id}
                      className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                      onClick={() => setSelectedFlight(flight)}
                    >
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{details.airline}</h3>
                          <div className="mt-2 space-y-2">
                            <p className="text-sm text-gray-600">
                              <svg xmlns="http://www.w3.org/2000/svg" className="inline-block mr-2 h-4 w-4 rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 2L2 22"></path>
                                <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                                <line x1="12" y1="16" x2="12" y2="20"></line>
                              </svg>
                              {details.flightNumber1} - {format(new Date(details.departure1), "HH:mm")} → {format(new Date(details.arrival1), "HH:mm")}
                            </p>
                            {details.flightNumber2 && (
                              <p className="text-sm text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="inline-block mr-2 h-4 w-4 rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M22 2L2 22"></path>
                                  <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                                  <line x1="12" y1="16" x2="12" y2="20"></line>
                                </svg>
                                {details.flightNumber2} - {format(new Date(details.departure2), "HH:mm")} → {format(new Date(details.arrival2), "HH:mm")}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-2xl font-bold text-blue-600">Adults: {details.currency} {details.pricePerAdult}</p>
                          <p className="text-2xl font-bold text-blue-600">Children: {details.currency} {details.pricePerChild}</p>
                          {/* <p className="text-2xl font-bold text-blue-600">Infants: {details.currency} {details.pricePerInfant}</p> */}
                          <p className="text-2xl font-bold text-red-600">Total: {details.currency} {details.price}</p>

                          <button className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
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
