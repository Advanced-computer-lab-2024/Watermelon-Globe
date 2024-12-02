import React from 'react';
import { FaWallet, FaCreditCard } from 'react-icons/fa';

type PaymentOptionsProps = {
  paymentMethod: 'wallet' | 'creditCard' | null;
  onPaymentMethodSelection: (method: 'wallet' | 'creditCard') => void;
};

export default function PaymentOptions2({
  paymentMethod,
  onPaymentMethodSelection,
}: PaymentOptionsProps) {
  return (
    <div className="payment-options-container bg-sectionBackground p-6 rounded-lg shadow-md">
      {/* Payment Method Choices */}
      <div className="payment-options grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="payment-option">
          <button
            onClick={() => onPaymentMethodSelection('wallet')}
            className={`option-button w-full p-4 rounded-lg border-2 flex items-center justify-center space-x-4 
              ${paymentMethod === 'wallet' ? 'bg-primary text-white border-primary' : 'border-lightGray text-secondary hover:border-primary'}`}
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
      </div>
    </div>
  );
}
