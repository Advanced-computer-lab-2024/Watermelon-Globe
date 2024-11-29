'use client'

import { useState } from 'react'
import React from 'react'
import { Trash2, MinusCircle, PlusCircle } from 'lucide-react'
import { Button } from "../Tourist/Components/ui/button"
interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Wireless Earbuds", price: 79.99, quantity: 1 },
    { id: 2, name: "Smartphone Case", price: 19.99, quantity: 2 },
    { id: 3, name: "USB-C Cable", price: 9.99, quantity: 3 },
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
    ).filter(item => item.quantity > 0))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map(item => (
              <li key={item.id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Decrease quantity"
                  >
                    <MinusCircle size={20} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Increase quantity"
                  >
                    <PlusCircle size={20} />
                  </button>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                    aria-label="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <Button>
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

