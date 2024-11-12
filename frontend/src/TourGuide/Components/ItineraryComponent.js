import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ItineraryComponent.css';

const ItineraryComponent = ({ guideID }) => {
  const navigate = useNavigate();
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState('');

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await axios.get(`/api/Itinerary/getMyItineraries/${guideID}`);
        setItineraries(response.data); // Assuming response.data is an array of itinerary objects
      } catch (err) {
        setError(err.response ? err.response.data.error : "Error loading itineraries");
      } finally {
        setLoading(false);
      }
    };

    fetchItineraries();
  }, [guideID]);

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`/api/TourGuide/requestDeletionGuide/670137227c5a3dade4ba11dc`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        setDeleteError('Failed to delete account.');
        setDeleteSuccess('');
      } else {
        alert('Account deleted successfully.');
        setDeleteError('');
        navigate('/');
      }
    } catch (error) {
      setDeleteError('An error occurred while deleting the account.');
      setDeleteSuccess('');
      console.error('Error deleting account:', error);
    }
  };

  if (loading) return <p>Loading itineraries...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="itinerary-container">
      {itineraries.length > 0 ? (
        itineraries.map(itinerary => (
          <div key={itinerary._id} className="itinerary-card">
            <h2>{itinerary.name}</h2>
            <div className="itinerary-details">
              <div className="itinerary-detail">
                <p><strong>Guide Status:</strong> {itinerary.guide.status}</p>
                <p><strong>Language:</strong> {itinerary.languageOfTour}</p>
                <p><strong>Timeline:</strong> {itinerary.timeline}</p>
                <p><strong>Price:</strong> ${itinerary.priceOfTour}</p>
                <p><strong>Rating:</strong> {itinerary.rating} ({itinerary.noOfRatings} reviews)</p>
              </div>

              <div className="itinerary-detail">
                <p><strong>Locations:</strong> {itinerary.locations.join(', ')}</p>
                <p><strong>Available Dates:</strong> {itinerary.availableDates.map(date => new Date(date).toLocaleDateString()).join(', ')}</p>
                <p><strong>Available Times:</strong> {itinerary.availableTimes.join(', ')}</p>
                <p><strong>Accessibility:</strong> {itinerary.accessibility ? "Yes" : "No"}</p>
                <p><strong>Booking Open:</strong> {itinerary.bookings ? "Yes" : "No"}</p>
              </div>
            </div>
                  {/* Delete Account Button */}
      <div className="flex justify-end">
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 mb-4 text-white rounded-md transition duration-200 bg-red-600 hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>

            <div className="activities">
              <h3>Activities:</h3>
              {itinerary.activities.map((activity, index) => (
                <div key={index} className="activity">
                  <h4>{activity.name}</h4>
                  <p><strong>Description:</strong> {activity.description}</p>
                  <p><strong>Time:</strong> {activity.time}</p>
                  <p><strong>Location:</strong> {activity.location}</p>
                </div>
              ))}
            </div>

            <div className="pickup-dropoff">
              <h3>Pickup & Drop-off Locations:</h3>
              {itinerary.pickupDropoffLocations.map((location, index) => (
                <p key={index}>{`Pickup: ${location.pickup}, Dropoff: ${location.dropoff}`}</p>
              ))}
            </div>
            
          </div>
        ))
      ) : (
        <p>No itineraries found for this guide.</p>
      )}
    </div>
  );
};

export default ItineraryComponent;
