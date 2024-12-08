import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { FaCalendar, FaDollarSign, FaBox } from 'react-icons/fa';
import axios from 'axios';
import AddressPage from '../Components/AddressPage';
import PaymentSummary from '../Components/PaymentSummary';
import PaymentOptions from '../Components/PaymentOptions';
import WalletComponent from '../Components/Wallet';
import TouristNavbar from "../Components/TouristNavBar";

const CheckoutPage = () => {
  const params = useParams();
  const { state } = useLocation();
  const touristId = params.touristId as string
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'creditCard' | 'cashOnDelivery' | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const totalFromCartPage = state?.total || 0; // Fallback to 0 if total is not passed


  const handlePaymentMethodSelection = (method: 'wallet' | 'creditCard' | 'cashOnDelivery') => {
    setPaymentMethod(method)
  }

  const handleConfirmPayment = async () => {
    if (!paymentMethod) {
      setError('Please select a payment method.')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      // Simulating payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert(`Payment confirmed using ${paymentMethod}!`)
      // Here you would typically make an API call to process the payment
    } catch (err) {
      setError('An error occurred while processing the payment. Please try again later.')
      console.error(err)
    } finally {
      setIsProcessing(false)
    }
  }

  if (!touristId) {
    return <p className="text-red-500 text-center mt-8">Tourist ID is missing. Unable to proceed with checkout.</p>
  }

  return (
    <div className="min-h-screen bg-background p-8" style={{ margin: "-20px" }}>
      <TouristNavbar id={touristId} />
      <p>hello</p>
      <div className="max-w-4xl mx-auto">
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

          <div className="p-6 space-y-12">
            {/* Delivery Address Section */}
            <div>
              <h3 className="text-2xl font-semibold text-black mb-4">Choose Delivery Address</h3>
              <AddressPage />
            </div>

            {/* Payment Options Section */}
            <div>
              <h3 className="text-2xl font-semibold text-black mb-4">Choose Your Payment Method</h3>
              <PaymentOptions
                paymentMethod={paymentMethod}
                onPaymentMethodSelection={handlePaymentMethodSelection}
                disableCashOnDelivery={false}
              />
            </div>

            {/* Payment Summary Section */}
            <div>
              <h3 className="text-2xl font-semibold text-black mb-4">Payment Summary</h3>
              <PaymentSummary totalFromCartPage={totalFromCartPage} touristId={touristId} />
            </div>

            {/* Confirm Payment Button */}
            {paymentMethod && (
              <div className="bg-cardBackground shadow-md rounded-lg p-4">
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
