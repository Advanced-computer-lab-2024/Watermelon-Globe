import React, { useState } from 'react'
import { FaWallet, FaCreditCard, FaCashRegister } from 'react-icons/fa'


type PaymentOptionsProps = {
    paymentMethod: 'wallet' | 'creditCard' | 'cashOnDelivery' | null
    onPaymentMethodSelection: (method: 'wallet' | 'creditCard' | 'cashOnDelivery') => void
  }


export default function PaymentOptions({ paymentMethod, onPaymentMethodSelection }: PaymentOptionsProps) {
  return (
    <div className="payment-options-container bg-sectionBackground p-6 rounded-lg shadow-md">

      {/* Payment Method Choices */}
      <div className="payment-options grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="payment-option">
          <button
            onClick={() => onPaymentMethodSelection('wallet')}
            className={`option-button w-full p-4 rounded-lg border-2 flex items-center justify-center space-x-4 
              ${paymentMethod === 'wallet' ? 'bg-primary text-white border-primary ' : 'border-lightGray text-secondary hover:border-primary'}`}
          >
            <FaWallet size={24} />
            <span>Wallet</span>
          </button>
        </div>

        <div className="payment-option">
          <button
            onClick={() => onPaymentMethodSelection('creditCard')}
            className={`option-button w-full p-4 rounded-lg border-2 flex items-center justify-center space-x-4 
              ${paymentMethod === 'creditCard' ? 'bg-primary text-white border-primary' : 'border-lightGray text-secondary hover:border-primary'}`}
          >
            <FaCreditCard size={24} />
            <span>Credit Card (Stripe)</span>
          </button>
        </div>

        <div className="payment-option">
          <button
            onClick={() => onPaymentMethodSelection('cashOnDelivery')}
            className={`option-button w-full p-4 rounded-lg border-2 flex items-center justify-center space-x-4 
              ${paymentMethod === 'cashOnDelivery' ? 'bg-primary text-white border-primary' : 'border-lightGray text-secondary hover:border-primary'}`}
          >
            <FaCashRegister size={24} />
            <span>Cash on Delivery</span>
          </button>
        </div>
      </div>
    </div>
  )
}
