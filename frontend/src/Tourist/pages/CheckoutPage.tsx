import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddressPage from '../Components/AddressPage';
import PaymentSummary from '../Components/PaymentSummary';
import PaymentOptions from '../Components/PaymentOptions';
import WalletComponent from '../Components/Wallet';

const CheckoutPage = () => {
  const { state } = useLocation();
  const { touristId } = useParams<{ touristId: string }>();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'creditCard' | 'cashOnDelivery' | null>(null);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalFromCartPage = state?.total || 0; // Fallback to 0 if total is not passed

  console.log('Tourist ID:', touristId);
  console.log('Total from Cart Page:', totalFromCartPage);

  if (!touristId) {
    return <p className="text-red-500 text-center mt-8">Tourist ID is missing. Unable to proceed with checkout.</p>;
  }

  const handlePaymentMethodSelection = (method: 'wallet' | 'creditCard' | 'cashOnDelivery') => {
    setPaymentMethod(method);
  };

  const handleConfirmPayment = async () => {

    if (!paymentMethod) {
      setError('Please select a payment method.');
      return;
    }

    setIsProcessing(true);
    setError(null); // Reset any previous error

    try {
      if (paymentMethod === 'wallet') {
        const response = await axios.put(`/api/Tourist/updateWallet/${touristId}`, { amount: -totalFromCartPage });

        if (response.data.wallet >= 0) {
          alert('Payment confirmed using Wallet!');
          await axios.put(`/api/Tourist/buyCart/${touristId}`);
          navigate(`/MainTouristPage/${touristId}`);
        } else {
          await axios.put(`/api/Tourist/updateWallet/${touristId}`, { amount: +totalFromCartPage });
          setError('Insufficient wallet balance.');
        }
      } else if (paymentMethod === 'cashOnDelivery') {
        alert('Payment confirmed for Cash on Delivery!');
      } else if (paymentMethod === 'creditCard') {
        alert('Proceed with Stripe payment (Credit Card) logic.');
      }
    } catch (err) {
      setError('An error occurred while processing the payment. Please try again later.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-primary/25 to-secondary/20" style={{ margin: '-20px' }}>
      <h1 className="text-4xl p-3 font-bold mb-8 text-center text-black bg-lightGray shadow-md rounded-lg">Checkout</h1>

      {/* Delivery Address Section */}
      <div className="bg-cardBackground shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-3xl font-semibold text-black mb-6">Choose Delivery Address</h2>
        <AddressPage />
      </div>

      {/* Payment Options Section */}
      <div className="bg-cardBackground shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-3xl font-semibold text-black mb-6">Choose Your Payment Method</h2>
        <PaymentOptions
          paymentMethod={paymentMethod}
          onPaymentMethodSelection={handlePaymentMethodSelection}
          disableCashOnDelivery={false}
        />
      </div>

      {/* Payment Summary Section */}
      <div className="bg-cardBackground shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-3xl font-semibold text-black mb-6">Payment Summary</h2>
        <PaymentSummary totalFromCartPage={totalFromCartPage} touristId={touristId} />
      </div>

      {/* Confirm Payment Button */}
      {paymentMethod && (
        <div className="bg-cardBackground shadow-md rounded-lg p-6 mb-6">
          <button
            onClick={handleConfirmPayment}
            className="w-full p-4 bg-primary text-white rounded-lg hover:bg-hover transition"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Confirm Payment'}
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      )}
      <WalletComponent touristId={touristId} />
    </div>
  );
};

export default CheckoutPage;
