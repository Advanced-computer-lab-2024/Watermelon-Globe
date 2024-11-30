import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Calendar, Clock, Tag, Star, AlertCircle } from 'lucide-react';
import axios from 'axios';
import PaymentOptions from '../Components/PaymentOptions'; // Assuming the file is in the same directory

interface Tag {
  name: string;
}

interface Category {
  name: string;
}

interface Location {
  coordinates: [number, number]; // [latitude, longitude]
}

interface Activity {
  Name: string;
  Location: Location;
  Date: string;
  Time: string;
  Price: number;
  Category: Category | null;
  tags: Tag[];
  Discount: number;
  Rating: number | null;
  bookingOpen: boolean;
}

interface ActivityDetailsParams {
  activityId: string;
  id: string;
}

const ActivityDetails: React.FC = () => {
  const { activityId, id } = useParams<{ activityId: string, id: string }>();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingMessage, setBookingMessage] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'creditCard' | 'cashOnDelivery' | null>(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch(`/api/Activities/getActivityById/${activityId}`);
        if (!response.ok) {
          throw new Error('Activity not found');
        }
        const data: Activity = await response.json();
        setActivity(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [activityId]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activity?.bookingOpen) {
      setBookingMessage("Sorry, this activity is not available for booking at the moment.");
      return;
    }
    if (!paymentMethod) {
      setBookingMessage("Please select a payment method.");
      return;
    }

    try {
      const response = await fetch('/api/TouristItinerary/createActivityBooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activity: activityId,
          tourist: id, // Replace with actual user ID
          chosenDate: activity.Date,
          paymentMethod,
        }),
      });
      const response2 = await axios.put(`/api/Tourist/updateLoyaltyPoints/${id}`, {
        amountPaid: activity.Price
      });

      if (!response.ok) {
        throw new Error('Failed to book activity');
      }
      alert(`You have successfully booked your Itinerary! \nLoyalty Points: ${response2.data.loyaltyPoints}\nBadge: ${response2.data.badge}`);
      setBookingMessage('Activity booked successfully!');
    } catch (error) {
      console.error('Error booking activity:', error);
      setBookingMessage('Failed to book activity. Please try again.');
    }
  };

  const handleShareLink = () => {
    const activityUrl = `${window.location.origin}/TouristActivityDetails/${activityId}/${id}`;
    navigator.clipboard.writeText(activityUrl)
      .then(() => alert('Activity link copied to clipboard!'))
      .catch(err => alert('Failed to copy link: ' + err));
  };

  const handleShareEmail = () => {
    const activityUrl = `${window.location.origin}/TouristActivityDetails/${activityId}/${id}`;
    const subject = encodeURIComponent('Check out this activity!');
    const body = encodeURIComponent(`I thought you might be interested in this activity: ${activityUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return <div className="text-red-500 text-center text-xl mt-10">Error: {error}</div>;

  if (!activity) return null;

  return (
    <div className="container mx-auto p-6 bg-white shadow-2xl rounded-lg mt-10 max-w-4xl">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 border-b pb-4">{activity.Name}</h2>

      {/* Payment Options Component */}
      <PaymentOptions
        paymentMethod={paymentMethod}
        onPaymentMethodSelection={setPaymentMethod}
        disableCashOnDelivery={true}  // Disable Cash on Delivery option
      />

      {/* Rest of the Activity Details and Booking Form */}
      <form onSubmit={handleBooking} className="bg-gray-50 p-6 rounded-lg shadow-md mb-12">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">Book This Activity</h3>
        <button
          type="submit"
          className="w-full px-6 py-3 rounded-lg text-white font-semibold transition duration-300 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Book Activity
        </button>

        {bookingMessage && (
          <div className={`mt-4 p-4 rounded-lg ${bookingMessage.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <p className="flex items-center">
              <AlertCircle className="mr-2" size={18} />
              {bookingMessage}
            </p>
          </div>
        )}
      </form>

      <div className="flex justify-center space-x-4">
        <button onClick={handleShareLink} className="text-blue-500 hover:underline">Share Link</button>
        <button onClick={handleShareEmail} className="text-blue-500 hover:underline">Share via Email</button>
      </div>
    </div>
  );
};

export default ActivityDetails;
