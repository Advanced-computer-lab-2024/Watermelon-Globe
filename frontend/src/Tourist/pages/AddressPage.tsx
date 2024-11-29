'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa'

interface Address {
  _id: string
  street: string
  city: string
  state: string
  zip: string
  country: string
}

export default function AddressPage() {
  const params = useParams()
  const touristId = params.touristId
  const [addresses, setAddresses] = useState<Address[]>([])
  const [newAddress, setNewAddress] = useState<Address>({
    _id: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [selectedAddresses, setSelectedAddresses] = useState<string[]>([]) // Track selected addresses
  const [showAddForm, setShowAddForm] = useState<boolean>(false) // Track whether to show the add address form

  // Fetch existing addresses from backend
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`/api/Tourist/getAddresses/${touristId}`)
      const fetchedAddresses = response.data || []
      setAddresses(fetchedAddresses.filter((address: Address) => address !== null && address !== undefined))
    } catch (error) {
      console.error('Error fetching addresses:', error)
      setError('Failed to load addresses. Please try again.')
    }
  }

  // Handle input changes for the new address form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewAddress((prev) => ({ ...prev, [name]: value }))
  }

  // Handle the selection of an address (for editing)
  const handleEditAddress = (index: number) => {
    setNewAddress(addresses[index])
    setShowAddForm(true) // Show form for editing
  }

  // Submit address to the backend (either for adding or updating)
  const handleSubmitAddress = async () => {
    try {
      // Determine if we're adding or updating the address
      if (newAddress._id) {
        // If the address has an _id, we're updating it
        const body = { index: addresses.findIndex((address) => address._id === newAddress._id), address: newAddress }
        await axios.put(`/api/Tourist/updateAddress/${touristId}`, body)
        setError(null)
      } else {
        // If there's no _id, we're adding a new address
        const body = { address: newAddress }
        await axios.post(`/api/Tourist/addAddress/${touristId}`, body)
        setError(null)
      }

      // Fetch updated addresses
      fetchAddresses()

      // Reset form
      setNewAddress({
        _id: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
      })
      setShowAddForm(false) // Hide form after submit
    } catch (error) {
      console.error('Error adding or updating address:', error)
      setError('Failed to add or update address. Please try again.')
    }
  }

  // Handle deleting a specific address by index
  const handleDeleteAddress = async (index: number) => {
    try {
      await axios.delete(`/api/Tourist/deleteAddress/${touristId}`, { data: { index } })
      fetchAddresses()
      setNewAddress({
        _id: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
      })
      setShowAddForm(false) // Reset the form to "Add Address" state
    } catch (error) {
      console.error('Error deleting address:', error)
      setError('Failed to delete address. Please try again.')
    }
  }

  // Handle deleting all addresses
  const handleDeleteAllAddresses = async () => {
    try {
      await axios.delete(`/api/Tourist/deleteAllAddresses/${touristId}`)
      fetchAddresses()
      setNewAddress({
        _id: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
      })
      setShowAddForm(false) // Hide form after deleting all
    } catch (error) {
      console.error('Error deleting all addresses:', error)
      setError('Failed to delete all addresses. Please try again.')
    }
  }

  // Handle checkbox selection for addresses
  const handleCheckboxChange = (addressId: string) => {
    setSelectedAddresses((prevSelected) =>
      prevSelected.includes(addressId)
        ? prevSelected.filter((id) => id !== addressId)
        : [...prevSelected, addressId]
    )
  }

  useEffect(() => {
    fetchAddresses() // Fetch addresses when the component mounts
  }, [])

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Delivery Addresses</h1>

      {/* Error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Address List */}
      <div>
        <h2 className="text-xl font-semibold">Choose an Address</h2>
        {addresses.length === 0 ? (
          <p>No addresses found. Please add a new one.</p>
        ) : (
          <ul className="space-y-4">
            {addresses.map((address, index) => (
              <li key={address._id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p>{address.street}</p>
                  <p>{address.city}, {address.state} {address.zip}</p>
                  <p>{address.country}</p>
                </div>
                <input
                  type="checkbox"
                  checked={selectedAddresses.includes(address._id)}
                  onChange={() => handleCheckboxChange(address._id)}
                  className="mr-4"
                />
                <button
                  onClick={() => handleEditAddress(index)}
                  className="text-[#2E8B57] p-2"
                >
                  <FaEdit size={20} />
                </button>
                <button
                  onClick={() => handleDeleteAddress(index)}
                  className="text-[#FF3366] p-2"
                >
                  <FaTrashAlt size={20} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add New Address Button */}
      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center mt-4 bg-secondary hover:bg-secondaryHover text-white px-4 py-2 rounded-md"
          >
          <FaPlus className="mr-2" />
          Add New Address
        </button>
      )}

      {/* Add or Edit Address Form */}
      {showAddForm && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">{newAddress._id ? 'Edit Address' : 'Add New Address'}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmitAddress()
            }}
            className="space-y-4"
          >
            <input
              type="text"
              name="street"
              value={newAddress.street}
              onChange={handleInputChange}
              placeholder="Street Address"
              className="w-full px-4 py-2 border rounded-md"
              required
            />
            <input
              type="text"
              name="city"
              value={newAddress.city}
              onChange={handleInputChange}
              placeholder="City"
              className="w-full px-4 py-2 border rounded-md"
              required
            />
            <input
              type="text"
              name="state"
              value={newAddress.state}
              onChange={handleInputChange}
              placeholder="State"
              className="w-full px-4 py-2 border rounded-md"
              required
            />
            <input
              type="text"
              name="zip"
              value={newAddress.zip}
              onChange={handleInputChange}
              placeholder="Zip Code"
              className="w-full px-4 py-2 border rounded-md"
              required
            />
            <input
              type="text"
              name="country"
              value={newAddress.country}
              onChange={handleInputChange}
              placeholder="Country"
              className="w-full px-4 py-2 border rounded-md"
              required
            />
            <button
              type="submit"
              className="mt-4 bg-secondary hover:bg-secondaryHover text-white w-full px-6 py-2 rounded-md"
            >
              {newAddress._id ? 'Update Address' : 'Add Address'}
            </button>

            {/* Hide Form Button */}
            <button
              onClick={() => setShowAddForm(false)}
              className="mt-2 w-full bg-primary hover:bg-hover text-white px-6 py-2 rounded-md"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
