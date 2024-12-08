import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import HotelBooking from './HotelBooking';
import { fetchAccessToken, getHotelOffersById } from '../api';
import { FaCalendarAlt, FaUsers, FaBed, FaSearch, FaHotel } from 'react-icons/fa'
import TouristNavbar from "../../Tourist/Components/TouristNavBar";

const BookingPage = () => {
  const params = useParams()
  const hotelId = params.hotelId as string
  const touristId = params.touristId as string
  const hotelName = params.hotelName as string

  const [checkInDate, setCheckInDate] = useState(new Date())
  const [checkOutDate, setCheckOutDate] = useState(new Date())
  const [adults, setAdults] = useState(1)
  const [roomQuantity, setRoomQuantity] = useState(1)
  const [message, setMessage] = useState('')
  const [token, setToken] = useState('')
  const [hotelOffers, setHotelOffers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const fetchedToken = await fetchAccessToken()
        setToken(fetchedToken)
      } catch (error) {
        console.error('Error fetching access token:', error)
        setMessage('Error fetching access token')
      }
    }

    fetchToken()
  }, [])

  const handleSearchClick = async () => {
    if (!token) {
      setMessage('Error: Access token is missing.')
      return
    }

    setLoading(true)
    setMessage('')
    setHotelOffers([])

    try {
      const formattedCheckInDate = checkInDate.toISOString().split('T')[0]
      const formattedCheckOutDate = checkOutDate.toISOString().split('T')[0]

      const response = await getHotelOffersById({
        token,
        hotelId: [hotelId],
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        adults: parseInt(adults.toString(), 10),
        roomQuantity: parseInt(roomQuantity.toString(), 10),
        currency: 'USD',
      })

      console.log("Hotel Offers:", response)

      if (response && response[0] && response[0].offers && response[0].offers.length > 0) {
        setHotelOffers(response[0].offers)
      } else {
        setMessage('No offers found for the selected dates and parameters.')
      }
    } catch (error) {
      console.error('Error fetching hotel offers:', error)
      setMessage('Failed to fetch hotel offers. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleBookClick = async (offer) => {
    try {
      const response = await axios.post(`/api/Tourist/bookHotel/${touristId}`, {
        hotelId,
        roomType: offer?.room?.description?.text,
        price: offer?.price?.base,
        currency: offer?.price?.currency,
        checkInDate: offer?.checkInDate,
        checkOutDate: offer?.checkOutDate,
      })

      const response2 = await axios.put(`/api/Tourist/updateLoyaltyPoints/${touristId}`, {
        amountPaid: offer?.price?.base
      })

      console.log('Booking successful:', response.data)
      alert(`Booking successful!\nLoyalty Points: ${response2.data.loyaltyPoints}\nBadge: ${response2.data.badge}`)
    } catch (error) {
      console.error('Error booking hotel:', error)
      alert('Booking failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <TouristNavbar id={touristId} />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary p-5 relative">
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-full p-2">
                <FaHotel className="h-16 w-16 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Hotel Booking</h1>
                <p className="text-white opacity-75">{hotelName}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
              <h2 className="text-xl font-semibold text-secondary mb-4">Search for Offers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-600 mb-1">Check-In Date</label>
                  <div className="relative">
                    <DatePicker
                      id="checkInDate"
                      selected={checkInDate}
                      onChange={(date: Date) => setCheckInDate(date)}
                      dateFormat="yyyy-MM-dd"
                      className="w-full p-2 border rounded-md pl-10"
                    />
                    <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-600 mb-1">Check-Out Date</label>
                  <div className="relative">
                    <DatePicker
                      id="checkOutDate"
                      selected={checkOutDate}
                      onChange={(date: Date) => setCheckOutDate(date)}
                      dateFormat="yyyy-MM-dd"
                      className="w-full p-2 border rounded-md pl-10"
                    />
                    <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="adults" className="block text-sm font-medium text-gray-600 mb-1">Number of Adults</label>
                  <div className="relative">
                    <input
                      id="adults"
                      type="number"
                      value={adults}
                      min="1"
                      onChange={(e) => setAdults(parseInt(e.target.value))}
                      className="w-full p-2 border rounded-md pl-10"
                    />
                    <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="roomQuantity" className="block text-sm font-medium text-gray-600 mb-1">Number of Rooms</label>
                  <div className="relative">
                    <input
                      id="roomQuantity"
                      type="number"
                      value={roomQuantity}
                      min="1"
                      onChange={(e) => setRoomQuantity(parseInt(e.target.value))}
                      className="w-full p-2 border rounded-md pl-10"
                    />
                    <FaBed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>
              <button
                onClick={handleSearchClick}
                className="mt-4 w-full bg-primary text-white px-6 py-3 rounded-md hover:bg-hover transition-colors flex items-center justify-center"
              >
                <FaSearch className="mr-2" />
                Search Offers
              </button>
            </div>

            {loading && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-gray-500">Loading offers...</p>
              </div>
            )}

            {message && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                <p className="font-bold">Error</p>
                <p>{message}</p>
              </div>
            )}

            {hotelOffers.length > 0 && (
              <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
                <h2 className="text-xl font-semibold text-secondary mb-4">Hotel Offers</h2>
                <div className="space-y-4">
                  {hotelOffers.map((offer, index) => (
                    <div key={index} className="border p-4 rounded-lg shadow-sm">
                      <h3 className="font-semibold text-lg mb-2">{hotelName}</h3>
                      <p className="mb-1"><strong>Price:</strong> {offer?.price?.base} {offer?.price?.currency}</p>
                      <p className="mb-1"><strong>Check-In:</strong> {offer?.checkInDate}</p>
                      <p className="mb-1"><strong>Check-Out:</strong> {offer?.checkOutDate}</p>
                      <p className="mb-3"><strong>Room Type:</strong> {offer?.room?.description?.text}</p>
                      <HotelBooking hotel={offer} touristId={touristId} hotelName={hotelName} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage
