import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, LogOut, Calendar, MapPin, Clock, RefreshCw, AlertCircle, X, Trash2, Star } from 'lucide-react';
import axios from 'axios';

export default function MyBookings() {
  const [bookings, setBookings] = useState({ itineraries: [], activities: [] });
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBookings, setFilteredBookings] = useState({ itineraries: [], activities: [] });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (id) {
      fetchBookings();
    }
  }, [id]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const [itinerariesResponse, activitiesResponse] = await Promise.all([
        fetch(`/api/Tourist/BookedItineraries/${id}`),
        fetch(`/api/Tourist/bookedActivities/${id}`)
      ]);
      
      if (!itinerariesResponse.ok || !activitiesResponse.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const itineraries = await itinerariesResponse.json();
      const activities = await activitiesResponse.json();
      
      const bookingsData = {
        itineraries: Array.isArray(itineraries) ? itineraries : [],
        activities: Array.isArray(activities) ? activities : []
      };

      setBookings(bookingsData);
      setFilteredBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setErrorMessage('Failed to load bookings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = {
      itineraries: (bookings.itineraries || []).filter(itinerary => 
        itinerary && itinerary.name && itinerary.name.toLowerCase().includes(term) || 
        (itinerary.locations && Array.isArray(itinerary.locations) && itinerary.locations.some(location => location && location.toLowerCase().includes(term)))
      ),
      activities: (bookings.activities || []).filter(activity => 
        activity && activity.name && activity.name.toLowerCase().includes(term) || 
        (activity.location && activity.location.toLowerCase().includes(term))
      )
    };
    setFilteredBookings(filtered);
  };

  const handleReset = () => {
    setSearchTerm('');
    setFilteredBookings(bookings);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'cancelled': return '#EF4444';
      case 'completed': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const cancelBooking = async (bookingId, type) => {
    try {
      const response = await fetch(`/api/touristItinerary/cancel${type}Booking/${bookingId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to cancel booking');
      }

      await response.json();
      setSuccessMessage(`${type} cancelled successfully`);

      const updateBookings = (prevBookings) => ({
        ...prevBookings,
        [type.toLowerCase() + 's']: (prevBookings[type.toLowerCase() + 's'] || []).map(
          booking => booking && booking._id === bookingId ? { ...booking, status: 'cancelled' } : booking
        ).filter(Boolean)
      });

      setBookings(updateBookings);
      setFilteredBookings(updateBookings);

      // await axios.get

    } catch (error) {
      console.error('Error cancelling booking:', error);
      setErrorMessage(error.message || 'Failed to cancel booking. Please try again.');
    }
  };

  const deleteBooking = async (bookingId, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type.toLowerCase()}?`)) {
      try {
        const response = await fetch(`/api/Tourist/delete${type}/${id}/${bookingId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete booking');
        }

        setSuccessMessage(`${type} deleted successfully`);

        const updateBookings = (prevBookings) => ({
          ...prevBookings,
          [type.toLowerCase() + 's']: (prevBookings[type.toLowerCase() + 's'] || []).filter(
            booking => booking && booking._id !== bookingId
          ).filter(Boolean)
        });

        setBookings(updateBookings);
        setFilteredBookings(updateBookings);

      } catch (error) {
        console.error('Error deleting booking:', error);
        setErrorMessage('Failed to delete booking. Please try again.');
      }
    }
  };

  const isCompleted = (booking) => {
    if (!booking) return false;
    const currentDate = new Date();
    const bookingDate = new Date(booking.chosenDate || (booking.chosenDates && booking.chosenDates[0]));
    return bookingDate < currentDate || booking.status === 'completed';
  };

  const canBeRated = (booking) => {
    return booking && isCompleted(booking) && !booking.rating;
  };

  const handleRate = async (itineraryId, rating, type) => {
    try {
      const endpoint = `/api/Tourist/updateRating/${itineraryId}?rating=${rating}`;
      const response = await fetch(endpoint, {
        method: 'PUT',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit rating');
      }

      await response.json();
      setSuccessMessage('Rating submitted successfully!');

      const updateBookings = (prevBookings) => ({
        ...prevBookings,
        [type.toLowerCase() + 's']: (prevBookings[type.toLowerCase() + 's'] || []).map(booking =>
          booking && booking.itinerary === itineraryId ? { ...booking, rating } : booking
        ).filter(Boolean)
      });

      setBookings(updateBookings);
      setFilteredBookings(updateBookings);

    } catch (error) {
      console.error('Error submitting rating:', error);
      setErrorMessage(error.message || 'Failed to submit rating. Please try again.');
    }
  };

  const renderBookingCard = (booking, type) => {
    if (!booking) return null;

    const completed = isCompleted(booking);
    const status = completed ? 'completed' : booking.status;

    return (
      <div key={booking._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
        <img 
          src={booking.image || "/placeholder.svg?height=200&width=400"}
          alt={booking.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold">{booking.name}</h3>
            <span className="px-2 py-1 rounded-full text-xs font-bold text-white capitalize" style={{ backgroundColor: getStatusColor(status) }}>
              {status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4">{booking.description}</p>
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={16} className="text-green-600" />
            <span>
              {type === 'itinerary' 
                ? (booking.chosenDates && booking.chosenDates.length > 0 
                    ? new Date(booking.chosenDates[0]).toLocaleDateString() 
                    : 'Date not specified')
                : (booking.chosenDate 
                    ? new Date(booking.chosenDate).toLocaleDateString() 
                    : 'Date not specified')}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-green-600" />
            <span>
              {type === 'itinerary'
                ? (booking.chosenTimes && booking.chosenTimes.length > 0
                    ? booking.chosenTimes.join(', ')
                    : 'Time not specified')
                : (booking.activity && booking.activity.Time
                    ? booking.activity.Time
                    : 'Time not specified')}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={16} className="text-green-600" />
            <span>{type === 'itinerary' ? 
              (booking.locations && booking.locations.length > 0 ? booking.locations.join(', ') : 'No locations specified') : 
              (booking.location || 'Location not specified')}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Clock size={16} className="text-green-600" />
            <span>{type === 'itinerary' ? (booking.timeline || 'Timeline not specified') : (booking.duration || 'Duration not specified')}</span>
          </div>
          <div className="flex justify-between items-center">
            {status !== 'cancelled' && !completed && (
              <button
                onClick={() => cancelBooking(booking._id, type === 'itinerary' ? 'Itinerary' : 'Activity')}
                className="bg-red-500 text-white border-none rounded px-4 py-2 cursor-pointer flex items-center gap-2 text-sm font-bold"
              >
                <X size={16} />
                Cancel {type === 'itinerary' ? 'Itinerary' : 'Activity'}
              </button>
            )}
            {(status === 'cancelled' || completed) && (
              <button
                onClick={() => deleteBooking(booking._id, type === 'itinerary' ? 'Itinerary' : 'Activity')}
                className="bg-gray-500 text-white border-none rounded px-4 py-2 cursor-pointer flex items-center gap-2 text-sm font-bold"
              >
                <Trash2 size={16} />
                Delete {type === 'itinerary' ? 'Itinerary' : 'Activity'}
              </button>
            )}
            {canBeRated(booking) && (
              <div className="flex items-center">
                <span className="mr-2">Rate:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    onClick={() => handleRate(booking.itinerary, star, type)}
                    className={`cursor-pointer ${booking.rating >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            )}
            {booking.rating && (
              <div className="flex items-center">
                <span className="mr-2">Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className={`${booking.rating >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-green-50">
      <div className="bg-green-600 p-4 mb-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-white text-2xl font-bold">Watermelon Globe</span>
          <div className="flex gap-6">
            <Link to={`/ProductTourist/${id}`} className="text-white no-underline flex items-center gap-2">
              <ShoppingBag size={20} />
              Products
            </Link>
            <Link to="/signout" className="text-white no-underline flex items-center gap-2">
              <LogOut size={20} />
              Sign Out
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-green-600 text-center mb-8">Your Bookings</h1>

        <div className="flex justify-center mb-8 gap-4">
          <div className="flex gap-4 items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search bookings"
              className="p-2 rounded border border-gray-300"
            />
            <button onClick={handleReset} className="bg-yellow-500 text-white border-none rounded px-4 py-2 cursor-pointer flex items-center gap-2">
              <RefreshCw size={16} />
              Reset
            </button>
          </div>
        </div>

        {errorMessage && (
          <p className="text-red-500 text-center mb-4">
            <AlertCircle size={16} className="inline-block mr-2 align-text-bottom" />
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p className="text-green-500 text-center mb-4">
            <AlertCircle size={16} className="inline-block mr-2 align-text-bottom" />
            {successMessage}
          </p>
        )}

        {loading ? (
          <div className="text-center mt-8">
            <div className="inline-block w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Upcoming Trips</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-green-600 mb-2">Itineraries</h3>
                  {filteredBookings.itineraries && filteredBookings.itineraries.length > 0 ? (
                    filteredBookings.itineraries.filter(booking => booking && !isCompleted(booking)).map((itinerary) => renderBookingCard(itinerary, 'itinerary'))
                  ) : (
                    <p>No upcoming itineraries found.</p>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-600 mb-2">Activities</h3>
                  {filteredBookings.activities && filteredBookings.activities.length > 0 ? (
                    filteredBookings.activities.filter(booking => booking && !isCompleted(booking)).map((activity) => renderBookingCard(activity, 'activity'))
                  ) : (
                    <p>No upcoming activities found.</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Completed Trips</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-green-600 mb-2">Itineraries</h3>
                  {filteredBookings.itineraries && filteredBookings.itineraries.length > 0 ? (
                    filteredBookings.itineraries.filter(booking => booking && isCompleted(booking)).map((itinerary) => renderBookingCard(itinerary, 'itinerary'))
                  ) : (
                    <p>No completed itineraries found.</p>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-600 mb-2">Activities</h3>
                  {filteredBookings.activities && filteredBookings.activities.length > 0 ? (
                    filteredBookings.activities.filter(booking => booking && isCompleted(booking)).map((activity) => renderBookingCard(activity, 'activity'))
                  ) : (
                    <p>No completed activities found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}