import React, { useState } from 'react';
import { useParams } from 'react-router-dom';


const ChangePasswordAdvertiser = ({onClose }) => {

  const [sellerId, setSellerId] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [sellerPassword, setSellerPassword] = useState('');
  const { advertiserId } = useParams();



  const handleShowPassword = async () => {
   
    try {
        console.log(advertiserId);
      const response = await fetch(`/api/advertiser/getPassword?id=${advertiserId}`);
      const data = await response.json();
      setSellerPassword(response.ok ? data : 'Password not available');
    } catch (error) {
      alert("An error occurred while retrieving the password.");
    }
  };

  const handleConfirmPasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    try {
        const response = await fetch(`/api/advertiser/changePasswordAdvertiser/${advertiserId}?oldPassword=${currentPassword}&newPassword=${newPassword}&newPasswordConfirmed=${confirmNewPassword}`, {
            method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword: currentPassword, newPassword }),
      });
      const data = await response.json();
      if(response.ok){
        alert("Password changed successfully.");
        setConfirmNewPassword('');
        setCurrentPassword('');
        setNewPassword('');
      }
      else{
        alert(data.error.message || "Failed to change password.");
      }

    } catch (error) {
      alert("An error occurred while changing the password.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Change Password</h2>
        
       

        <button
          onClick={handleShowPassword}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
          Show Password
        </button>
        {sellerPassword && (
          <p className="py-2 text-gray-700 mb-4"><strong>Advertiser Password:</strong> {sellerPassword}</p>
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
            //minLength="8"
            />
            {/* {newPassword && newPassword.length < 8 && (
            <p className="mt-2 text-sm text-red-500">Password must be at least 8 characters long.</p>
            )} */}
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">Confirm New Password:</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            //minLength="8"
            />
            {/* {newPassword && newPassword.length < 8 && (
            <p className="mt-2 text-sm text-red-500">Password must be at least 8 characters long.</p>
            )} */}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleConfirmPasswordChange}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Confirm
          </button>
        </div>
        {/* <button onClick={onClose}>Close</button> */}
      </div>
    </div>
  );
};

export default ChangePasswordAdvertiser;





