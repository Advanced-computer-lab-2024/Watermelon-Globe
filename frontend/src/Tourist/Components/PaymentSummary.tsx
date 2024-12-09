'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCurrency } from "../Components/CurrencyContext";

interface Currency {
  symbol_native: string;
  // Add other fields from the currency object as needed
}

interface CurrencyContextType {
  selectedCurrency: string | null;
  currencies: { [key: string]: Currency }; 
}

interface CartItem {
  itemId: string
  name: string
  price: number
  quantity: number
}

interface PaymentSummaryProps {
  totalFromCartPage?: number
  touristId: string
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ totalFromCartPage, touristId }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [subtotal, setSubtotal] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)
  const { selectedCurrency, currencies } = useCurrency() as CurrencyContextType; 

  useEffect(() => {
    if (totalFromCartPage !== undefined) {
      setSubtotal(totalFromCartPage)
    } else {
      fetchCart()
    }
  }, [totalFromCartPage, touristId])

  const fetchCart = async () => {
    try {
      const response = await axios.get(`/api/Tourist/cart/${touristId}`)
      const fetchedCart: CartItem[] = response.data.cartItems || []
      setCartItems(fetchedCart)

      const calculatedSubtotal = fetchedCart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
      setSubtotal(calculatedSubtotal)
    } catch (error) {
      console.error('Error fetching cart:', error)
      setError('Failed to load cart. Please try again later.')
    }
  }

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

  // Convert subtotal to the selected currency
  const conversionRate = getCurrencyConversionRate(selectedCurrency || "USD");
  const convertedSubtotal = subtotal * conversionRate;

  return (
    <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
      <h4 className="text-lg font-semibold text-secondary mb-4">Order Summary</h4>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {cartItems.length > 0 && (
        <ul className="space-y-2 mb-4">
          {cartItems.map((item) => {
            // Convert item price to the selected currency
            const convertedPrice = item.price * conversionRate;
            return (
              <li key={item.itemId} className="flex justify-between text-grayText">
                <span>{item.name} (x{item.quantity})</span>
                <span>{currencySymbol}{(convertedPrice * item.quantity).toFixed(2)}</span>
              </li>
            );
          })}
        </ul>
      )}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-primary">{currencySymbol}{convertedSubtotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

export default PaymentSummary
