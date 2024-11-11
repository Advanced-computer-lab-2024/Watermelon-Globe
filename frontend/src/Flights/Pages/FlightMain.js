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
      <div className="w-full max-w-3xl mx-auto bg-white rounded-lg overflow-hidden border-4 border-gray-200 mb-20" 
      style={{ 
        border: '2px solid #000000',
        marginBottom: '10px'             
      }}
      onClick={onClick}>
        <div className="flex flex-col md:flex-row">
          <div className="flex-grow p-6 text-white" 
          style={{ 
            background: 'linear-gradient(to bottom right, #fc6c85, #2a9d8f)', 
          }}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold">{details.flightNumber1}</h3>
                <p className="text-sm opacity-75">{details.airline}</p>
              </div>
              <Plane className="h-8 w-8 rotate-45" />
            </div>
            <div className="space-y-4">
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

          <div
            className="flex-shrink-0 p-6 border-l border-gray-200"
            style={{ backgroundColor: '#faf1f1' }}  // Watermelon Green color
          >          <div className="text-center mb-6">
              <p className="text-sm text-gray-600 mb-1">Total Price</p>
              <p className="text-3xl font-bold text-gray-900">{details.currency} {details.price}</p>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between text-xl">
                <span>Adults:</span>
                <span className="font-medium">{details.currency} {details.pricePerAdult}</span>
              </div>
              {details.pricePerChild && (
                <div className="flex justify-between text-xl">
                  <span>Children:</span>
                  <span className="font-medium">{details.currency} {details.pricePerChild}</span>
                </div>
              )}
              {details.pricePerInfant && (
                <div className="flex justify-between text-xl">
                  <span>Infants:</span>
                  <span className="font-medium">{details.currency} {details.pricePerInfant}</span>
                </div>
              )}
            </div>


            <button
              className="px-8 py-6 text-2xl font-bold text-white mt-10"
              style={{ 
                background: 'linear-gradient(to bottom right, #fc6c85, #2a9d8f)',
                border: '2px solid #000000',
                borderRadius: '0'              
              }}
            >
              Select Flight
            </button>




          </div>
        </div>
        <div className="relative h-4">
          <div className="absolute left-0 right-0 h-[1px] border-t border-dashed border-gray-300"></div>
          <div className="absolute left-0 right-0 flex justify-between">
            <div className="w-4 h-4 -mt-2 -ml-2 bg-gray-100 rounded-full"></div>
            <div className="w-4 h-4 -mt-2 -mr-2 bg-gray-100 rounded-full"></div>
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
              <div className="space-y-6">
                {flights.map((flight) => (
                  <FlightTicket
                    key={flight.id}
                    flight={flight}
                    onClick={() => setSelectedFlight(flight)}
                    className="mb-20"
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