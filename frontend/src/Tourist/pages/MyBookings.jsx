import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, LogOut, Calendar, MapPin, Clock, RefreshCw, AlertCircle, X, Trash2 } from 'lucide-react';

export default function TouristBookings() {
  const [bookings, setBookings] = useState({ itineraries: [], activities: [] });
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBookings, setFilteredBookings] = useState({ itineraries: [], activities: [] });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchBookings();
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
      
      setBookings({ itineraries, activities });
      setFilteredBookings({ itineraries, activities });
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
      itineraries: bookings.itineraries.filter(itinerary => 
        itinerary.name.toLowerCase().includes(term) || 
        (itinerary.locations && itinerary.locations.some(location => location.toLowerCase().includes(term)))
      ),
      activities: bookings.activities.filter(activity => 
        activity.name.toLowerCase().includes(term) || 
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
      case 'confirmed':
        return '#10B981'; // green
      case 'pending':
        return '#F59E0B'; // yellow
      case 'cancelled':
        return '#EF4444'; // red
      default:
        return '#6B7280'; // gray
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

      const updatedBooking = await response.json();
      setSuccessMessage(`${type} cancelled successfully`);

      // Update the bookings state
      setBookings(prevBookings => ({
        ...prevBookings,
        [type === 'Itinerary' ? 'itineraries' : 'activities']: prevBookings[type === 'Itinerary' ? 'itineraries' : 'activities'].map(
          booking => booking._id === bookingId ? { ...booking, status: 'cancelled' } : booking
        )
      }));

      // Update filtered bookings as well
      setFilteredBookings(prevFiltered => ({
        ...prevFiltered,
        [type === 'Itinerary' ? 'itineraries' : 'activities']: prevFiltered[type === 'Itinerary' ? 'itineraries' : 'activities'].map(
          booking => booking._id === bookingId ? { ...booking, status: 'cancelled' } : booking
        )
      }));

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

        // Remove the deleted booking from the state
        setBookings(prevBookings => ({
          ...prevBookings,
          [type === 'Itinerary' ? 'itineraries' : 'activities']: prevBookings[type === 'Itinerary' ? 'itineraries' : 'activities'].filter(
            booking => booking._id !== bookingId
          )
        }));

        // Update filtered bookings as well
        setFilteredBookings(prevFiltered => ({
          ...prevFiltered,
          [type === 'Itinerary' ? 'itineraries' : 'activities']: prevFiltered[type === 'Itinerary' ? 'itineraries' : 'activities'].filter(
            booking => booking._id !== bookingId
          )
        }));

      } catch (error) {
        console.error('Error deleting booking:', error);
        setErrorMessage('Failed to delete booking. Please try again.');
      }
    }
  };

  const renderBookingCard = (booking, type) => (
    <div key={booking._id} style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      transition: 'transform 0.3s ease-in-out',
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <img 
        src={booking.image || "/placeholder.svg?height=200&width=400"}
        alt={booking.name}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover'
        }}
      />
      <div style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{booking.name}</h3>
          <span style={{ 
            backgroundColor: getStatusColor(booking.status),
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            textTransform: 'capitalize'
          }}>
            {booking.status || 'Unknown'}
          </span>
        </div>
        <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>{booking.description}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Calendar size={16} style={{ color: '#00b341' }} />
          <span>{type === 'itinerary' ? 
            (booking.chosenDates && booking.chosenDates.length > 0 ? new Date(booking.chosenDates[0]).toLocaleDateString() : 'Date not specified') : 
            (booking.chosenDate ? new Date(booking.chosenDate).toLocaleDateString() : 'Date not specified')}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <MapPin size={16} style={{ color: '#00b341' }} />
          <span>{type === 'itinerary' ? 
            (booking.locations && booking.locations.length > 0 ? booking.locations.join(', ') : 'No locations specified') : 
            (booking.location || 'Location not specified')}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Clock size={16} style={{ color: '#00b341' }} />
          <span>{type === 'itinerary' ? (booking.timeline || 'Timeline not specified') : (booking.duration || 'Duration not specified')}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {booking.status !== 'cancelled' && (
            <button
              onClick={() => cancelBooking(booking._id, type === 'itinerary' ? 'Itinerary' : 'Activity')}
              style={{
                backgroundColor: '#EF4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 'bold'
              }}
            >
              <X size={16} />
              Cancel {type === 'itinerary' ? 'Itinerary' : 'Activity'}
            </button>
          )}
          {booking.status === 'cancelled' && (
            <button
              onClick={() => deleteBooking(booking._id, type === 'itinerary' ? 'Itinerary' : 'Activity')}
              style={{
                backgroundColor: '#6B7280',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 'bold'
              }}
            >
              <Trash2 size={16} />
              Delete {type === 'itinerary' ? 'Itinerary' : 'Activity'}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0fdf4' }}>
      {/* Navigation Bar */}
      <div style={{ 
        backgroundColor: '#00b341',
        padding: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ 
            color: 'white', 
            fontSize: '1.5rem', 
            fontWeight: 'bold'
          }}>
            Watermelon Globe
          </span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to={`/ProductTourist/${id}`} style={{
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <ShoppingBag size={20} />
              Products
            </Link>
            <Link to="/signout" style={{
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <LogOut size={20} />
              Sign Out
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <h1 style={{ 
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#00b341',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          Your Bookings
        </h1>

        {/* Search Section */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: '2rem',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search bookings"
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button onClick={handleReset} style={{
              backgroundColor: '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <RefreshCw size={16} />
              Reset
            </button>
          </div>
        </div>

        {errorMessage && (
          <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>
            <AlertCircle size={16} style={{ marginRight: '0.5rem', verticalAlign: 'text-bottom' }} />
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p style={{ color: 'green', textAlign: 'center', marginBottom: '1rem' }}>
            <AlertCircle size={16} style={{ marginRight: '0.5rem', verticalAlign: 'text-bottom' }} />
            {successMessage}
          </p>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <div style={{
              display: 'inline-block',
              width: '50px',
              height: '50px',
              border: '3px solid rgba(0, 179, 65, 0.3)',
              borderRadius: '50%',
              borderTopColor: '#00b341',
              animation: 'spin 1s ease-in-out infinite',
            }} />
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '2rem' }}>
            {/* Itineraries Column */}
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00b341', marginBottom: '1rem' }}>Booked Itineraries</h2>
              {filteredBookings.itineraries.length > 0 ? (
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '1rem',
                  marginBottom: '2rem'
                }}>
                  {filteredBookings.itineraries.map((itinerary) => renderBookingCard(itinerary, 'itinerary'))}
                </div>
              ) : (
                <p style={{ textAlign: 'center', color: '#666', fontSize: '1rem', marginBottom: '2rem' }}>No booked itineraries found.</p>
              )}
            </div>

            {/* Activities Column */}
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00b341', marginBottom: '1rem' }}>Booked Activities</h2>
              {filteredBookings.activities.length > 0 ? (
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '1rem'
                }}>
                  {filteredBookings.activities.map((activity) => renderBookingCard(activity, 'activity'))}
                </div>
              ) : (
                <p style={{ textAlign: 'center', color: '#666', fontSize: '1rem' }}>No booked activities found.</p>
              )}
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}