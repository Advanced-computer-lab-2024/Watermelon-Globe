import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation

const ExploreTransportations = ({touristId}) => {
  const [transportations, setTransportations] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchTransportations();
  }, []);

  const fetchTransportations = async () => {
    try {
      const response = await fetch('/api/Tourist/getAllTransportations');
      const data = await response.json();
      setTransportations(data);
    } catch (error) {
      console.error('Error fetching transportations:', error);
    }
  };

  const handleTransportationClick = (id) => {
    navigate(`/TransportationDetails/${id}/${touristId}`); // Navigate to TransportationDetails page with the transportation ID
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Explore Transportations</h2>

      <div 
        className="grid gap-4" 
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        }}
      >
        {transportations.map((transportation) => (
          <button
            key={transportation._id}
            className="rounded-lg overflow-hidden shadow-md bg-white hover:bg-gray-100 p-4 text-left"
            onClick={() => handleTransportationClick(transportation._id)} // Handle click event
          >
            <h3 className="font-bold text-lg">{transportation.type}</h3>
            <p className="text-gray-600">Destination: {transportation.destination}</p>
            <p className="text-gray-600">Price: ${transportation.price}</p>
            <p className="text-gray-600">Booking Date: {new Date(transportation.bookingDate).toLocaleDateString()}</p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ExploreTransportations;
