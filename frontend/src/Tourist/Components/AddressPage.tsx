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
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null) // Track the selected address
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

  // Handle checkbox selection for addresses (using backend select/unselect methods)
  const handleCheckboxChange = async (addressId: string) => {
    try {
      if (addressId === selectedAddress) {
        // If the selected address is already selected, unselect it
        await axios.put(`/api/Tourist/unselectAddress/${touristId}`, { index: addresses.findIndex((address) => address._id === addressId) })
        setSelectedAddress(null) // Unselect address locally
      } else {
        // Select the new address
        await axios.put(`/api/Tourist/selectAddress/${touristId}`, { index: addresses.findIndex((address) => address._id === addressId) })
        setSelectedAddress(addressId) // Update selected address locally
      }
    } catch (error) {
      console.error('Error selecting or unselecting address:', error)
      setError('Failed to select or unselect address. Please try again.')
    }
  }

  useEffect(() => {
    fetchAddresses() // Fetch addresses when the component mounts
  }, [])

  return (
    <div className="container mx-auto p-4 max-w-2xl">

      {/* Error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Address List */}
      <div>
        {addresses.length === 0 ? (
          <p>No addresses found. Please add a new one.</p>
        ) : (
          <ul className="space-y-4">
            {addresses.map((address, index) => (
              <li key={address._id} className={`flex items-center justify-between border p-4 rounded-lg shadow-sm  ${selectedAddress === address._id ? 'bg-gray-100 border-primary ' : ''}`}>
                <div>
                  <p className="font-semibold">{address.street}</p>
                  <p>{address.city}, {address.state}, {address.zip}</p>
                  <p>{address.country}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleCheckboxChange(address._id)}
                    className={`py-2 px-4 rounded-md ${selectedAddress === address._id ? 'bg-primary text-white' : 'bg-transparent border border-primary text-primary'} hover:bg-hover hover:text-white transition`}
                  >
                    Select
                  </button>
                  <button
                    onClick={() => handleEditAddress(index)}
                    className="text-secondary p-2 hover:bg-secondary hover:text-white"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(index)}
                    className="text-darkPink p-2 hover:bg-darkPink hover:text-white"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </div>
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
