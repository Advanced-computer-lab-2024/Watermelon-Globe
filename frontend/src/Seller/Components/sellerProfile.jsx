import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import Navbar from './navbar/Navbar';
import SellerLogo from './SellerLogo';

const id = "6729244f151b6c9e346dd732";  // This would be dynamic based on the logged-in seller

const SellerProfile = () => {
  const [seller, setSeller] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

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

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateProfile = async () => {
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
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('An error occurred while updating the profile.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Seller Profile</h1>

            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

            {seller ? (
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/3 pr-8">
                    <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                    <div className="mb-4">
                      <strong className="block text-gray-700">ID:</strong>
                      <span>{seller._id}</span>
                    </div>
                    <div className="mb-4">
                      <strong className="block text-gray-700">Name:</strong>
                      {isEditing ? (
                        <input
                          type="text"
                          value={seller.Name}
                          onChange={(e) => setSeller({ ...seller, Name: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                      ) : (
                        <span>{seller.Name}</span>
                      )}
                    </div>
                    <div className="mb-4">
                      <strong className="block text-gray-700">Email:</strong>
                      {isEditing ? (
                        <input
                          type="email"
                          value={seller.Email}
                          onChange={(e) => setSeller({ ...seller, Email: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                      ) : (
                        <span>{seller.Email}</span>
                      )}
                    </div>
                    <div className="mb-4">
                      <strong className="block text-gray-700">Description:</strong>
                      {isEditing ? (
                        <textarea
                          value={seller.Description}
                          onChange={(e) => setSeller({ ...seller, Description: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          rows="3"
                        />
                      ) : (
                        <span>{seller.Description}</span>
                      )}
                    </div>
                  </div>
                  <div className="md:w-1/3">
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-4">Profile Image</h2>
                      <div className="mb-4">
                        {profileImage ? (
                          <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
                        ) : (
                          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
                        )}
                      </div>
                    </div>
                    <SellerLogo id={seller._id} />
                  </div>
                </div>

                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                  <div className="space-y-4">
                    <input
                      type="password"
                      placeholder="Current Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>

                <div className="mt-8 space-x-4">
                  <button
                    onClick={handleEditToggle}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                  </button>
                  {isEditing && (
                    <button
                      onClick={handleUpdateProfile}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                      Save Changes
                    </button>
                  )}
                  <button
                    onClick={handleChangePassword}
                    className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                  >
                    Change Password
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            ) : (
              !errorMessage && <p className="text-gray-600">Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;

