import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './ItineraryComponent.css';
import Sidebar from './sidebar/Sidebar';
import Navbar from './navbar/Navbar';
import"./guide.scss"

const ItineraryComponent2 = () => {
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
          `/api/Itinerary/getMyItineraries/${id}`
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
    navigate(`/itineraryTourguide/${itineraryId}`);
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
    <div className="listGuide">
    <Sidebar />
    <div className="listContainerGuide">
      <Navbar />
    <div className="itinerary-container">
    <h2 style={{ textAlign: 'center', marginBottom: '20px', color: watermelonGreen }}>My Itineraries</h2>
        <div style={{ marginBottom: '20px' }}>
      {itineraries.length > 0 ? (
        itineraries.map((itinerary) => (
          <div
            key={itinerary._id}
            style={inputStyle}
            className="itinerary-card"
            onClick={() => navigateToDetails(itinerary._id)}
          >
            <h2>{itinerary.name}</h2>
            <p><strong>Price:</strong> ${itinerary.priceOfTour}</p>
            <p><strong>Rating:</strong> {itinerary.rating} ★</p>
            <p><strong>Locations:</strong> {itinerary.locations.slice(0, 2).join(', ')}...</p>
          </div>
        ))
      ) : (
        <p>No itineraries found for this guide.</p>
      )}
    </div>
    </div>
    </div>
    </div>
  );
};

export default ItineraryComponent2;
