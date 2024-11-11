import React, { useState } from 'react';
import SellerLogo from './SellerLogo';

const ViewProfile = () => {
  const [sellerId, setSellerId] = useState(''); // State to store the input seller ID
  const [seller, setSeller] = useState(null); // State to store seller data
  const [errorMessage, setErrorMessage] = useState(''); // State to store error messages

  // Function to fetch seller profile by ID
  const fetchSellerProfile = async (id) => {
    try {
      console.log("Fetching seller profile for ID:", id);
      const response = await fetch(`/api/Seller/getSeller/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json(); // Parse the JSON response
      console.log("API Response:", json); // Log the response

      if (!response.ok) {
        // Handle error response from the backend
        setErrorMessage(json.error || 'Failed to fetch seller profile.');
        setSeller(null); // Clear previous seller data if there's an error
      } else {
        // Set the seller data to state
        setSeller(json);
        setErrorMessage(''); // Clear any error message if successful
      }
    } catch (error) {
      // Handle any network or unexpected errors
      console.error("Error fetching profile:", error);
      setErrorMessage('An error occurred while fetching the profile.');
      setSeller(null); // Clear previous seller data if there's an error
    }
  };

  // Handle form submission when user submits the seller ID
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    if (sellerId) {
      fetchSellerProfile(sellerId); // Fetch seller profile based on input ID
    } else {
      setErrorMessage('Please enter a valid seller ID.');
      setSeller(null); // Clear previous seller data if the input is invalid
    }
  };

  return (
    <div>
      <h2>View Seller Profile</h2>
      
      {/* Input form to accept seller ID */}
      <form onSubmit={handleSubmit}>
        <label>Enter Seller ID:</label>
        <input
          type="text"
          value={sellerId}
          onChange={(e) => setSellerId(e.target.value)}
          required
        />
        <button type="submit">View Profile</button>
      </form>

      {/* Display error message if any */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Display the seller profile details if available */}
      {seller && (
        <div>
          <p><strong>Name:</strong> {seller.Name}</p>
          <p><strong>Email:</strong> {seller.Email}</p>
          <p><strong>Description:</strong> {seller.Description}</p>
          <SellerLogo id={seller._id}/>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
