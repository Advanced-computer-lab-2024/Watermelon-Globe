
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './sidebar/Sidebar';
import Navbar from './navbar/Navbar';
import"./guide.scss"

const ItineraryTourguide = () => {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // State for editable fields
  const [name, setName] = useState('');
  const [activities, setActivities] = useState([]);
  const [tag, setTag] = useState('');
  const [locations, setLocations] = useState('');
  const [timeline, setTimeline] = useState('');
  const [languageOfTour, setLanguageOfTour] = useState('');
  const [priceOfTour, setPriceOfTour] = useState('');
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [accessibility, setAccessibility] = useState(false);
  const [pickupDropoffLocations, setPickupDropoffLocations] = useState([]);
  const [guideId, setGuideId] = useState('');
    const watermelonGreen = '#4CAF50';
    const watermelonPink = '#FF4081';

 const fetchItineraryDetails = async () => {
    try {
      const response = await axios.get(`/api/Itinerary/getItinerary/${id}`);
      const data = response.data;
      setItinerary(data);

      // Set state for non-editable fields (initial view)
      setName(data.name);
      setActivities(data.activities);
      setTag(data.tag);
      setLocations(data.locations);
      setTimeline(data.timeline);
      setLanguageOfTour(data.languageOfTour);
      setPriceOfTour(data.priceOfTour);
      setAvailableDates(data.availableDates);
      setAvailableTimes(data.availableTimes);
      setAccessibility(data.accessibility);
      setPickupDropoffLocations(data.pickupDropoffLocations);
      setGuideId(data.guide ? data.guide._id : '');
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Error loading itinerary details');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
   

    fetchItineraryDetails();
  }, [id]);

  if (loading) return <p className="text-center text-xl text-gray-500">Loading itinerary details...</p>;
  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;

  // Handle Edit Mode
  const handleEdit = () => {
    setEditMode(true);
  };

const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this itinerary?')) {
      try {
        // Fetch the latest itinerary data to check bookingsList
        const response = await fetch(`/api/Itinerary/getItinerary/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch itinerary');
        }
        const currentItinerary = await response.json();

        if (currentItinerary.bookingsList && currentItinerary.bookingsList.length > 0) {
          alert('This itinerary cannot be deleted because it has active bookings.');
          return;
        }

        // If no bookings, proceed with deletion
        const deleteResponse = await fetch(`/api/Itinerary/deleteItinerary2/${id}`, {
          method: 'DELETE',
        });

        if (deleteResponse.ok) {
          alert('Itinerary deleted successfully!');
        } else {
          throw new Error('Failed to delete itinerary');
        }
      } catch (error) {
        if (error.message === 'Failed to fetch itinerary') {
          alert('Itinerary not found. It may have already been deleted.');
        } else {
          alert('Error deleting itinerary: ' + error.message);
        }
        console.error('Delete itinerary error:', error);
      }
    }
  };

  const handleActivate = async () => {
    try {
      const response = await fetch(`/api/Itinerary/updateActivateItinarary/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedItinerary = await response.json();
        alert('Itinerary activated successfully!');
        setItinerary(updatedItinerary);
        fetchItineraryDetails();
      } else {
        alert('Error updating the itinerary.');
      }
    } catch (error) {
      alert('Error updating itinerary: ' + error.message);
    }
  };

  const handleDeactivate = async () => {
    try {
      const response = await fetch(`/api/Itinerary/updateDeactivateItinarary/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedItinerary = await response.json();
        alert('Itinerary deactivated successfully!');
        setItinerary(updatedItinerary);
        fetchItineraryDetails();
      } else {
        alert('Error updating the itinerary.');
      }
    } catch (error) {
      alert('Error updating itinerary: ' + error.message);
    }
  };

  // Handle Confirm Update
  const handleConfirmUpdate = async () => {
    try {
      const updatedData = {
        name,
        activities,
        tag,
        locations,
        timeline,
        languageOfTour,
        priceOfTour,
        availableDates,
        availableTimes,
        accessibility,
        pickupDropoffLocations,
        bookings: itinerary.bookings, // Keeping bookings as it is
        guide: guideId,
      };

      const response = await axios.put(`/api/Itinerary/updateItinerary/${id}`, updatedData);
      alert('Itinerary updated successfully!');
      setItinerary(response.data);
      setEditMode(false); // Exit edit mode after update
    } catch (err) {
      alert('Error updating itinerary: ' + err.message);
    }
  };

  const handleCancelUpdate = () => {
    setEditMode(false); // Exit edit mode without updating
  };

  return (
    <div className="listGuide">
       <Sidebar />
       <div className="listContainerGuide">
       <Navbar />
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          {/* Displaying Data */}
          {!editMode ? (
            <div>
              <h1 style={{color:watermelonGreen}} className="text-2xl font-bold text-900">{name}</h1>
                
              <div className="mt-4 space-y-2">
              <p className="text-lg text-gray-700"><strong>Id:</strong> {itinerary._id}</p>
                <p className="text-lg text-gray-700"><strong>Price:</strong> ${priceOfTour}</p>
                <p className="text-lg text-gray-700"><strong>Rating:</strong> {itinerary.rating} ★ ({itinerary.noOfRatings} reviews)</p>
                <p className="text-lg text-gray-700"><strong>Locations:</strong> {locations.join(', ')}</p>
                <p className="text-lg text-gray-700"><strong>Available Dates:</strong> {availableDates.join(', ')}</p>
                <p className="text-lg text-gray-700"><strong>Available Times:</strong> {availableTimes.join(', ')}</p>
                <p className="text-lg text-gray-700"><strong>Guide Status:</strong> {itinerary.guide ? itinerary.guide.status : 'No Guide'}</p>
                <p className="text-lg text-gray-700"><strong>Language:</strong> {languageOfTour}</p>
                <p className="text-lg text-gray-700"><strong>Timeline:</strong> {timeline}</p>
                <p className="text-lg text-gray-700"><strong>Accessibility:</strong> {accessibility ? 'Accessible' : 'Not Accessible'}</p>
              </div>

              {/* Activities */}
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Activities:</h3>
                {activities.map((activity, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="text-lg font-medium">{activity.Name}</h4>
                    <p className="text-gray-700"><strong>Time:</strong> {activity.Time}</p>
                  </div>
                ))}
              </div>

              {/* Pickup & Drop-off Locations */}
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Pickup & Drop-off Locations:</h3>
                {pickupDropoffLocations.map((location, index) => (
                  <p key={index} className="text-gray-700">{location.pickup} → {location.dropoff}</p>
                ))}
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={handleEdit}
                  style={{backgroundColor:watermelonGreen}}
                  className="bg-500 text-white px-4 py-2 rounded-md "
                >
                  Edit
                </button>
                <button className="rounded-md hover:bg-blue-700" style={{ backgroundColor: watermelonPink, color: 'white' }} onClick={handleActivate}>Activate</button>
                <button  className="rounded-md hover:bg-blue-700" style={{ backgroundColor: watermelonPink, color: 'white' }} onClick={handleDeactivate}>Deactivate</button>
                <button 
                      className="rounded-md hover:bg-red-700" 
                      style={{ backgroundColor: '#FF0000', color: 'white' }} 
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
              </div>
            </div>
          ) : (
            // Edit Form
            <div>
              <div>
                <label className="block text-gray-700">Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Activities:</label>
                <input
                  type="text"
                  value={activities.join(', ')}
                  onChange={(e) => setActivities(e.target.value.split(', '))}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Tag:</label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Locations:</label>
                <input
                  type="text"
                  value={locations.join(', ')}
                  onChange={(e) => setLocations(e.target.value.split(', '))}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Timeline:</label>
                <input
                  type="text"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Language of Tour:</label>
                <input
                  type="text"
                  value={languageOfTour}
                  onChange={(e) => setLanguageOfTour(e.target.value)}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Price of Tour:</label>
                <input
                  type="number"
                  value={priceOfTour}
                  onChange={(e) => setPriceOfTour(e.target.value)}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Available Dates:</label>
                <input
                  type="text"
                  value={availableDates.join(', ')}
                  onChange={(e) => setAvailableDates(e.target.value.split(', '))}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Available Times:</label>
                <input
                  type="text"
                  value={availableTimes.join(', ')}
                  onChange={(e) => setAvailableTimes(e.target.value.split(', '))}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                />
              </div>
              {/* <div className="mt-4">
                <label className="block text-gray-700">Accessibility:</label>
                <input
                  type="checkbox"
                  checked={accessibility}
                  onChange={() => setAccessibility(!accessibility)}
                  className="mt-2"
                />
              </div> */}
              <div className="mt-4">
                <label className="block text-gray-700">Pickup/Dropoff Locations:</label>
                <input
                  type="text"
                  value={pickupDropoffLocations.map(loc => `${loc.pickup} → ${loc.dropoff}`).join(', ')}
                  onChange={(e) => setPickupDropoffLocations(e.target.value.split(', '))}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={handleCancelUpdate}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmUpdate}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Confirm Update
                </button>

               
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItineraryTourguide;

