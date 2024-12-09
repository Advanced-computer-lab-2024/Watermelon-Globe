import React, { useState } from "react";
import {FaTimes, FaCheck} from 'react-icons/fa'


  import React, { useState } from 'react';
  import Navbar from './navbar/Navbar';
  import Sidebar from './sidebar/Sidebar';
import { useParams,useNavigate } from 'react-router-dom';

const ChangePasswordSeller = () => {
  const [sellerId, setSellerId] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [sellerPassword, setSellerPassword] = useState('');
  const watermelonGreen = '#4CAF50';
  const watermelonPink = '#FF4081';
  const navigate=useNavigate();

  const containerStyle = {
    backgroundColor: '#F8F8F8',
    padding: '20px',  // Increased padding for better visual separation
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginTop: '20px', // Add margin-top for better spacing
    width: '100%',
  };

  const {id}=useParams();

  const handleShowPassword = async () => {
    // if (!sellerId) {
    //   alert("Please enter a seller ID.");
    //   return;
    // }
  
    try {
      const response = await fetch(`/api/Seller/getPassword?id=${id}`);
  
      const data = await response.json();
  
      if (response.ok) {
        setSellerPassword(data || 'Password not available');
      } else {
        alert(data.error || 'Failed to retrieve password.');
      }
    } catch (error) {
      console.error("Error retrieving password:", error);
      alert("An error occurred while retrieving the password.");
    }
  };



  const handleConfirmPasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    try {
      const response = await fetch(
        `/api/Seller/changePasswordSeller/${id}?oldPassword=${currentPassword}&newPassword=${newPassword}&newPasswordConfirmed=${confirmNewPassword}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ oldPassword: currentPassword, newPassword }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Password changed successfully.");
        setConfirmNewPassword("");
        setCurrentPassword("");
        setNewPassword("");
      } else {
        alert(data.error.message || "Failed to change password.");
      }
    } catch (error) {
      alert("An error occurred while changing the password.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-cardBackground rounded-lg shadow-lg p-6 w-full max-w-lg mx-4">
        <h2 className="text-3xl font-bold text-secondary mb-6 text-center">
          Change Password
        </h2>

        <div className="mb-5">
          <label className="block text-sm font-medium text-secondary mb-2">
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-1 w-full p-3 border border-lightGray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your current password"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-secondary mb-2">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 w-full p-3 border border-lightGray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your new password"
            minLength="8"
          />
          {newPassword && newPassword.length < 8 && (
            <p className="mt-2 text-sm text-red-500">
              Password must be at least 8 characters long.
            </p>
          )}
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-secondary mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="mt-1 w-full p-3 border border-lightGray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Confirm your new password"
            minLength="8"
          />
          {confirmNewPassword && confirmNewPassword !== newPassword && (
            <p className="mt-2 text-sm text-red-500">
              Passwords do not match.
            </p>
          )}
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={onClose}
            className="flex items-center px-4 py-2 border border-primary text-primary hover:bg-primary/10 rounded"
            >
              <FaTimes className="mr-2" size="1em" />
            Cancel
          </button>
          <button
            onClick={handleConfirmPasswordChange}
            className="flex items-center px-4 py-2 bg-secondary hover:bg-secondaryHover text-white rounded"
            >
              <FaCheck className="mr-2" size="1em" />
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordSeller;
