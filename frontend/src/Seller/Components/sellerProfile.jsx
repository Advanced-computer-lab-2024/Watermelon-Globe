import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import Navbar from './navbar/Navbar';
import SellerLogo from './SellerLogo';
// import './viewProfile.scss';

const id = "6729244f151b6c9e346dd732";  // This would be dynamic based on the logged-in seller

const SellerProfile = () => {
  const [seller, setSeller] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);  // State to toggle edit mode
  const [newPassword, setNewPassword] = useState(''); // State for the new password input
  const [currentPassword, setCurrentPassword] = useState(''); // State for current password
  const [confirmPassword, setConfirmPassword] = useState(''); // State for password confirmation
  const navigate = useNavigate();

  // Fetch seller profile by ID
  const fetchSellerProfile = async () => {
    try {
      const response = await fetch(`/api/Seller/getSeller/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();
      if (!response.ok) {
        setErrorMessage(json.error || 'Failed to fetch seller profile.');
        setSeller(null);
      } else {
        setSeller(json);
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setErrorMessage('An error occurred while fetching the profile.');
      setSeller(null);
    }
  };

  useEffect(() => {
    fetchSellerProfile();
  }, []);

  // Handle delete account request
  const handleDeleteAccount = async () => {
    if (!seller) {
      setErrorMessage('No seller profile found to delete.');
      return;
    }

    try {
      const response = await fetch(`/api/Seller/requestDeletionSeller/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        setErrorMessage('Failed to delete account.');
        setSuccessMessage('');
      } else {
        alert('Account deleted successfully.');
        setErrorMessage('');
        setSeller(null);
        navigate('/');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      setErrorMessage('An error occurred while deleting the account.');
    }
  };

  // Handle image upload
  const handleImageUpload = async (event) => {
    const formData = new FormData();
    formData.append('profileImage', event.target.files[0]);

    try {
      const response = await fetch(`/api/Seller/uploadProfileImage/${id}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        setErrorMessage('Failed to upload image.');
      } else {
        const json = await response.json();
        setProfileImage(json.imageUrl);
        setSuccessMessage('Profile image uploaded successfully.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrorMessage('An error occurred while uploading the image.');
    }
  };

  // Handle password change
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch(`/api/Seller/changePassword/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const json = await response.json();
      if (!response.ok) {
        setErrorMessage(json.error || 'Failed to change password.');
        setSuccessMessage('');
      } else {
        setSuccessMessage('Password changed successfully.');
        setErrorMessage('');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setErrorMessage('An error occurred while changing the password.');
    }
  };

  // Toggle edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateProfile = async () => {
    // Send the updated profile data to the backend
    const updatedData = {
      Name: seller.Name,
      Email: seller.Email,
      Description: seller.Description,
    };

    try {
      const response = await fetch(`/api/Seller/updateSeller/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        setErrorMessage('Failed to update profile.');
      } else {
        const json = await response.json();
        setSeller(json);
        setSuccessMessage('Profile updated successfully.');
        setIsEditing(false); // Exit edit mode
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('An error occurred while updating the profile.');
    }
  };

  return (
    <div className="viewProfile">
      <Sidebar />
      <div className="viewProfileContainer">
        <Navbar />
        <div className="profileDetails">
          <h2>Seller Profile</h2>

          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
          {successMessage && <p className="successMessage">{successMessage}</p>}

          {seller ? (
            <div className="profileInfo">
              <div className="profileImage">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" />
                ) : (
                  <p>No profile image available</p>
                )}
                <input type="file" onChange={handleImageUpload} />
              </div>

              {/* Display profile fields */}
              <div className="profileFields">
                <div>
                  <strong>ID:</strong> {seller._id}
                </div>
                <div>
                  <strong>Name:</strong>
                  {isEditing ? (
                    <input
                      type="text"
                      value={seller.Name}
                      onChange={(e) => setSeller({ ...seller, Name: e.target.value })}
                    />
                  ) : (
                    seller.Name
                  )}
                </div>
                <div>
                  <strong>Email:</strong>
                  {isEditing ? (
                    <input
                      type="email"
                      value={seller.Email}
                      onChange={(e) => setSeller({ ...seller, Email: e.target.value })}
                    />
                  ) : (
                    seller.Email
                  )}
                </div>
                <div>
                  <strong>Description:</strong>
                  {isEditing ? (
                    <textarea
                      value={seller.Description}
                      onChange={(e) => setSeller({ ...seller, Description: e.target.value })}
                    />
                  ) : (
                    seller.Description
                  )}
                </div>
              </div>

              {/* Edit Button */}
              <button onClick={handleEditToggle}>
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </button>

              {isEditing && (
                <button onClick={handleUpdateProfile} style={{ backgroundColor: 'green', color: 'white' }}>
                  Save Changes
                </button>
              )}

              {/* Change Password Section */}
              <div className="changePassword">
                <h3>Change Password</h3>
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button onClick={handleChangePassword} style={{ backgroundColor: 'blue', color: 'white' }}>
                  Change Password
                </button>
              </div>

              <button
                onClick={handleDeleteAccount}
                style={{ backgroundColor: 'red', color: 'white', padding: '2px', borderRadius: '5px' }}
              >
                Delete Account
              </button>

              <SellerLogo id={seller._id} />
            </div>
          ) : (
            !errorMessage && <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
