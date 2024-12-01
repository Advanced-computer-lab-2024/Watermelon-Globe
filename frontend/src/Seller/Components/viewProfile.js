
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import SellerLogo from './SellerLogo';


const ViewProfile = () => {
  const [seller, setSeller] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const navigate = useNavigate();
  const{id}=useParams();

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
    backgroundColor: '#F8F8F8',
    padding: '50px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    // maxWidth: '600px',
    margin: '0 auto',
  };

  const headingStyle = {
    color: watermelonGreen,
    borderBottom: `2px solid ${watermelonPink}`,
    paddingBottom: '10px',
    marginBottom: '20px',
  };

  const buttonStyle = {
    backgroundColor: watermelonPink,
    width:"25%",
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    marginRight: '10px',
    transition: 'background-color 0.3s',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: `1px solid ${watermelonGreen}`,
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div style={containerStyle}>
          <h2 style={headingStyle}>Seller Profile</h2>
          

          {seller ? (
            <div>
              {isEditing ? (
                <div>
                  <div>
                    <label>Name: </label>
                    <input
                      type="text"
                      name="Name"
                      value={updatedData.Name || ''}
                      onChange={handleInputChange}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label>Email: </label>
                    <input
                      type="email"
                      name="Email"
                      value={updatedData.Email || ''}
                      onChange={handleInputChange}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label>Description: </label>
                    <textarea
                      name="Description"
                      value={updatedData.Description || ''}
                      onChange={handleInputChange}
                      style={{...inputStyle, height: '100px'}}
                    />
                  </div>
                  <button
                    onClick={handleUpdateProfile}
                    style={buttonStyle}
                  >
                    Confirm Update
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    style={{...buttonStyle, backgroundColor: watermelonGreen}}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                
                  <p><strong>ID:</strong> {seller._id}</p>
                  <p><strong>Name:</strong> {seller.Name}</p>
                  <p><strong>Email:</strong> {seller.Email}</p>
                  <p><strong>Description:</strong> {seller.Description}</p>
                 

                  <button
                    onClick={() => setIsEditing(true)}
                    style={buttonStyle}
                  >
                    Update Profile
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    style={{...buttonStyle, backgroundColor: watermelonPink}}
                  >
                    Delete Account
                  </button>
                </div>
              )}

              
              <div style={{}}>
                <SellerLogo id={seller._id} />
              </div>
              <button
                onClick={() => navigate(`/ChangePasswordSeller/${id}`)}
                style={{...buttonStyle, backgroundColor: watermelonGreen, marginTop: '20px'}}
              >
                Change Password
              </button>
             
            </div>
          ) : (
            !errorMessage && <p>Loading...</p>
          )}

          {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;


