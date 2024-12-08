'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

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

  return (
    <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
      <h4 className="text-lg font-semibold text-secondary mb-4">Order Summary</h4>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {cartItems.length > 0 && (
        <ul className="space-y-2 mb-4">
          {cartItems.map((item) => (
            <li key={item.itemId} className="flex justify-between text-grayText">
              <span>{item.name} (x{item.quantity})</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total:</span>
          <span className="text-xl font-bold text-primary">${subtotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

export default PaymentSummary

