

import React, { useState } from 'react';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import { useParams,useNavigate } from 'react-router-dom';

const ChangePasswordTourGuide = () => {
const [sellerId, setSellerId] = useState('');
const [currentPassword, setCurrentPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmNewPassword, setConfirmNewPassword] = useState('');
const [sellerPassword, setSellerPassword] = useState('');
const watermelonGreen = '#4CAF50';
const watermelonPink = '#FF4081';
const navigate=useNavigate();

const containerStyle = {
  // backgroundColor: '#FFF0F5',
  padding: '50px',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  // maxWidth: '600px',
  margin: '0 auto',
};

const {id}=useParams();

const handleShowPassword = async () => {
  // if (!sellerId) {
  //   alert("Please enter a seller ID.");
  //   return;
  // }

  try {
    const response = await fetch(`/api/TourGuide/getPassword?id=${id}`);

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
          const response = await fetch(`/api/TourGuide/changePasswordTourGuide/${id}?oldPassword=${currentPassword}&newPassword=${newPassword}&newPasswordConfirmed=${confirmNewPassword}`, {
  method: 'PUT',
    });
    const data = await response.json();

    if (response.ok) {
      alert(data.message || "Password changed successfully.");
      setConfirmNewPassword('');
      setNewPassword('')
      setCurrentPassword('');
      navigate(`/TourGuideProfile/${id}`)
    } else {
      alert(data.error || "Failed to change password.");
      setConfirmNewPassword('');
      setNewPassword('')
      setCurrentPassword('');
    }
  } catch (error) {
    console.error("Error changing password:", error);
    alert("An error occurred while changing the password.");
  }
};

const handleCancel=()=>{
  navigate(`/TourGuideProfile/${id}`)
}

return (
  <div className="list">
    <Sidebar />
    <div className="listContainer">
      <Navbar />
      <div style={containerStyle}>
  {/* <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"> */}
    {/* <div className="bg-white rounded-lg shadow-lg p-6 w-96"> */}
    {/* <h3 className="text-2xl font-semibold text-gray-800 mb-4">Example id : </h3> */}
      <h2 style={{color:watermelonGreen}}
       className="text-2xl font-semibold text-800 mb-4">Change Password</h2>
      
      {/* <div className="mb-4">
        <label className="block font-medium text-gray-700">Seller ID:</label>
        <input
          type="text"
          value={sellerId}
          onChange={(e) => setSellerId(e.target.value)}
          className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div> */}

      <button  style={{background:watermelonPink,width:"25%"}}
        onClick={handleShowPassword}
       
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
        Show Password
      </button>
      {sellerPassword && (
        <p className="py-2 text-gray-700 mb-4"><strong>Seller Password:</strong> {sellerPassword}</p>
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
        <button style={{background:watermelonGreen,width:"25%" , marginRight:10}}
          onClick={handleConfirmPasswordChange}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Confirm
        </button>

        <button style={{background:watermelonPink,width:"25%"}}
          onClick={handleCancel}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  </div>
  // </div>
);
};

export default ChangePasswordTourGuide;




