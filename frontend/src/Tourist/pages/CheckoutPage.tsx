import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { FaDollarSign, FaWallet, FaCreditCard, FaCashRegister } from 'react-icons/fa'; // Added Cash Register icon
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import AddressPage from '../Components/AddressPage';
import TouristNavbar from "../Components/TouristNavBar";
import PaymentSummary  from '../Components/PaymentSummary';

const stripePromise = loadStripe('pk_test_51QQWIBKTPpyea1n0DvMMy6pxbX2ihuoDsD1K5Hbrsrh5hkw2mG214K159dORl0oA9otHspuTTPMP7NbqgP8buKhE00qzg5wBBP');

interface CheckoutPageProps {
  totalFromCartPage: number;
  touristId: string;
}

const CheckoutPageForm: React.FC<CheckoutPageProps & {selectedAddress: string | null}> = ({ totalFromCartPage, touristId, selectedAddress }) => {
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'stripe' | 'cash on delivery'>('stripe');
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();


  const handlePaymentAndBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAddress == null) {
      setError('Please select a delivery address.');
      return;
    }

    try {
      if (paymentMethod === 'wallet') {
        // Handle payment with wallet
        const walletPaymentResponse = await axios.put(`/api/Tourist/updateWallet/${touristId}`, {
          amount: -totalFromCartPage,
        });

        if (walletPaymentResponse.data.wallet >= totalFromCartPage) {
          // If enough wallet balance, finalize booking
          const cartResponse = await axios.put(`/api/Tourist/buyCart/${touristId}`);
          const loyaltyResponse = await axios.put(`/api/Tourist/updateLoyaltyPoints/${touristId}`, {
            amountPaid: totalFromCartPage,
          });

          alert(`Purchased Products successfully! 
          Loyalty Points: ${loyaltyResponse.data.loyaltyPoints}
          Badge: ${loyaltyResponse.data.badge}`);
          navigate(`/MainTouristPage/${touristId}`);
        } else {
          setError('Insufficient wallet balance.');
        }
      } else if (paymentMethod === 'stripe') {
        // Handle payment with Stripe
        const stripePaymentIntentResponse = await axios.post(`/api/Tourist/payProduct`, {
          totalAmount: totalFromCartPage,
        });

        const { clientSecret } = stripePaymentIntentResponse.data;

        if (!stripe || !elements) {
          setError('Stripe has not loaded yet. Please try again.');
          return;
        }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) return;

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: cardElement },
        });

        if (paymentResult.paymentIntent?.status === 'succeeded') {
          // 1. First, create the booking
          const cartResponse = await axios.put(`/api/Tourist/buyCart/${touristId}`);
          const loyaltyResponse = await axios.put(`/api/Tourist/updateLoyaltyPoints/${touristId}`, {
            amountPaid: totalFromCartPage,
          });

          alert(`Products Purchased successfully! 
          Loyalty Points: ${loyaltyResponse.data.loyaltyPoints}
          Badge: ${loyaltyResponse.data.badge}`);
          navigate(`/MainTouristPage/${touristId}`);
        } else {
          setError('Payment failed, please try again.');
        }
      } else if (paymentMethod === 'cash on delivery') {
        // Handle payment with Cash on Delivery
        // Proceed with the booking directly as no payment is required
        const cartResponse = await axios.put(`/api/Tourist/buyCart/${touristId}`);
        const loyaltyResponse = await axios.put(`/api/Tourist/updateLoyaltyPoints/${touristId}`, {
          amountPaid: totalFromCartPage,
        });

        alert(`Your order will be delivered and paid for on delivery. 
        Loyalty Points: ${loyaltyResponse.data.loyaltyPoints}
        Badge: ${loyaltyResponse.data.badge}`);
        navigate(`/MainTouristPage/${touristId}`);

      }
    } catch (error: any) {
      console.error('Error during payment or booking:', error);
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handlePaymentAndBooking} className="bg-cardBackground shadow-md rounded-lg p-6 max-w-md mx-auto mt-10">
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
          <button
            type="button"
            onClick={() => setPaymentMethod('cash on delivery')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${paymentMethod === 'cash on delivery' ? 'bg-primary text-white hover:bg-hover' : 'bg-lightGray text-secondary hover:bg-secondaryHover hover:text-white'}`}
          >
            <FaCashRegister className="text-xl" />
            <span>Cash on Delivery</span>
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
        Confirm Payment
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </form>
  );
};

const CheckoutPage: React.FC = () => {
  const params = useParams();
  const { state } = useLocation();
  const touristId = params.touristId as string;
  const totalFromCartPage = state?.total || 0; // Fallback to 0 if total is not passed

  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  // Handle address selection
  const handleAddressSelect = (addressId: string | null) => {
    setSelectedAddress(addressId);
  };
  return (
    <div className="min-h-screen bg-background p-8" style={{ margin: "-20px" }}>
      <TouristNavbar id={touristId} />
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary p-5 relative">
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-full p-2">
                <FaDollarSign className="h-16 w-16 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Checkout</h2>
                <p className="text-white opacity-75">Complete your purchase</p>
              </div>
            </div>
          </div>

          {/* Payment Summary Section */}
          <div className="p-6 space-y-12">
            <PaymentSummary totalFromCartPage={totalFromCartPage} touristId={touristId} />
          </div>

          <div className="p-6 space-y-12">
            {/* Delivery Address Section */}
            <div>
              <h3 className="text-2xl font-semibold text-black mb-4">Choose Delivery Address</h3>
              <AddressPage onAddressSelect={handleAddressSelect} />
            </div>

            {/* Payment Form Section */}
            <div className="bg-white p-6 flex items-center justify-center">
              <Elements stripe={stripePromise}>
                <CheckoutPageForm totalFromCartPage={totalFromCartPage} touristId={touristId} selectedAddress={selectedAddress} />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
