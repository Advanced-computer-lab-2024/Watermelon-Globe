import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, CreditCard, CheckCircle, XCircle } from 'lucide-react';
import TouristNavbar from "../Components/TouristNavBar";
import { useCurrency } from "../Components/CurrencyContext";

export default function TransportationDetails() {
  const [transportation, setTransportation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);
  const { touristId, id } = useParams();
  const { selectedCurrency, currencies } = useCurrency();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransportationDetails();
  }, [id]);

  const fetchTransportationDetails = async () => {
    try {
      const response = await fetch(`/api/Tourist/getTransportation/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch transportation details');
      }
      const data = await response.json();
      setTransportation(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    try {
      const response = await fetch(`/api/Tourist/bookTransportation/${id}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to book transportation');
      }
      const data = await response.json();
      setBookingStatus('Booked successfully!');
      setTransportation({ ...transportation, booked: true });
    } catch (err) {
      setBookingStatus(`Booking failed: ${err.message}`);
    }
  };

  function getCurrencyConversionRate(currency) {
    const rates = {
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
    return rates[currency] || 1; // Default to 1 if currency not found
  }
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <XCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-center text-secondary mb-4">Error</h2>
          <p className="text-center text-grayText">{error}</p>
        </div>
      </div>
    );
  }

  // Calculate the price in the selected currency
  const priceInSelectedCurrency = selectedCurrency
    ? (transportation.price * getCurrencyConversionRate(selectedCurrency)).toFixed(2)
    : transportation.price.toFixed(2);

  // Get the currency symbol for the selected currency
  const currencySymbol = selectedCurrency ? currencies[selectedCurrency]?.symbol_native : "$";

  return (
    <div className="min-h-screen bg-background p-8" style={{ margin: "-20px" }}>
      <TouristNavbar id={touristId} />
      <div className="max-w-3xl mx-auto mt-8 bg-cardBackground shadow-lg rounded-lg overflow-hidden">
        <div className="bg-primary px-6 py-4">
          <h2 className="text-3xl font-bold text-white mt-2">Transportation Details</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center mb-6">
            <Calendar className="w-6 h-6 text-primary mr-2" />
            <h3 className="text-2xl font-semibold text-secondary">{transportation.type}</h3>
          </div>
          <div className="flex items-center mb-6">
            <MapPin className="w-6 h-6 text-primary mr-2" />
            <p className="text-lg text-grayText">Destination: {transportation.destination}</p>
          </div>
          <p className="text-lg text-grayText">
            Price: {currencySymbol}{priceInSelectedCurrency}
          </p>
          {transportation.booked ? (
            <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                <p className="text-green-700 font-semibold">This transportation is already booked.</p>
              </div>
            </div>
          ) : (
            <button
              onClick={handleBooking}
              className="w-full bg-primary hover:bg-hover text-white font-bold py-3 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-hover"
            >
              Book Now
            </button>
          )}
          {bookingStatus && (
            <div
              className={`mt-4 p-4 rounded-lg text-lg font-medium ${bookingStatus.includes('failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}
            >
              {bookingStatus}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
