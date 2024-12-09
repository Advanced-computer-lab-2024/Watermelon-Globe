



import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import SellerLogo from './SellerLogo';
import { FaEdit, FaTrash, FaKey } from 'react-icons/fa'; // Import Font Awesome icons
import "./actions.scss";

const ViewProfile = () => {
  const [seller, setSeller] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const watermelonGreen = '#4CAF50';
  const watermelonPink = '#FF4081';

  const fetchSellerProfile = async () => {
    try {
      const response = await fetch(`/api/Seller/getSeller/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const json = await response.json();
      if (!response.ok) {
        setErrorMessage(json.error || 'Failed to fetch seller profile.');
        setSeller(null);
      } else {
        setSeller(json);
        setUpdatedData(json);
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred while fetching the profile.');
      setSeller(null);
    }
  };

  useEffect(() => {
    fetchSellerProfile();
  }, []);

  const handleDeleteAccount = async () => {
    if (!seller) {
      setErrorMessage('No seller profile found to delete.');
      return;
    }

    try {
      const response = await fetch(`/api/Seller/requestDeletionSeller/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        setErrorMessage('Failed to delete account.');
        setSuccessMessage('');
      } else {
        alert('Account deleted successfully.');
        setSeller(null);
        navigate('/');
      }
    } catch (error) {
      setErrorMessage('An error occurred while deleting the account.');
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(`/api/Seller/UpdateSeller/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      const json = await response.json();
      if (!response.ok) {
        setErrorMessage(json.error || 'Failed to update profile.');
        setSuccessMessage('');
      } else {
        alert('Profile updated successfully.');
        setSeller(json.seller);
        setIsEditing(false);
        setErrorMessage('');
      }
    } catch (error) {
      alert('An error occurred while updating the profile.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdatedData(seller);
  };

  const containerStyle = {
    display: 'flex', // Use flexbox to divide the content
    gap: '20px', // Add spacing between the two halves
    padding: '20px',
    // backgroundColor: '#F8F8F8',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    height:"100%"
  };

  const leftStyle = {
    flex: 1, // Take half of the width
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const rightStyle = {
    flex: 2, // Take the other half
  };

  const headingStyle = {
    color: watermelonGreen,
    borderBottom: `2px solid ${watermelonPink}`,
    paddingBottom: '10px',
    marginBottom: '20px',
  };

  const buttonStyle = {
    backgroundColor: watermelonPink,
    color: 'white',
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    marginRight: '10px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: `1px solid ${watermelonGreen}`,
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
      <div style={containerStyle}>
        {/* Left Half: Logo */}
        <div style={leftStyle}>
          <SellerLogo id={id} />
        </div>

        {/* Right Half: Profile Info */}
        <div style={rightStyle}>
          <h2 style={headingStyle}>Seller Profile</h2>
          {seller ? (
            isEditing ? (
              <div>
                <label>Name:</label>
                <input type="text" name="Name" value={updatedData.Name || ''} onChange={handleInputChange} style={inputStyle} />
                <label>Email:</label>
                <input type="email" name="Email" value={updatedData.Email || ''} onChange={handleInputChange} style={inputStyle} />
                <label>Description:</label>
                <textarea name="Description" value={updatedData.Description || ''} onChange={handleInputChange} style={{ ...inputStyle, height: '100px' }} />
                <button onClick={handleUpdateProfile} style={buttonStyle}>
                  <FaEdit /> Confirm Update
                </button>
                <button onClick={handleCancelEdit} style={{ ...buttonStyle, backgroundColor: watermelonGreen }}>
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <p><strong>Name:</strong> {seller.Name}</p>
                <p><strong>Email:</strong> {seller.Email}</p>
                <p><strong>Description:</strong> {seller.Description}</p>
                <button onClick={() => setIsEditing(true)} style={buttonStyle}>
                  <FaEdit /> Update Profile
                </button>
                <button onClick={handleDeleteAccount} style={buttonStyle}>
                  <FaTrash /> Request Account Delete 
                </button>
                {/* <button onClick={() => navigate(`/ChangePasswordSeller/${id}`)} style={{ ...buttonStyle, backgroundColor: watermelonGreen }}>
                  <FaKey /> Change Password
                </button> */}
              </div>
            )
          ) : (
            !errorMessage && <p>Loading...</p>
          )}
          {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default ViewProfile;
