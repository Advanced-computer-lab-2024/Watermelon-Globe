import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaStar, FaMapMarkerAlt, FaClock, FaCalendar, FaDollarSign, FaLanguage,
  FaWheelchair, FaShare, FaEnvelope, FaBookmark
} from 'react-icons/fa'
import axios from "axios";
import PaymentOptions2 from "../Components/PaymentOptions2";
import WalletComponent from "../Components/Wallet";
import TouristNavbar from "../Components/TouristNavBar";
import { useCurrency } from "../Components/CurrencyContext";

interface Currency {
  symbol_native: string;
  // Add other fields from the currency object as needed
}

interface CurrencyContextType {
  selectedCurrency: string | null;
  currencies: { [key: string]: Currency };
}

interface Itinerary {
  name: string
  locations: string[]
  activities: { activityName: string; duration: string }[]
  timeline: string
  languageOfTour: string
  priceOfTour: number
  accessibility: boolean
  rating: number
  availableDates: string[]
  availableTimes: string[]
}

const ItineraryDetails = () => {
  const params = useParams()
  const tripid = params.tripid as string
  const id = params.id as string

  const [itinerary, setItinerary] = useState<Itinerary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'creditCard' | null>(null)
  const [bookingMessage, setBookingMessage] = useState<string | null>(null)
  const [bookingInProgress, setBookingInProgress] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const { selectedCurrency, currencies } = useCurrency() as CurrencyContextType;

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await fetch(`/api/Itinerary/getItinerary/${tripid}`)
        if (!response.ok) {
          throw new Error('Itinerary not found')
        }
        const data = await response.json()
        setItinerary(data)
      } catch (error) {
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    const checkBookmarkStatus = async () => {
      try {
        const bookmarkResponse = await axios.get(`/api/Tourist/checkBookmarkItinerary/${id}/${tripid}`)
        setIsBookmarked(bookmarkResponse.data.isBookmarked)
      } catch (error) {
        console.error('Error checking bookmark status:', error)
      }
    }

    fetchItinerary()
    checkBookmarkStatus()
  }, [tripid, id])

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!paymentMethod || !itinerary) {
      alert('Please select a payment method before booking.')
      return
    }

    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time.')
      return
    }

    setBookingInProgress(true)
    setError(null)

    try {
      if (paymentMethod === 'wallet') {
        const walletResponse = await axios.put(`/api/Tourist/updateWallet/${id}`, {
          amount: -itinerary.priceOfTour,
        })

        if (walletResponse.data.wallet >= 0) {
          alert('Payment confirmed using Wallet!')

          await axios.post('/api/TouristItinerary/createChildItinerary', {
            itinerary: tripid,
            buyer: id,
            chosenDates: [selectedDate],
            chosenTimes: [selectedTime],
            totalPrice: itinerary.priceOfTour,
            status: 'pending',
          })

          await axios.put(`/api/Tourist/updateLoyaltyPoints/${id}`, {
            amountPaid: itinerary.priceOfTour,
          })

          alert('Itinerary booked successfully!')
        } else {
          await axios.put(`/api/Tourist/updateWallet/${id}`, {
            amount: +itinerary.priceOfTour,
          })
          alert('Insufficient wallet balance.')
        }
      } else if (paymentMethod === 'creditCard') {
        alert('Proceeding with credit card payment (Stripe)...')

        await axios.post('/api/TouristItinerary/createChildItinerary', {
          itinerary: tripid,
          buyer: id,
          chosenDates: [selectedDate],
          chosenTimes: [selectedTime],
          totalPrice: itinerary.priceOfTour,
          status: 'pending',
        })

        await axios.put(`/api/Tourist/updateLoyaltyPoints/${id}`, {
          amountPaid: itinerary.priceOfTour,
        })

        alert('Itinerary booked successfully!')
      }
    } catch (err) {
      console.error('Error during booking:', err)
      alert('An error occurred while processing the booking. Please try again later.')
    } finally {
      setBookingInProgress(false)
    }
  }

  const handleShareLink = () => {
    const itineraryUrl = `${window.location.origin}/ItineraryDetails/${tripid}/${id}`
    navigator.clipboard
      .writeText(itineraryUrl)
      .then(() => alert('Itinerary link copied to clipboard!'))
      .catch((err) => alert('Failed to copy link: ' + err))
  }

  const handleShareEmail = () => {
    const itineraryUrl = `${window.location.origin}/ItineraryDetails/${tripid}/${id}`
    const subject = encodeURIComponent('Check out this itinerary!')
    const body = encodeURIComponent(`I thought you might be interested in this itinerary: ${itineraryUrl}`)
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  const handleBookmark = async () => {
    try {
      if (isBookmarked) {
        await axios.put(`/api/Tourist/removeBookmarkItinerary/${id}/${tripid}`)
      } else {
        await axios.put(`/api/Tourist/bookmarkItinerary/${id}/${tripid}`)
      }
      setIsBookmarked(!isBookmarked)
      alert(isBookmarked ? 'Itinerary removed from bookmarks' : 'Itinerary added to bookmarks')
    } catch (error) {
      console.error('Error toggling bookmark:', error)
      alert('Error toggling bookmark. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-center text-xl mt-10">Error: {error}</div>
  }

  if (!itinerary) return null

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


  return (
    <div className="min-h-screen bg-background p-8" style={{ margin: "-20px" }}>
      <TouristNavbar id={id} />
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary p-5 relative">
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-full p-2">
                <FaMapMarkerAlt className="h-16 w-16 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">{itinerary.name}</h2>
                <p className="text-white opacity-75">{itinerary.locations.join(', ')}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
              <h3 className="text-xl font-semibold text-secondary mb-4">Activities</h3>
              <ul className="space-y-2 max-h-60 overflow-y-auto pr-4">
                {itinerary.activities.map((activity, index) => (
                  <li key={index} className="flex justify-between items-center bg-white p-3 rounded shadow">
                    <span className="text-gray-800 font-medium">{activity.activityName}</span>
                    <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{activity.duration}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
              <h3 className="text-xl font-semibold text-secondary mb-4">Timeline</h3>
              <p className="text-gray-600 leading-relaxed">{itinerary.timeline}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
                <h3 className="text-lg font-semibold text-secondary mb-2 flex items-center">
                  <FaLanguage className="mr-2" /> Language of Tour
                </h3>
                <p className="text-gray-600">{itinerary.languageOfTour}</p>
              </div>

              <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
                <h3 className="text-lg font-semibold text-secondary mb-2 flex items-center">
                  <FaDollarSign className="mr-2" /> Price
                </h3>
                <p className="text-gray-600 text-2xl font-bold">
                  {currencySymbol}
                  {selectedCurrency
                    ? (itinerary.priceOfTour * getCurrencyConversionRate(selectedCurrency)).toFixed(2)
                    : itinerary.priceOfTour.toFixed(2)}


                </p>
              </div>

              <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
                <h3 className="text-lg font-semibold text-secondary mb-2 flex items-center">
                  <FaWheelchair className="mr-2" /> Accessibility
                </h3>
                <p className="text-gray-600">{itinerary.accessibility ? 'Yes' : 'No'}</p>
              </div>
            </div>

            <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
              <h3 className="text-xl font-semibold text-secondary mb-2 flex items-center">
                <FaStar className="mr-2" /> Average Rating
              </h3>
              <p className="text-lg font-medium text-gray-800">{itinerary.rating} / 5</p>
            </div>

            <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
              <h3 className="text-xl font-semibold text-secondary mb-4">Payment Options</h3>
              <PaymentOptions2
                paymentMethod={paymentMethod}
                onPaymentMethodSelection={setPaymentMethod}
              />
            </div>

            <form onSubmit={handleBooking} className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
              <h3 className="text-xl font-semibold text-secondary mb-4">Book Your Itinerary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                    <FaCalendar className="mr-2" /> Choose Date
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-4">
                    {itinerary.availableDates.map((date, index) => (
                      <label key={index} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="date"
                          value={date}
                          checked={selectedDate === date}
                          onChange={() => setSelectedDate(date)}
                          className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="text-gray-700">{new Date(date).toLocaleDateString()}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                    <FaClock className="mr-2" /> Choose Time
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-4">
                    {itinerary.availableTimes.map((time, index) => (
                      <label key={index} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="time"
                          value={time}
                          checked={selectedTime === time}
                          onChange={() => setSelectedTime(time)}
                          className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="text-gray-700">{time}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-hover transition-colors"
                  disabled={bookingInProgress}
                >
                  {bookingInProgress ? 'Booking...' : 'Book Now'}
                </button>
                {bookingMessage && <p className="text-lg text-gray-600">{bookingMessage}</p>}
              </div>
            </form>

            <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
              <h3 className="text-xl font-semibold text-secondary mb-4">Actions</h3>
              <div className="space-y-4">
                <button
                  onClick={handleBookmark}
                  className={`flex items-center justify-center px-4 py-2 text-sm font-semibold text-white rounded-lg ${isBookmarked ? 'bg-primary hover:bg-hover' : 'bg-secondary hover:bg-secondaryHover '
                    }`}
                  aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                >
                  <FaBookmark className="mr-2" />
                  {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </button>
                <div className="flex justify-between">
                  <button
                    className="flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-secondary rounded-lg hover:bg-secondaryHover focus:outline-none"
                    onClick={handleShareLink}
                  >
                    <FaShare className="mr-2 inline" />
                    Share Link
                  </button>
                  <button
                    className="flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-secondary rounded-lg hover:bg-secondaryHover focus:outline-none"
                    onClick={handleShareEmail}
                  >
                    <FaEnvelope className="mr-2 inline" />
                    Share via Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItineraryDetails
