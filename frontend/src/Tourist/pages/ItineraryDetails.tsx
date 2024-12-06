import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Clock, Calendar, DollarSign, Languages, Accessibility, Truck, Users, AlertCircle } from 'lucide-react';
import axios from 'axios';
import PaymentOptions2 from '../Components/PaymentOptions2';
import WalletComponent from '../Components/Wallet';

const ItineraryDetails = () => {
  const { tripid, id } = useParams();
  const [itinerary, setItinerary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'creditCard' | null>(null);
  const [bookingMessage, setBookingMessage] = useState<string | null>(null);
  const [bookingInProgress, setBookingInProgress] = useState(false);

  // Fetch itinerary details
  const fetchItinerary = async () => {
    try {
      const response = await fetch(`/api/Itinerary/getItinerary/${tripid}`);
      if (!response.ok) {
        throw new Error('Itinerary not found');
      }
      const data = await response.json();
      setItinerary(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItinerary();
  }, [tripid]);

      const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!paymentMethod || !itinerary) {
            alert('Please select a payment method before booking.');
            return;
        }

        if (!selectedDate || !selectedTime) {
          alert('Please select a date and time.');
          return;
      }

        setBookingInProgress(true); // Show loading state
        setError(null); // Clear previous errors

        try {
            if (paymentMethod === 'wallet') {
                // Check and update wallet balance
                const walletResponse = await axios.put(`/api/Tourist/updateWallet/${id}`, {
                    amount: -itinerary.priceOfTour,
                });

                if (walletResponse.data.wallet >= 0) {
                    // Wallet payment successful
                    alert('Payment confirmed using Wallet!');

                    // Create booking
                    await axios.post('/api/TouristItinerary/createChildItinerary', {
                        itinerary: tripid,
                        buyer: id,
                        chosenDates: [selectedDate],
                        chosenTimes: [selectedTime],
                        totalPrice: itinerary.priceOfTour,
                        status: 'pending',
                    });

                    // Update loyalty points
                    await axios.put(`/api/Tourist/updateLoyaltyPoints/${id}`, {
                        amountPaid: itinerary.priceOfTour,
                    });

                    // Notify booking success
                    alert('Itinerary booked successfully!');
                } else {
                    // Insufficient balance, rollback wallet
                    await axios.put(`/api/Tourist/updateWallet/${id}`, { amount: +itinerary.priceOfTour });
                    alert('Insufficient wallet balance.');
                }
            } else if (paymentMethod === 'creditCard') {
                // Implement Stripe payment logic here
                alert('Proceeding with credit card payment (Stripe)...');

                // Assuming Stripe payment succeeds:
                await axios.post('/api/TouristItinerary/createChildItinerary', {
                    itinerary: tripid,
                    buyer: id,
                    chosenDates: [selectedDate],
                    chosenTimes: [selectedTime],
                    totalPrice: itinerary.priceOfTour,
                    status: 'pending',
                });

                // Update loyalty points
                await axios.put(`/api/Tourist/updateLoyaltyPoints/${id}`, {
                    amountPaid: itinerary.priceOfTour,
                });

                alert('Itinerary booked successfully!');
            }
        } catch (err) {
            console.error('Error during booking:', err);
            alert('An error occurred while processing the booking. Please try again later.');
        }
         finally {
            setBookingInProgress(false); // Hide loading state
        }
    };

  // Share itinerary functionality
  const handleShareLink = () => {
    const itineraryUrl = `${window.location.origin}/ItineraryDetails/${tripid}/${id}`;
    navigator.clipboard.writeText(itineraryUrl)
      .then(() => alert('Itinerary link copied to clipboard!'))
      .catch(err => alert('Failed to copy link: ' + err));
  };

  const handleShareEmail = () => {
    const itineraryUrl = `${window.location.origin}/ItineraryDetails/${tripid}/${id}`;
    const subject = encodeURIComponent('Check out this itinerary!');
    const body = encodeURIComponent(`I thought you might be interested in this itinerary: ${itineraryUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return <div className="text-red-500 text-center text-xl mt-10">Error: {error}</div>;

  if (!itinerary) return null;

  return (
    <div className="container mx-auto p-6 bg-white shadow-2xl rounded-lg mt-10 max-w-4xl">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 border-b pb-4">{itinerary.name}</h2>

      <div className="flex items-center text-gray-600 mb-8">
        <MapPin className="mr-2" size={24} />
        <span className="text-lg">{itinerary.locations.join(', ')}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
            <Clock className="mr-2" size={24} /> Activities
          </h3>
          <ul className="space-y-3 max-h-60 overflow-y-auto pr-4">
            {itinerary.activities.map((activity: any, index: number) => (
              <li key={index} className="flex justify-between items-center bg-white p-3 rounded shadow">
                <span className="text-gray-800 font-medium">{activity.activityName}</span>
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{activity.duration}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
            <Calendar className="mr-2" size={24} /> Timeline
          </h3>
          <p className="text-gray-600 leading-relaxed">{itinerary.timeline}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 bg-gray-100 p-6 rounded-lg shadow-inner">
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2 flex items-center">
            <Languages className="mr-2" size={20} /> Language of Tour
          </h3>
          <p className="text-gray-600">{itinerary.languageOfTour}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2 flex items-center">
            <DollarSign className="mr-2" size={20} /> Price
          </h3>
          <p className="text-gray-600 text-2xl font-bold">${itinerary.priceOfTour}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2 flex items-center">
            <Accessibility className="mr-2" size={20} /> Accessibility
          </h3>
          <p className="text-gray-600">{itinerary.accessibility ? 'Yes' : 'No'}</p>
        </div>
      </div>

      {/* Display the Rating */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-12">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <Star className="mr-2" size={24} /> Average Rating
        </h3>
        <p className="text-lg font-medium text-gray-800">{itinerary.rating} / 5</p>
      </div>

      <PaymentOptions2 paymentMethod={paymentMethod} onPaymentMethodSelection={setPaymentMethod} />

      <form onSubmit={handleBooking} className="bg-gray-50 p-6 rounded-lg shadow-md mb-12">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">Book Your Itinerary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
              <Calendar className="mr-2" size={20} /> Choose Date
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-4">
              {itinerary.availableDates.map((date: string, index: number) => (
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
            <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
              <Clock className="mr-2" size={20} /> Choose Time
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-4">
              {itinerary.availableTimes.map((time: string, index: number) => (
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
          <button type="submit" className="btn btn-primary text-white" disabled={bookingInProgress}>
            {bookingInProgress ? 'Booking...' : 'Book Now'}
          </button>
          {bookingMessage && <p className="text-lg text-gray-600">{bookingMessage}</p>}
        </div>
      </form>

      <div className="flex justify-between mb-8">
        <button
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleShareLink}
        >
          <span>Share Link</span>
        </button>
        <button
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={handleShareEmail}
        >
          <span>Share via Email</span>
        </button>
      </div>
      <WalletComponent touristId={id} />
    </div>
  );
};

export default ItineraryDetails;
