import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaWallet, FaCreditCard } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FaCalendar, FaTags, FaDollarSign, FaMapMarkerAlt, FaClock, FaTag, FaStar, FaShare, FaEnvelope, FaBookmark } from 'react-icons/fa'
import TouristNavbar from "../Components/TouristNavBar";
import WalletComponent from "../Components/Wallet";
import { useCurrency } from "../Components/CurrencyContext";

const stripePromise = loadStripe('pk_test_51QQWIBKTPpyea1n0DvMMy6pxbX2ihuoDsD1K5Hbrsrh5hkw2mG214K159dORl0oA9otHspuTTPMP7NbqgP8buKhE00qzg5wBBP');



interface Currency {
  symbol_native: string;
  // Add other fields from the currency object as needed
}

interface CurrencyContextType {
  selectedCurrency: string | null;
  currencies: { [key: string]: Currency };
}


interface Tag {
  _id: string
  name: string
}

interface Category {
  _id: string
  name: string
}

interface Location {
  type: string
  coordinates: [number, number]
}

interface Rating {
  user: string
  rating: number
}

interface Comment {
  user: string
  comment: string
  date: string
}

interface Activity {
  _id: string
  Name: string
  Date: string 
  Time: string
  Location: Location
  Price: number
  priceRange: number[]
  Category: Category | null
  tags: Tag[]
  Discount: number
  bookingOpen: boolean
  ratings: Rating[]
  rating: number
  noOfRatings: number
  Advertiser: string | null
  comments: Comment[]
}

