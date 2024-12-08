import React, { useState, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Plane } from 'lucide-react';
import AccessToken from '../Components/AccessToken';
import FlightSearch from '../Components/FlightSearch';
import FlightBooking from '../Components/FlightBooking';
import TouristNavbar from '../../Tourist/Components/TouristNavBar';
import { useCurrency } from "../../Tourist/Components/CurrencyContext";

const FlightMain: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const [flights, setFlights] = useState<any[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<any>(null);
  const { touristId } = useParams<{ touristId: string }>();
  const navigate = useNavigate();
  const { selectedCurrency, currencies } = useCurrency() as CurrencyContextType;

  interface Currency {
    symbol_native: string;
    // Add other fields from the currency object as needed
  }

  interface CurrencyContextType {
    selectedCurrency: string | null;
    currencies: { [key: string]: Currency };
  }

  // Ref for smooth scrolling to FlightBooking section
  const flightBookingRef = useRef<HTMLDivElement | null>(null);
  const TopBookingRef = useRef<HTMLDivElement | null>(null);

  // Navigation Handlers
  const handleBackClick = () => navigate(-1);
  const handleSignOut = () => {
    // Logic to sign out
    console.log('Signed out');
  };

  const getFlightDetails = (flight: any) => {
    const segments = flight.itineraries[0]?.segments || [];
    const firstSegment = segments[0] || {};
    const secondSegment = segments[1] || {};

    return {
      airline: flight.validatingAirlineCodes[0],
      flightNumber1: `${firstSegment?.carrierCode}${firstSegment?.number}`,
      departure1: firstSegment?.departure?.at,
      arrival1: firstSegment?.arrival?.at,
      flightNumber2: `${secondSegment?.carrierCode}${secondSegment?.number}`,
      departure2: secondSegment?.departure?.at,
      arrival2: secondSegment?.arrival?.at,
      price: flight.price?.grandTotal,
      currency: flight.price?.currency,
    };
  };

  function getCurrencyConversionRate(currency: string): number {
    const rates: { [key: string]: number } = {
      USD: 1,
      EUR: 0.85,
      GBP: 0.73,
      JPY: 110.0,
      BGN: 1.96,
      CZK: 21.5,
      AUD: 1.34,
      BRL: 5.0,
      CAD: 1.25,
      CHF: 0.92,
      CNY: 6.45,
      DKK: 6.36,
      EGP: 50.04,
      HKD: 7.8,
      HRK: 6.63,
      HUF: 310.0,
      IDR: 14400,
      ILS: 3.2,
      INR: 74.0,
      ISK: 129.0,
      KRW: 1180.0,
      MXN: 20.0,
      MYR: 4.2,
      NOK: 8.6,
      NZD: 1.4,
      PHP: 50.0,
      PLN: 3.9,
      RON: 4.1,
      RUB: 74.0,
      SEK: 8.8,
      SGD: 1.35,
      THB: 33.0,
      TRY: 8.8,
      ZAR: 14.0,
    };
    return rates[currency] || 1;
  }

  const currencySymbol = selectedCurrency ? currencies[selectedCurrency]?.symbol_native : "$";


  const FlightTicket: React.FC<{ flight: any; onClick: () => void }> = ({ flight, onClick }) => {
    const details = getFlightDetails(flight);

    return (
      <div
        className="w-full max-w-3xl mx-auto rounded-lg overflow-hidden border-4 border-gray-200 hover:border-secondary shadow-sm hover:shadow-md transition-shadow mb-8"
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      >
        <div className="flex flex-col md:flex-row">
          <div className="flex-grow p-6 text-white bg-primary">
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
          <div className="flex-shrink-0 p-6 bg-gray-100 border-l border-gray-200">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600 mb-1">Total Price </p>
              <p className="text-3xl font-bold text-gray-900">
                {currencySymbol} {" "}
                {selectedCurrency
                  ? (details.price * getCurrencyConversionRate(selectedCurrency)).toFixed(2)
                  : details.price.toFixed(2)}
              </p>
            </div>
            <button
              className="w-full px-4 py-2 text-white font-bold bg-secondary hover:bg-secondaryHover rounded"
              onClick={onClick}
            >
              Select Flight
            </button>
          </div>
        </div>
      </div>
    );
  };

  const FlightInfo: React.FC<{ flightNumber: string; departure: string; arrival: string }> = ({
    flightNumber,
    departure,
    arrival,
  }) => {
    // Check if departure and arrival dates are valid before formatting
    const formattedDeparture = departure && !isNaN(new Date(departure).getTime())
      ? format(new Date(departure), 'HH:mm')
      : 'Invalid date';

    const formattedArrival = arrival && !isNaN(new Date(arrival).getTime())
      ? format(new Date(arrival), 'HH:mm')
      : 'Invalid date';

    return (
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <Plane className="h-5 w-5" />
        </div>
        <div className="flex-grow">
          <p className="font-semibold">{flightNumber}</p>
          <p className="text-sm">{`${formattedDeparture} → ${formattedArrival}`}</p>
        </div>
      </div>
    );
  };

  const handleSelectFlight = () => {
    if (flightBookingRef.current) {
      flightBookingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBackToTop = () => {
    if (TopBookingRef.current) {
      TopBookingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <TouristNavbar id={touristId} />
      <div className="max-w-6xl mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary p-5 relative">
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-full p-2">
                <Plane className="h-16 w-16 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Flight Booking</h1>
                <p className="text-white opacity-75">Find and book your flight</p>
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
                <div
                  ref={TopBookingRef}
                  className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
                  <h2 className="text-xl font-semibold text-secondary mb-4">Search Flights</h2>
                  <FlightSearch token={token} setFlights={setFlights} />
                </div>

                {flights?.length > 0 && (
                  <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
                    <h2 className="text-xl font-semibold text-secondary mb-4">Flight Results</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {flights.map((flight) => (
                        <FlightTicket
                          key={flight.id}
                          flight={flight}
                          onClick={() => {
                            setSelectedFlight(flight);
                            handleSelectFlight(); // Scroll to FlightBooking
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {selectedFlight && (
                  <div
                    className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out"
                    ref={flightBookingRef}
                  >
                    <h2 className="text-xl font-semibold text-secondary mb-4">Flight Booking</h2>
                    <FlightBooking flight={selectedFlight} touristId={touristId} />
                    <button
                      onClick={() => {
                        handleBackToTop()
                      }}
                      className="w-full bg-primary text-white py-2 rounded-lg shadow-md hover:bg-hover"
                    >
                      Go Back To Top
                    </button>
                  </div>



                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightMain;
