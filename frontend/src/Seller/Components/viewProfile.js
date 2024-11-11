import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SellerLogo from './SellerLogo';

const id = "6729244f151b6c9e346dd732";

const ViewProfile = () => {
  const [seller, setSeller] = useState(null); // State to store seller data
  const [errorMessage, setErrorMessage] = useState(''); // State to store error messages
  const [successMessage, setSuccessMessage] = useState(''); // State to store success messages
  const [allSellers, setAllSellers] = useState([]); // State to store all sellers
  const navigate = useNavigate();

  // Function to fetch seller profile by ID
  const fetchSellerProfile = async () => {
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

  // Fetch the seller profile automatically on component mount
  useEffect(() => {
    fetchSellerProfile();
  }, []);

  // Function to handle delete account request
  const handleDeleteAccount = async () => {
    if (!seller) {
      setErrorMessage('No seller profile found to delete.');
      return;
    }

    try {
      const response = await fetch(`/api/Seller/requestDeletionSeller/${sellerId}`, {
        method: 'PUT', // Using PUT for deletion request
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        setErrorMessage('Failed to delete account.');
        setSuccessMessage(''); // Clear success message on error
      } else {
        alert('Account deleted successfully.');
        setErrorMessage(''); // Clear error message on success
        setSeller(null); // Clear seller data after deletion
        navigate('/');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      setErrorMessage('An error occurred while deleting the account.');
      setSuccessMessage(''); // Clear success message on error
    }
  };

  // Fetch all sellers on component mount
  useEffect(() => {
    getAllSellers(); // Call getAllSellers when the component mounts
  }, []);

  return (
    <div>
      <h2>Seller Profile</h2>

      {/* Display error message if any */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Display success message if any */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      {/* Display the seller profile details if available */}
      {seller ? (
        <div>
          <p><strong>ID:</strong> {seller._id}</p>
          <p><strong>Name:</strong> {seller.Name}</p>
          <p><strong>Email:</strong> {seller.Email}</p>
          <p><strong>Description:</strong> {seller.Description}</p>
          <SellerLogo id={seller._id} />
        </div>
      ) : (
        !errorMessage && <p>Loading...</p>
      )}

      <h3>All Sellers</h3>
      <ul>
        {allSellers.length > 0 ? (
          allSellers.map((seller) => (
            <li key={seller._id}>
              <p><strong>ID:</strong> {seller._id}</p>
              <p><strong>Name:</strong> {seller.Name}</p>
              <p><strong>Email:</strong> {seller.Email}</p>
            </li>
          ))
        ) : (
          <p>No sellers found.</p>
        )}
      </ul>
    </div>
  );
};

export default ViewProfile;
