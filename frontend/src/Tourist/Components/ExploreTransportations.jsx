import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { useCurrency } from "../Components/CurrencyContext";

const ExploreTransportations = ({ touristId }) => {
  const [transportations, setTransportations] = useState([]);
  const { selectedCurrency, currencies } = useCurrency();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchTransportations();
  }, []);

  const fetchTransportations = async () => {
    try {
      const response = await fetch('/api/Tourist/getAllTransportations');
      const data = await response.json();
      setTransportations(data);
    } catch (error) {
      console.error('Error fetching transportations:', error);
    }
  };

  const handleTransportationClick = (id) => {
    navigate(`/TransportationDetails/${id}/${touristId}`); // Navigate to TransportationDetails page with the transportation ID
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

  const currencySymbol = selectedCurrency ? currencies[selectedCurrency]?.symbol_native : "$";

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Explore Transportations</h2>

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        }}
      >
        {transportations.map((transportation) => (
          <button
            key={transportation._id}
            className="rounded-lg overflow-hidden shadow-md bg-white hover:bg-gray-100 p-4 text-left"
            onClick={() => handleTransportationClick(transportation._id)} // Handle click event
          >
            <h3 className="font-bold text-lg">{transportation.type}</h3>
            <p className="text-gray-600">Destination: {transportation.destination}</p>
            <p className="text-gray-600">Price: 
            {currencySymbol}
            {selectedCurrency
              ? (transportation.price * getCurrencyConversionRate(selectedCurrency)).toFixed(2)
              : transportation.price.toFixed(2)}</p>
            <p className="text-gray-600">Booking Date: {new Date(transportation.bookingDate).toLocaleDateString()}</p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ExploreTransportations;
