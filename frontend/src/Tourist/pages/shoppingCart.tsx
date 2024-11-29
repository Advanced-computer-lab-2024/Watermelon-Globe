'use client'

import { useState, useEffect } from 'react'
import React from 'react'
import { Trash2, MinusCircle, PlusCircle } from 'lucide-react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

interface CartItem {
  product: {
    _id: string
    name: string
    price: number | null // Allow null to handle edge cases
  }
  quantity: number
}

export default function ShoppingCart() {
  const params = useParams()
  const touristId = params.touristId as string
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  const fetchCart = async () => {
    if (!touristId) {
      setError('Tourist ID not found in URL parameters')
      setLoading(false)
      return
    }

    try {
      const response = await axios.get(`/api/Tourist/viewCart/${touristId}`)
      setCartItems(response.data.cart || [])
      setError(null)
    } catch (error) {
      console.error('Error fetching cart:', error)
      setError('Failed to load your cart. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [touristId])

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return // Prevent setting quantity below 1

    try {
      await axios.put(`/api/Tourist/changeCartItemQuantity/${touristId}`, { productId, quantity: newQuantity })
      await fetchCart() // Refetch the cart to get the updated data from the database
    } catch (error) {
      console.error('Error updating cart quantity:', error)
      setError('Failed to update quantity. Please try again.')
    }
  }

  const removeItem = async (productId: string) => {
    try {
      await axios.delete(`/api/Tourist/removeProductFromCart/${touristId}`, { data: { productId } })
      await fetchCart() // Refetch the cart to get the updated data from the database
    } catch (error) {
      console.error('Error removing product from cart:', error)
      setError('Failed to remove item. Please try again.')
    }
  }

  const total = cartItems.reduce(
    (sum, item) => sum + (item.product.price || 0) * item.quantity,
    0
  )

  if (loading) {
    return <p>Loading your cart...</p>
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  const handleProceedToCheckout = () => {
    // Redirect to the address page
    navigate(`/AddressPage/${touristId}`) // Adjust the route as needed
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.product._id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <h2 className="font-semibold">{item.product.name}</h2>
                  <p className="text-sm text-gray-500">
                    ${item.product.price?.toFixed(2)} each
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label={`Decrease quantity of ${item.product.name}`}
                    disabled={item.quantity <= 1}
                  >
                    <MinusCircle size={20} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label={`Increase quantity of ${item.product.name}`}
                  >
                    <PlusCircle size={20} />
                  </button>
                  <button
                    onClick={() => removeItem(item.product._id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                    aria-label={`Remove ${item.product.name} from cart`}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <button
              onClick={handleProceedToCheckout}
              style={{
                backgroundColor: '#FF3366', 
                color: 'white', 
                padding: '10px 20px', 
                borderRadius: '8px', 
                cursor: 'pointer', 
                transition: 'background-color 0.3s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#E62E5C')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#FF3366')}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}
