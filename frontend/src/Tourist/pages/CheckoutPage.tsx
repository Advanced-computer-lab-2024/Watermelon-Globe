import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import AddressPage from '../Components/AddressPage'
import PaymentSummary from '../Components/PaymentSummary'

const CheckoutPage = () => {
  const { state } = useLocation()
  const { touristId } = useParams<{ touristId: string }>()
  const totalFromCartPage = state?.total || 0 // Fallback to 0 if total is not passed

  console.log('Tourist ID:', touristId)
  console.log('Total from Cart Page:', totalFromCartPage)

  if (!touristId) {
    return <p className="text-red-500 text-center mt-8">Tourist ID is missing. Unable to proceed with checkout.</p>
  }

  return (
    <div className="checkout-page container mx-auto p-6 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Checkout</h1>

      {/* Delivery Address Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Delivery Address</h2>
        <AddressPage />
      </div>

      {/* Payment Summary Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Payment Summary</h2>
        <PaymentSummary totalFromCartPage={totalFromCartPage} touristId={touristId} />
      </div>
    </div>
  )
}

export default CheckoutPage
