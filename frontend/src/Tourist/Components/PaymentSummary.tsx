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
  totalFromCartPage?: number // If passed, use this instead of fetching the cart
  touristId: string // ID to fetch the cart from the backend
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ totalFromCartPage, touristId }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [subtotal, setSubtotal] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (totalFromCartPage !== undefined) {
      // Use the total provided from the ShoppingCart page
      setSubtotal(totalFromCartPage)
    } else {
      // Fetch the cart from the backend
      fetchCart()
    }
  }, [totalFromCartPage])

  const fetchCart = async () => {
    try {
      const response = await axios.get(`/api/Tourist/cart/${touristId}`)
      const fetchedCart: CartItem[] = response.data.cartItems || []
      setCartItems(fetchedCart)

      // Calculate subtotal from the fetched cart
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
    <div className="bg-gray-100 p-4 rounded-md shadow-md">

      {error && <p className="text-red-500">{error}</p>}

      {cartItems.length > 0 && (
        <ul className="space-y-2">
          {cartItems.map((item) => (
            <li key={item.itemId} className="flex justify-between">
              <span>{item.name} (x{item.quantity})</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}
        <h3 className="text-lg font-semibold">Subtotal: ${subtotal.toFixed(2)}</h3>
    </div>
  )
}

export default PaymentSummary
