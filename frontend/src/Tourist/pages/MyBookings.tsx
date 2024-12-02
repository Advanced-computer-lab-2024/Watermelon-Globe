import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import WalletComponent from '../Components/Wallet';

const MyBookings: React.FC = () => {
  const { id } = useParams(); // Get the tourist ID from the URL params
  const [itineraryBookings, setItineraryBookings] = useState<Booking[]>([]); // Store the list of bookings
  const [activities, setActivities] = useState<Activity[]>([]); // Store the list of activities
  const [loading, setLoading] = useState<boolean>(true); // Set loading to true initially

  interface Itinerary {
    accessibility: boolean;
    activities: string[]; // Array of activity IDs
    availableDates: string[];
    availableTimes: string[];
    bookings: boolean;
    comments: string[];
    createdAt: string;
    guide: string;
    inappropriate: boolean;
    languageOfTour: string;
    locations: string[];
    name: string;
    pickupDropoffLocations: any[]; // Adjust as needed
    priceOfTour: number;
    rating: number;
    ratings: any[]; // Adjust as needed
    tag: any[]; // Adjust as needed
    timeline: string;
    updatedAt: string;
    status: string;
    totalPrice: number;
  }

  interface Activity {
    _id: string;
    activity: {
      _id: string;
      Name: string;
      Date: string;
      Time: string;
      Price: number;
      tags: any[];
      Discount: number;
      bookingOpen: boolean;
      rating: number;
      Advertiser: string;
      ratings: any[];
      comments: any[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    tourist: string;
    chosenDate: string;
    status: string;
    paymentStatus: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  interface Booking {
    _id: string;
    buyer: string;
    chosenDates: string[];
    chosenTimes: string[];
    completed: boolean;
    createdAt: string;
    itinerary: Itinerary;
    status: string;
    totalPrice: number;
    updatedAt: string;
    __v: number;
  }

  useEffect(() => {
    if (!id) return;

    const fetchBookings = async () => {
      try {
        // Fetch itineraries
        const itineraryResponse = await axios.get<Booking[]>(`/api/Tourist/BookedItineraries/${id}`);
        setItineraryBookings(itineraryResponse.data);

        // Fetch activities
        const activityResponse = await axios.get<Activity[]>(`/api/Tourist/BookedActivities/${id}`);
        setActivities(activityResponse.data);

        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error(error);
        setLoading(false); // Ensure loading is set to false even on error
      }
    };

    fetchBookings();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Filter out itineraries and activities with status 'cancelled'
  const filteredItineraryBookings = itineraryBookings.filter(booking => booking.status !== 'cancelled');
  const filteredActivities = activities.filter(activity => activity.status !== 'cancelled');

  // Split itineraries into completed and upcoming
  const completedItineraries = filteredItineraryBookings.filter(booking => booking.completed);
  const upcomingItineraries = filteredItineraryBookings.filter(booking => !booking.completed);

  // Split activities into completed and upcoming
  const completedActivities = filteredActivities.filter((activity) => activity.completed);
  const upcomingActivities = filteredActivities.filter((activity) => !activity.completed);

  // Cancel itinerary function
  const cancelItinerary = async (itineraryId: string, orderTotal: number) => {
    try {
      const response = await fetch(`/api/TouristItinerary/cancelItineraryBooking/${itineraryId}`, {
        method: 'PUT',
      });

      if (response.ok) {
        alert('Itinerary cancelled successfully!');
        await axios.put(`/api/Tourist/updateWallet/${id}`, { amount: orderTotal });
        await axios.delete(`/api/Tourist/deleteItinerary/${id}/${itineraryId}`);
        setItineraryBookings(itineraryBookings.filter(booking => booking._id !== itineraryId));
      } else {
        alert('Failed to cancel itinerary.');
      }
    } catch (error) {
      console.error('Error cancelling itinerary:', error);
    }
  };

  // Cancel activity function
  const cancelActivity = async (activityId: string, orderTotal: number) => {
    try {
      const response = await fetch(`/api/TouristItinerary/cancelActivityBooking/${activityId}`, {
        method: 'PUT',
      });

      if (response.ok) {
        alert('Activity cancelled successfully!');
        await axios.put(`/api/Tourist/updateWallet/${id}`, { amount: orderTotal });
        await axios.delete(`/api/Tourist/deleteActivity/${id}/${activityId}`);
        setActivities(activities.filter(activity => activity._id !== activityId));
      } else {
        alert('Failed to cancel activity.');
      }
    } catch (error) {
      console.error('Error cancelling activity:', error);
    }
  };


  return (
    <div className="p-6 bg-gradient-to-r from-primary/25 to-secondary/20" style={{ margin: '-20px' }}>
      <h1 className="text-4xl p-3 font-bold mb-8 text-center text-black bg-lightGray shadow-md rounded-lg">My Bookings</h1>

      {/* Itineraries Section */}
      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-secondary mb-4">Completed Itineraries</h2>
        {completedItineraries.length > 0 ? (
          completedItineraries.map((booking) => (
            <div key={booking._id} className="bg-cardBackground shadow-md rounded-lg p-6 mb-4">
              <p className="text-secondary font-semibold">Name: {booking.itinerary.name}</p>
              <p>Status: {booking.status}</p>
              <p>Total Price: ${booking.totalPrice}</p>
              <p>Chosen Dates: {booking.chosenDates.join(', ')}</p>
              <button
                onClick={() => cancelItinerary(booking._id, booking.totalPrice)}
                className="mt-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
              >
                Cancel Itinerary
              </button>
            </div>
          ))
        ) : (
          <p className="text-grayText">No completed itineraries.</p>
        )}

        <h2 className="text-3xl font-semibold text-secondary mt-8 mb-4">Upcoming Itineraries</h2>
        {upcomingItineraries.length > 0 ? (
          upcomingItineraries.map((booking) => (
            <div key={booking._id} className="bg-cardBackground shadow-md rounded-lg p-6 mb-4">
              <p className="text-secondary font-semibold">Name: {booking.itinerary.name}</p>
              <p>Status: {booking.status}</p>
              <p>Total Price: ${booking.totalPrice}</p>
              <p>Chosen Dates: {booking.chosenDates.join(', ')}</p>
              <button
                onClick={() => cancelItinerary(booking._id, booking.totalPrice)}
                className="mt-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
              >
                Cancel Itinerary
              </button>

            </div>
          ))
        ) : (
          <p className="text-grayText">No upcoming itineraries.</p>
        )}
      </section>

      {/* Activities Section */}
      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-secondary mb-4">Completed Activities</h2>
        {completedActivities.length > 0 ? (
          completedActivities.map((activity) => (
            <div key={activity._id} className="bg-cardBackground shadow-md rounded-lg p-6 mb-4">
              <p className="text-secondary font-semibold">Name: {activity.activity.Name}</p>
              <p>Status: {activity.status} </p>
              <p>Activity Date: {new Date(activity.chosenDate).toLocaleDateString()}</p>
              <p>Activity Time: {activity.activity.Time}</p>
              <p>Price: ${activity.activity.Price}</p>
              <button
                onClick={() => cancelActivity(activity._id, activity.activity.Price)}
                className="mt-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
              >
                Cancel Activity
              </button>

            </div>
          ))
        ) : (
          <p className="text-grayText">No completed activities.</p>
        )}

        <h2 className="text-3xl font-semibold text-secondary mt-8 mb-4">Upcoming Activities</h2>
        {upcomingActivities.length > 0 ? (
          upcomingActivities.map((activity) => (
            <div key={activity._id} className="bg-cardBackground shadow-md rounded-lg p-6 mb-4">
              <p className="text-secondary font-semibold">Name: {activity.activity.Name}</p>
              <p>Status: {activity.status}</p>
              <p>Activity Date: {new Date(activity.chosenDate).toLocaleDateString()}</p>
              <p>Activity Time: {activity.activity.Time}</p>
              <p>Price: ${activity.activity.Price}</p>
              <button
                onClick={() => cancelActivity(activity._id, activity.activity.Price)}
                className="mt-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
              >
                Cancel Activity
              </button>

            </div>
          ))
        ) : (
          <p className="text-grayText">No upcoming activities.</p>
        )}
      </section>
      <WalletComponent touristId={id} />
    </div>
  );
};

export default MyBookings;
