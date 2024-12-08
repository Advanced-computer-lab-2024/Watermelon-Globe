import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import Modal from "../Components/Modal"; // Import a reusable modal component
import { Button } from "../Components/ui/button";

const ExploreTransportations = () => {
  const [transportations, setTransportations] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate
  const [showModal, setShowModal] = useState(false);

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
    navigate(`/tourist-signup`); // Navigate to TransportationDetails page with the transportation ID
  };

  const handleButtonClick = () => {
    setShowModal(true); // Show the modal when a button is clicked
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  const handleSignUpRedirect = () => {
    navigate(`/tourist-signup`);
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
            onClick={() => handleButtonClick()} // Handle click event
          >
            <h3 className="font-bold text-lg">{transportation.type}</h3>
            <p className="text-gray-600">Destination: {transportation.destination}</p>
            <p className="text-gray-600">Price: ${transportation.price}</p>
            <p className="text-gray-600">Booking Date: {new Date(transportation.bookingDate).toLocaleDateString()}</p>
          </button>
        ))}
      </div>
      {showModal && (
        <Modal onClose={closeModal}>
          <div className="p-8  max-w-sm mx-auto">
            <h2 className="text-2xl font-bold text-center text-primary mb-4">Join the Adventure!</h2>
            <p className="text-center text-gray-600 mb-6">Unlock exclusive access to your personal tour guide and travel companion—sign up now to start your journey with us!</p>
            <Button
              onClick={handleSignUpRedirect}
              className="bg-primary text-white font-semibold py-2 px-4 rounded-full w-full transition duration-300 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
              Start Your Adventure
            </Button>
          </div>
        </Modal>
        )}
    </section>
  );
};

export default ExploreTransportations;
