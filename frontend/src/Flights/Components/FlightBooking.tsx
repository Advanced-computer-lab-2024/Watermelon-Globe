import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FaWallet, FaCreditCard, FaSearch } from 'react-icons/fa'; // Font Awesome icons
import { useCurrency } from "../../Tourist/Components/CurrencyContext";

// Load Stripe Publishable Key
const stripePromise = loadStripe('pk_test_51QQWIBKTPpyea1n0DvMMy6pxbX2ihuoDsD1K5Hbrsrh5hkw2mG214K159dORl0oA9otHspuTTPMP7NbqgP8buKhE00qzg5wBBP');

interface Currency {
  symbol_native: string;
  // Add other fields from the currency object as needed
}

interface CurrencyContextType {
  selectedCurrency: string | null;
  currencies: { [key: string]: Currency };
}

interface FlightBookingProps {
  flight: any;
  touristId: string | undefined;
}

const FlightPaymentForm: React.FC<FlightBookingProps> = ({ flight, touristId }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'stripe'>('stripe'); // Default to stripe payment
  const stripe = useStripe();
  const elements = useElements();
  const { selectedCurrency, currencies } = useCurrency() as CurrencyContextType;

  const handlePaymentAndBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. First, create the booking
      const bookingResponse = await axios.post(`/api/Tourist/bookFlight/${touristId}`, {
        airline: flight.validatingAirlineCodes[0],
        flightNumber1: flight.itineraries[0]?.segments[0]?.carrierCode + flight.itineraries[0]?.segments[0]?.number,
        departure1: flight.itineraries[0]?.segments[0]?.departure?.at,
        arrival1: flight.itineraries[0]?.segments[0]?.arrival?.at,
        flightNumber2: flight.itineraries[0]?.segments[1]?.carrierCode + flight.itineraries[0]?.segments[1]?.number,
        departure2: flight.itineraries[0]?.segments[1]?.departure?.at,
        arrival2: flight.itineraries[0]?.segments[1]?.arrival?.at,
        price: flight.price?.grandTotal,
        currency: flight.price?.currency,
      });

      console.log(bookingResponse.data.booking._id);
      const bookingId = bookingResponse.data.booking._id;

      if (paymentMethod === 'wallet') {
        // Handle payment with wallet
        const grandTotal = Number(flight.price?.grandTotal);
        const walletPaymentResponse = await axios.put(`/api/Tourist/updateWallet/${touristId}`, {
          amount: -grandTotal,
        });

        if (walletPaymentResponse.data.wallet >= flight.price?.grandTotal) {
          // If enough wallet balance, finalize booking
          const loyaltyResponse = await axios.put(`/api/Tourist/updateLoyaltyPoints/${touristId}`, {
            amountPaid: flight.price?.grandTotal,
          });

          alert(`Flight booked successfully! 
          Loyalty Points: ${loyaltyResponse.data.loyaltyPoints}
          Badge: ${loyaltyResponse.data.badge}`);
        } else {
          setMessage('Insufficient wallet balance.');
        }
      } else if (paymentMethod === 'stripe') {
        // Handle payment with Stripe
        const paymentIntentResponse = await axios.post(`/api/Tourist/payFlight`, {
          bookingId: bookingId,
        });

        const { clientSecret } = paymentIntentResponse.data;

        if (!stripe || !elements) {
          setMessage('Stripe has not loaded yet. Please try again.');
          return;
        }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) return;
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: cardElement },
        });

        if (paymentResult.error) {
          // Payment failed, delete the booking
          await axios.delete(`/api/Tourist/deleteBooking/${bookingId}`);
          setMessage(`Payment failed: ${paymentResult.error.message}`);
          return;
        }

        if (paymentResult.paymentIntent?.status === 'succeeded') {
          const loyaltyResponse = await axios.put(`/api/Tourist/updateLoyaltyPoints/${touristId}`, {
            amountPaid: flight.price?.grandTotal,
          });

          alert(`Flight booked successfully! 
          Loyalty Points: ${loyaltyResponse.data.loyaltyPoints}
          Badge: ${loyaltyResponse.data.badge}`);
        }
      }
    } catch (error: any) {
      console.error('Error during payment or booking:', error);
      setMessage(`Error: ${error.message}`);
    }
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


  return (
    <form
      onSubmit={handlePaymentAndBooking}
      className="bg-cardBackground shadow-md rounded-lg p-6 max-w-md mx-auto mt-10"
    >
      <h3 className="text-3xl font-bold text-secondary mb-4">
        Payment and Booking for: {flight.validatingAirlineCodes[0]}
      </h3>
      <p className="text-grayText mb-2">
        Flight: {flight.itineraries[0]?.segments[0]?.carrierCode}{' '}
        {flight.itineraries[0]?.segments[0]?.number}
      </p>
      <p className="text-grayText mb-4">
        Total Price: {" "}
        {currencySymbol} {" "}
        {selectedCurrency
          ? (flight.price?.grandTotal * getCurrencyConversionRate(selectedCurrency)).toFixed(2)
          : flight.price?.grandTotal.toFixed(2)}
      </p>

      <div className="mb-4">
        <label className="block text-secondary font-semibold mb-2">Select Payment Method:</label>
        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            onClick={() => setPaymentMethod('wallet')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${paymentMethod === 'wallet' ? 'bg-primary text-white hover:bg-hover' : 'bg-lightGray text-secondary hover:bg-secondaryHover hover:text-white'}`}
          >
            <FaWallet className="text-xl" />
            <span>Wallet</span>
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('stripe')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${paymentMethod === 'stripe' ? 'bg-primary text-white hover:bg-hover' : 'bg-lightGray text-secondary hover:bg-secondaryHover hover:text-white'}`}
          >
            <FaCreditCard className="text-xl" />
            <span>Credit Card (Stripe)</span>
          </button>
        </div>
      </div>

      {paymentMethod === 'stripe' && (
        <div className="mb-4">
          <label className="block text-secondary font-semibold mb-2">Enter Payment Details:</label>
          <div className="border border-lightGray p-4 rounded-lg bg-lightGray">
            <CardElement className="text-grayText" />
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded-lg shadow-md hover:bg-hover"
        disabled={!stripe}
      >
        Pay and Book
      </button>

      {message && <p className="text-red-500 mt-4">{message}</p>}
    </form>
  );
};

const FlightBooking: React.FC<FlightBookingProps> = ({ flight, touristId }) => {
  return (
    <div className="bg-white p-6 flex items-center justify-center">
      <Elements stripe={stripePromise}>
        <FlightPaymentForm flight={flight} touristId={touristId} />
      </Elements>
    </div>
  );
};

export default FlightBooking;
