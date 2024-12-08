'use client'

import { useState, useEffect } from 'react'
import React from 'react'
import { FaTrashAlt, FaMinus, FaPlus, FaShoppingCart, FaMoneyBillWave } from 'react-icons/fa'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import PaymentSummary from '../Components/PaymentSummary'
import WalletComponent from '../Components/Wallet';
import TouristNavbar from "../Components/TouristNavBar";

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
  const navigate = useNavigate();
  const touristId = params.touristId as string
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

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

  const handleProceedToCheckout = () => {
    navigate(`/CheckoutPage/${touristId}`, { state: { total: total } })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8" style={{ margin: "-20px" }}>
      <TouristNavbar id={touristId} />
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary p-5 relative">
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-full p-2">
                <FaShoppingCart className="h-16 w-16 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Your Shopping Cart</h1>
                <p className="text-white opacity-75">{cartItems.length} item(s) in your cart</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {error && <p className="text-red-500 text-center">{error}</p>}

            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
              <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
                <h2 className="text-xl font-semibold text-secondary mb-4">Cart Items</h2>
                <ul className="space-y-4">
                  {cartItems.map((item) => (
                    <li
                      key={item.product._id}
                      className="flex items-center justify-between border-b pb-4"
                    >
                      <div>
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <p className="text-sm text-gray-500">
                          ${item.product.price?.toFixed(2)} each
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                          className="text-secondary p-2 hover:bg-secondaryHover hover:text-white flex items-center justify-center"
                          aria-label={`Decrease quantity of ${item.product.name}`}
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus size={16} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                          className="text-secondary p-2 hover:bg-secondaryHover hover:text-white flex items-center justify-center"
                          aria-label={`Increase quantity of ${item.product.name}`}
                        >
                          <FaPlus size={16} />
                        </button>
                        <button
                          onClick={() => removeItem(item.product._id)}
                          className="text-darkPink p-2 hover:bg-darkPink hover:text-white flex items-center justify-center"
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <FaTrashAlt size={16} />
                        </button>
                      </div>

                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
              <h2 className="text-xl font-semibold text-secondary mb-4">Order Summary</h2>
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">Total:</p>
                <p className="text-2xl font-bold text-primary">${total.toFixed(2)}</p>
              </div>
            </div>

            <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-hover transition-colors flex items-center justify-center"
                disabled={cartItems.length === 0}
              >
                <FaMoneyBillWave className="mr-2" />
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
