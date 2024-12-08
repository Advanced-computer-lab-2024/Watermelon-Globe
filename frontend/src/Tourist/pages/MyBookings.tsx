'use client'

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaUser, FaCalendar, FaClock, FaDollarSign, FaCheck, FaTimes, FaStar
} from 'react-icons/fa';
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
  name: string;
  guide: string;
}

interface Activity {
  _id: string;
  activity: {
    Name: string;
    Time: string;
    Price: number;
  };
  tourist: string;
  chosenDate: string;
  status: string;
  paymentStatus: string;
  completed: boolean;
}

interface Booking {
  _id: string;
  buyer: string;
  chosenDates: string[];
  chosenTimes: string[];
  completed: boolean;
  itinerary: Itinerary;
  status: string;
  totalPrice: number;
}

export default function MyBookings() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [itineraryBookings, setItineraryBookings] = useState<Booking[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { selectedCurrency, currencies } = useCurrency() as CurrencyContextType;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const itineraryResponse = await axios.get<Booking[]>(`/api/Tourist/BookedItineraries/${id}`);
        const activityResponse = await axios.get<Activity[]>(`/api/Tourist/BookedActivities/${id}`);
        setItineraryBookings(itineraryResponse.data);
        setActivities(activityResponse.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (id) {
      fetchBookings();
    }
  }, [id]);

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

  const redirectToRatingsPage = (itemId: string, type: string) => {
    navigate(`/ratingsAndCommentsPage/${itemId}/${id}/${type}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
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


  const upcomingActivities = activities.filter(activity => !activity.completed && activity.status !== 'cancelled');
  const upcomingItineraries = itineraryBookings.filter(booking => !booking.completed && booking.status !== 'cancelled');
  const completedActivities = activities.filter(activity => activity.completed);
  const completedItineraries = itineraryBookings.filter(booking => booking.completed);

  return (
    <div className="min-h-screen bg-background p-8" style={{ margin: "-20px" }}>
      <TouristNavbar id={id} />
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary p-5 relative">
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-full p-2">
                <FaUser className="h-16 w-16 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">My Bookings</h2>
                <p className="text-white opacity-75">
                  Manage your itineraries and activities
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-12">
            <div>
              <h3 className="text-2xl font-semibold text-black mb-4">
                Upcoming Itineraries
              </h3>
              {/* Upcoming Activities */}
              <div className="space-y-4">
                {upcomingActivities.map((activity) => (
                  <div
                    key={activity._id}
                    className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out"
                  >
                    <h4 className="text-lg font-semibold text-secondary">{activity.activity.Name}</h4>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <p className="flex items-center">
                        <FaCalendar className="mr-2 text-primary" /> {new Date(activity.chosenDate).toLocaleDateString()}
                      </p>
                      <p className="flex items-center">
                        <FaClock className="mr-2 text-primary" /> {activity.activity.Time}
                      </p>
                      <p className="flex items-center">
                        <FaDollarSign className="mr-2 text-primary" />
                        {currencySymbol}
                        {selectedCurrency
                          ? (activity.activity.Price * getCurrencyConversionRate(selectedCurrency)).toFixed(2)
                          : activity.activity.Price.toFixed(2)}
                      </p>
                    </div>
                    <div
                      className="flex justify-end"
                    >
                      <button
                        onClick={() => cancelActivity(activity._id, activity.activity.Price)}
                        className="mt-3 bg-darkPink text-white text-sm px-4 py-2 rounded-full hover:bg-darkPinkHover transition duration-200 inline-block"
                        style={{ width: 'auto' }}
                      >
                        Cancel Activity
                      </button>
                    </div>
                  </div>
                ))}
                {upcomingActivities.length === 0 && (
                  <p className="text-gray-500 italic">No upcoming activities.</p>
                )}
              </div>
            </div>


            {/* Upcoming Itineraries */}
            <div>
              <h3 className="text-2xl font-semibold text-black mb-4">
                Upcoming Itineraries
              </h3>
              <div className="space-y-4">
                {upcomingItineraries.map((booking) => (
                  <div key={booking._id}
                    className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out"
                  >
                    <h4 className="text-lg font-semibold text-secondary">{booking.itinerary.name}</h4>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <p className="flex items-center"><FaCalendar className="mr-2 text-primary" /> {booking.chosenDates.map(date => new Date(date).toLocaleDateString()).join(', ')}</p>
                      <p className="flex items-center"><FaClock className="mr-2 text-primary" /> {booking.chosenTimes.join(', ')}</p>
                      <p className="flex items-center">
                        <FaDollarSign className="mr-2 text-primary" />
                        {currencySymbol}
                        {selectedCurrency
                          ? (booking.totalPrice * getCurrencyConversionRate(selectedCurrency)).toFixed(2)
                          : booking.totalPrice.toFixed(2)}
                      </p>

                    </div>
                    <div
                      className="flex justify-end"
                    >
                      <button
                        onClick={() => cancelItinerary(booking._id, booking.totalPrice)}
                        className="mt-3 bg-darkPink text-white text-sm px-4 py-2 rounded-full hover:bg-darkPinkHover transition duration-200 inline-block"
                        style={{ width: 'auto' }}
                      >
                        Cancel Itinerary
                      </button>
                    </div>
                  </div>
                ))}
                {upcomingItineraries.length === 0 && (
                  <p className="text-gray-500 italic">No upcoming itineraries.</p>
                )}
              </div>
            </div>

            {/* Completed Activities */}
            <div>
              <h3 className="text-2xl font-semibold text-black mb-4">
                Completed Activities
              </h3>
              <div className="space-y-4">
                {completedActivities.map((activity) => (
                  <div key={activity._id}
                    className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out"
                  >
                    <h4 className="text-lg font-semibold text-secondary">{activity.activity.Name}</h4>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <p className="flex items-center"><FaCalendar className="mr-2 text-primary" /> {new Date(activity.chosenDate).toLocaleDateString()}</p>
                      <p className="flex items-center"><FaClock className="mr-2 text-primary" /> {activity.activity.Time}</p>
                      <p className="flex items-center">
                        <FaDollarSign className="mr-2 text-primary" />
                        {currencySymbol}
                        {selectedCurrency
                          ? (activity.activity.Price * getCurrencyConversionRate(selectedCurrency)).toFixed(2)
                          : activity.activity.Price.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => redirectToRatingsPage(activity._id, 'activity')}
                      className="mt-3 bg-primary text-white text-sm px-4 py-2 rounded-full hover:bg-hover transition duration-200 inline-flex items-center"
                      style={{ width: 'auto' }}
                    >
                      <FaStar className="mr-2" /> Rate Activity
                    </button>

                  </div>
                ))}
                {completedActivities.length === 0 && (
                  <p className="text-gray-500 italic">No completed activities.</p>
                )}
              </div>
            </div>

            {/* Completed Itineraries */}
            <div>
              <h3 className="text-2xl font-semibold text-black mb-4">
                Completed Itineraries
              </h3>
              <div className="space-y-4">
                {completedItineraries.map((booking) => (
                  <div key={booking._id}
                    className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out"
                  >
                    <h4 className="text-lg font-semibold text-secondary">{booking.itinerary.name}</h4>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <p className="flex items-center"><FaCalendar className="mr-2 text-primary" /> {booking.chosenDates.map(date => new Date(date).toLocaleDateString()).join(', ')}</p>
                      <p className="flex items-center"><FaClock className="mr-2 text-primary" /> {booking.chosenTimes.join(', ')}</p>
                      <p className="flex items-center">
                        <FaDollarSign className="mr-2 text-primary" />
                        {currencySymbol}
                        {selectedCurrency
                          ? (booking.totalPrice * getCurrencyConversionRate(selectedCurrency)).toFixed(2)
                          : booking.totalPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="mt-3 space-x-2">
                      <div className="mt-3 flex space-x-4">
                        <button
                          onClick={() => redirectToRatingsPage(booking._id, 'itinerary')}
                          className="bg-primary text-white text-sm px-4 py-2 rounded-full hover:bg-hover transition duration-200 inline-flex items-center"
                          style={{ width: 'auto' }}
                        >
                          <FaStar className="mr-2" /> Rate Itinerary
                        </button>
                        <button
                          onClick={() => redirectToRatingsPage(booking.itinerary.guide, 'guide')}
                          className="bg-secondary text-white text-sm px-4 py-2 rounded-full hover:bg-secondaryHover transition duration-200 inline-flex items-center"
                          style={{ width: 'auto' }}
                        >
                          <FaStar className="mr-2" /> Rate Guide
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
                {completedItineraries.length === 0 && (
                  <p className="text-gray-500 italic">No completed itineraries.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}