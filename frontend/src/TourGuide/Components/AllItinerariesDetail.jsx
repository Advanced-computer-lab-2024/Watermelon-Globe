
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ItineraryDetails.css';
import Sidebar from './sidebar/Sidebar';
import Navbar from './navbar/Navbar';
import "./guide.scss"

const GeneralDetails = () => {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const watermelonGreen = '#4CAF50';
  const watermelonPink = '#FF4081';

  useEffect(() => {
    console.log(id);
    const fetchItineraryDetails = async () => {
        try {
          const response = await axios.get(`/api/Itinerary/getItinerary/${id}`);
          console.log(response.data); // Check if accessibility is there
          setItinerary(response.data);
        } catch (err) {
          setError(
            err.response ? err.response.data.error : 'Error loading itinerary details'
          );
        } finally {
          setLoading(false);
        }
      };
     

    fetchItineraryDetails();
  }, [id]);

  if (loading) return <p>Loading itinerary details...</p>;
  if (error) return <p>{error}</p>;

  const handleActivate = async () => {
    try {
      const response = await fetch(`/api/Itinerary/updateActivateItinarary/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const updatedItinerary = await response.json(); // Parse the JSON response
        alert('Itinerary activated successfully!');
        setItinerary(updatedItinerary); // Update the state with the response data
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
        const updatedItinerary = await response.json(); // Parse the JSON response
        alert('Itinerary deactivated successfully!');
        setItinerary(updatedItinerary); // Update the state with the response data
      } else {
        alert('Error updating the itinerary.');
      }
    } catch (error) {
      alert('Error updating itinerary: ' + error.message);
    }
  };

  const buttonStyle = {
    backgroundColor: watermelonPink,
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
  };
  
  return (
    <div
        style={{
          backgroundColor: "#fff",
          minHeight: "100vh", // Ensures it covers the full viewport
          width: "102%", // Full width of the viewport
          margin: 0, // Remove default margins
          padding: 0, // Remove default padding
          display: "flex", // Optional: for flexible alignment
          flexDirection: "column",
        }}
      >
        <div className="listAdminProduct">
          <Sidebar />
          <div className="listContainerAdminProduct">
            <Navbar />
            <div style={{ padding: "20px" }}>
    <div className="itinerary-details-container">
      <h1 style={{ color: watermelonGreen }}>{itinerary.name}</h1>
      <p><strong>Guide:</strong> {itinerary.guide && itinerary.guide.name ? itinerary.guide.name : 'Unknown'}</p>
      <p><strong>Price:</strong> ${itinerary.priceOfTour}</p>
      <p><strong>Rating:</strong> {itinerary.rating} ★ ({itinerary.noOfRatings} reviews)</p>
      <p><strong>Locations:</strong> {itinerary.locations.join(', ')}</p>
      <p><strong>Available Dates:</strong> {itinerary.availableDates.map(date => new Date(date).toLocaleDateString()).join(', ')}</p>
      <p><strong>Available Times:</strong> {itinerary.availableTimes.join(', ')}</p>
      <p><strong>Guide Status:</strong> {itinerary.guide.status}</p>
      <p><strong>Language:</strong> {itinerary.languageOfTour}</p>
      <p><strong>Timeline:</strong> {itinerary.timeline}</p>
      <p><strong>Tags:</strong> {itinerary.tag.tag}</p>

      {/* <p><strong>Accessibility:</strong> {itinerary.accessibility}</p> */}
      <p><strong>Accessibility:</strong> {itinerary.accessibility ? 'Accessible' : 'Not Accessible'}</p>


      <div className="activities">
        <h3>Activities:</h3>
        {itinerary.activities.map((activity, index) => (
          <div key={index} className="activity">
            <h4>{activity.Name}</h4>   
            <p><strong>Time:</strong> {activity.Time}</p>

          </div>
        ))}
      </div>
      <div className="pickup-dropoff">
        <h3>Pickup & Drop-off Locations:</h3>
        {itinerary.pickupDropoffLocations.map((location, index) => (
          <p key={index}>Pickup: ${location.pickup}, Dropoff: ${location.dropoff}</p>
        ))}
<div className="itinerary-actions">
       
      </div>
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};
export default GeneralDetails;
