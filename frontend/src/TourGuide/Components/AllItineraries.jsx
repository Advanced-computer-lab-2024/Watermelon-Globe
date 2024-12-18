import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './ItineraryComponent.css';
import Sidebar from './sidebar/Sidebar';
import Navbar from './navbar/Navbar';
import "./guide.scss"

const AllItineraries = () => {
const {id}=useParams();
  const navigate = useNavigate();
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const watermelonGreen = '#4CAF50';
  const watermelonPink = '#FF4081';

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await axios.get(
          `/api/Itinerary/getAllItineraries`
        );
        setItineraries(response.data);
      } catch (err) {
        setError(
          err.response ? err.response.data.error : 'Error loading itineraries'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchItineraries();
  }, [id]);

  const navigateToDetails = (itineraryId) => {
    navigate(`/GeneralDetails/${itineraryId}`);
  };

  

  if (loading) return <p>Loading itineraries...</p>;
  if (error) return <p>{error}</p>;

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: `1px solid ${watermelonGreen}`,
  };

  const buttonStyle = {
    backgroundColor: watermelonPink,
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const productCardStyle = {
    border: `2px solid ${watermelonGreen}`,
    borderRadius: '10px',
    padding: '15px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    transition: 'transform 0.3s',}



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
    <div className="itinerary-container">
    <h2 style={{ color: '#2E8B57' }} className="text-2xl font-bold text-800 text-center mb-6">All Itineraries</h2>
        <div style={{ marginBottom: '20px' }}>
    
        {itineraries.map((itinerary) => (
          <div
            key={itinerary._id}
            style={inputStyle}
            className="itinerary-card"
            onClick={() => navigateToDetails(itinerary._id)}
          >
            <h2>{itinerary.name}</h2>
            {/* <p><strong>Guide:</strong> {itinerary.guide.name}</p> */}
            <p><strong>Price:</strong> ${itinerary.priceOfTour}</p>
            <p><strong>Rating:</strong> {itinerary.rating} ★</p>
            <p><strong>Locations:</strong> {itinerary.locations.slice(0, 2).join(', ')}...</p>
          </div>
        ))
    }
        {/* // <p>No itineraries found for this guide.</p> */}

    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default AllItineraries;