const ActivityDetails: React.FC = () => {
  const params = useParams()
  const activityId = params.activityId as string
  const id = params.id as string



  const [activity, setActivity] = useState<Activity | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'stripe'>('stripe'); // Default to stripe payment
  const [bookingInProgress, setBookingInProgress] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const { selectedCurrency, currencies } = useCurrency() as CurrencyContextType;
  const [message, setMessage] = useState<string | null>(null)
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axios.get(`/api/Activities/getActivityById/${activityId}`)
        setActivity(response.data)
      } catch (err) {
        setError('Failed to load activity details. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    const checkBookmarkStatus = async () => {
      try {
        const bookmarkResponse = await axios.get(`/api/Tourist/checkBookmarkActivity/${id}/${activityId}`)
        setIsBookmarked(bookmarkResponse.data.isBookmarked)
      } catch (error) {
        console.error('Error checking bookmark status:', error)
      }
    }

    fetchActivity()
    checkBookmarkStatus()
  }, [activityId, id])

  const handleShareLink = () => {
    const activityUrl = `${window.location.origin}/TouristActivityDetails/${activityId}/${id}`
    navigator.clipboard
      .writeText(activityUrl)
      .then(() => alert('Activity link copied to clipboard!'))
      .catch((err) => alert('Failed to copy link: ' + err))
  }

  const handleShareEmail = () => {
    const activityUrl = `${window.location.origin}/TouristActivityDetails/${activityId}/${id}`
    const subject = encodeURIComponent('Check out this activity!')
    const body = encodeURIComponent(`I thought you might be interested in this activity: ${activityUrl}`)
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  const handleBookmark = async () => {
    try {
      if (isBookmarked) {
        await axios.put(`/api/Tourist/removeBookmarkActivity/${id}/${activityId}`)
      } else {
        await axios.put(`/api/Tourist/bookmarkActivity/${id}/${activityId}`)
      }
      setIsBookmarked(!isBookmarked)
      alert(isBookmarked ? 'Activity removed from bookmarks' : 'Activity added to bookmarks')
    } catch (error) {
      console.error('Error toggling bookmark:', error)
      alert('Error toggling bookmark. Please try again.')
    }
  }

  const handleBooking = async (e: React.FormEvent) => {

    e.preventDefault()


    
    if (!paymentMethod || !activity) {
      alert('Please select a payment method before booking.')
      return
    }

    try {
      if (paymentMethod === 'wallet') {
        const walletResponse = await axios.put(`/api/Tourist/updateWallet/${id}`, {
          amount: -activity.Price,
        })

        if (walletResponse.data.wallet >= 0) {
          alert('Payment confirmed using Wallet!')

          await axios.post('/api/TouristItinerary/createActivityBooking', {
            activity: activityId,
            tourist: id,
            chosenDate: activity.Date,
          })

          await axios.put(`/api/Tourist/updateLoyaltyPoints/${id}`, {
            amountPaid: activity.Price,
          })

          alert('Activity booked successfully!')
        } else {
          await axios.put(`/api/Tourist/updateWallet/${id}`, {
            amount: +activity.Price,
          })
          alert('Insufficient wallet balance.')
        }
      } else if (paymentMethod === 'stripe') {
        // Handle payment with Stripe

        const paymentIntentResponse = await axios.post(`/api/Tourist/payActivity`, {
          activityId: activityId,
        });

        const { clientSecret } = paymentIntentResponse.data;

        if (!stripe || !elements) {
          setMessage('Stripe has not loaded yet. Please try again.');
          return;
        }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) return;
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: cardElement },
        });

        if (paymentResult.paymentIntent?.status === 'succeeded') {
          alert('Payment confirmed using Stripe!')

          await axios.post('/api/TouristItinerary/createActivityBooking', {
            activity: activityId,
            tourist: id,
            chosenDate: activity.Date,
          })

          await axios.put(`/api/Tourist/updateLoyaltyPoints/${id}`, {
            amountPaid: activity.Price,
          })

          alert('Activity booked successfully!')
        }
      }
    } catch (error: any) {
      console.error('Error during payment or booking:', error);
      setMessage(`Error: ${error.message}`);
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-center text-xl mt-10">{error}</div>
  }

  if (!activity) {
    return <div className="text-gray-700 text-center text-xl mt-10">No activity found.</div>
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


  return (
    <div className="min-h-screen bg-background p-8" style={{ margin: "-20px" }}>
      <TouristNavbar id={id} />
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary p-5 relative">
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-full p-2">
                <FaDollarSign className="h-16 w-16 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">{activity.Name}</h2>
                <p className="text-white opacity-75">Activity Details</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
              <h3 className="text-xl font-semibold text-secondary mb-4">Activity Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="flex items-center text-gray-700">
                    <FaMapMarkerAlt className="mr-2 text-primary" />
                    <span>{`Lat: ${activity.Location.coordinates[1]}, Long: ${activity.Location.coordinates[0]}`}</span>
                  </p>
                  <p className="flex items-center text-gray-700">
                    <FaCalendar className="mr-2 text-primary" />
                    <span>{new Date(activity.Date).toLocaleDateString()}</span>
                  </p>
                  <p className="flex items-center text-gray-700">
                    <FaClock className="mr-2 text-primary" />
                    <span>{activity.Time}</span>
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="flex items-center text-gray-700">
                    <FaStar className="mr-2 text-primary" />
                    <span>
                      {activity.rating
                        ? `${activity.rating.toFixed(1)} / 5 (${activity.noOfRatings} ratings)`
                        : 'No Ratings Yet'}
                    </span>
                  </p>
                  <p className="flex items-center text-gray-700">
                    <FaTag className="mr-2 text-primary" />
                    <span>{activity.tags.map((tag) => tag.name).join(', ') || 'No Tags'}</span>
                  </p>
                  <p className="flex items-center text-gray-700">
                    <FaDollarSign className="mr-2 text-primary" />
                    <span className="font-medium">
                      {currencySymbol}
                      {selectedCurrency
                        ? (activity.Price * getCurrencyConversionRate(selectedCurrency)).toFixed(2)
                        : activity.Price.toFixed(2)}
                      {activity.Discount > 0 && (
                        <span className="text-secondary ml-2">{`(${activity.Discount}% Off)`}</span>
                      )}
                    </span>
                  </p>

                </div>
              </div>
            </div>

            <form
                onSubmit={handleBooking}
                className="bg-cardBackground shadow-md rounded-lg p-6 max-w-md mx-auto mt-10"
              >
                <div className="mb-4">
                  <label className="block text-secondary font-semibold mb-2">Select Payment Method:</label>
                  <div className="flex space-x-4 mb-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('wallet')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${paymentMethod === 'wallet' ? 'bg-primary text-white hover:bg-hover' : 'bg-lightGray text-secondary hover:bg-secondaryHover hover:text-white'}`}
                    >
                      <FaWallet className="text-xl" />
                      <span>Wallet</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('stripe')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${paymentMethod === 'stripe' ? 'bg-primary text-white hover:bg-hover' : 'bg-lightGray text-secondary hover:bg-secondaryHover hover:text-white'}`}
                    >
                      <FaCreditCard className="text-xl" />
                      <span>Credit Card (Stripe)</span>
                    </button>
                  </div>
                </div>

                {paymentMethod === 'stripe' && (
                  <div className="mb-4">
                    <label className="block text-secondary font-semibold mb-2">Enter Payment Details:</label>
                    <div className="border border-lightGray p-4 rounded-lg bg-lightGray">
                      <CardElement className="text-grayText" />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 rounded-lg shadow-md hover:bg-hover"
                  disabled={!stripe}
                >
                  Pay and Book
                </button>

                {message && <p className="text-red-500 mt-4">{message}</p>}
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

export default ActivityDetails


