import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SellerLogo from './SellerLogo';

const ViewProfile = () => {
  const [seller, setSeller] = useState(null); // State to store seller data
  const [errorMessage, setErrorMessage] = useState(''); // State to store error messages
  const [successMessage, setSuccessMessage] = useState(''); // State to store success messages
  const navigate = useNavigate();

  const sellerId = "6729244f151b6c9e346dd732"; // Default seller ID

  // Function to fetch seller profile by ID
  const fetchSellerProfile = async () => {
    try {
      const response = await fetch(`/api/Seller/getSeller/${sellerId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json(); // Parse the JSON response

      if (!response.ok) {
        setErrorMessage(json.error || 'Failed to fetch seller profile.');
        setSeller(null); // Clear previous seller data if there's an error
      } else {
        setSeller(json);
        setErrorMessage(''); // Clear any error message if successful
      }
    } catch (error) {
      setErrorMessage('An error occurred while fetching the profile.');
      setSeller(null); // Clear previous seller data if there's an error
    }
  };

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
        setErrorMessage('');
        setSeller(null); // Clear seller data after deletion
        navigate('/');
      }
    } catch (error) {
      setErrorMessage('An error occurred while deleting the account.');
      setSuccessMessage(''); // Clear success message on error
    }
  };

  // Fetch seller profile on component mount
  useEffect(() => {
    fetchSellerProfile();
  }, []);

  return (
    <div>
      <h2>View Seller Profile</h2>

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

          {/* Add Delete Account Button */}
          <button
            onClick={handleDeleteAccount}
            style={{ backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '5px' }}
          >
            Delete Account
          </button>
          <SellerLogo id={seller._id} />
        </div>
      ) : (
        !errorMessage && <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewProfile;
