

import React, { useState } from 'react';

const ChangePasswordTourGuide = () => {
  const [sellerId, setSellerId] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [sellerPassword, setSellerPassword] = useState('');

  const handleShowPassword = async () => {
    if (!sellerId) {
      alert("Please enter a seller ID.");
      return;
    }
  
    try {
      const response = await fetch(`/api/Admin/getPassword?id=${sellerId}`);
  
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
            const response = await fetch(`/api/tourGuide/changePasswordTourGuide/${sellerId}?oldPassword=${currentPassword}&newPassword=${newPassword}&newPasswordConfirmed=${confirmNewPassword}`, {
    method: 'PUT',
      });
      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Password changed successfully.");
        setConfirmNewPassword('');
        setNewPassword('')
        setCurrentPassword('');
      } else {
        alert(data.error.message || "Failed to change password.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("An error occurred while changing the password.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Example id : 672a82544da865652a105b6e</h3>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Change Password</h2>
        
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Admin ID:</label>
          <input
            type="text"
            value={sellerId}
            onChange={(e) => setSellerId(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleShowPassword}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
          Show Password
        </button>
        {sellerPassword && (
          <p className="text-gray-700 mb-4"><strong>Admin Password:</strong> {sellerPassword}</p>
        )}

        <div className="mb-4">
          <label className="block font-medium text-gray-700">Current Password:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">Confirm New Password:</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleConfirmPasswordChange}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordTourGuide;




