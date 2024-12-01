import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FaWallet, FaCreditCard } from 'react-icons/fa'; // Font Awesome icons

// Load Stripe Publishable Key
const stripePromise = loadStripe('pk_test_51QQWIBKTPpyea1n0DvMMy6pxbX2ihuoDsD1K5Hbrsrh5hkw2mG214K159dORl0oA9otHspuTTPMP7NbqgP8buKhE00qzg5wBBP');

interface FlightBookingProps {
  flight: any;
  touristId: string;
}

const FlightPaymentForm: React.FC<FlightBookingProps> = ({ flight, touristId }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'stripe'>('stripe'); // Default to stripe payment
  const stripe = useStripe();
  const elements = useElements();

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
        Total Price: {flight.price?.grandTotal} {flight.price?.currency}
      </p>

      <div className="mb-4">
        <label className="block text-secondary font-semibold mb-2">Select Payment Method:</label>
        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            onClick={() => setPaymentMethod('wallet')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${paymentMethod === 'wallet' ? 'bg-primary text-white' : 'bg-lightGray text-secondary hover:bg-secondaryHover hover:text-white'}`}
          >
            <FaWallet className="text-xl" />
            <span>Wallet</span>
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('stripe')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${paymentMethod === 'stripe' ? 'bg-primary text-white' : 'bg-lightGray text-secondary hover:bg-secondaryHover hover:text-white'}`}
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
    <div className="bg-background p-6 flex items-center justify-center">
      <Elements stripe={stripePromise}>
        <FlightPaymentForm flight={flight} touristId={touristId} />
      </Elements>
    </div>
  );
};

export default FlightBooking;
