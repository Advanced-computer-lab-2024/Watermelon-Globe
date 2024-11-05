import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TouristDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [tourist, setTourist] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        mobileNumber: '',
        nationality: '',
        status: '',
    });

    // Fields for change password modal
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    useEffect(() => {
        const fetchTourist = async () => {
            try {
                const response = await fetch(`/api/tourist/getTourist/${id}`);
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                const data = await response.json();
                setTourist(data);
                setFormData({
                    email: data.email,
                    mobileNumber: data.mobileNumber,
                    nationality: data.nationality,
                    status: data.status,
                });
            } catch (error) {
                console.error('Error fetching tourist details:', error);
                alert('Failed to fetch tourist details. Please try again.');
            }
        };

        fetchTourist();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = () => {
        setIsEditing(true);
    };

    const handleChangePassword = () => {
        setShowModal(true);
    };

    const handleConfirmPasswordChange = async () => {
        if (newPassword !== confirmNewPassword) {
            alert("New password and confirm password do not match.");
            return;
        }

        try {
            const response = await fetch(`/api/tourist/changePasswordTourist/${id}?oldPassword=${currentPassword}&newPassword=${newPassword}&newPasswordConfirmed=${confirmNewPassword}`, {
                method: 'PUT'
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message || "Password changed successfully.");
                setShowModal(false);
            } else {
                alert(data.error.message || "Failed to change password.");
            }
        } catch (error) {
            console.error("Error changing password:", error);
            alert("An error occurred while changing the password.");
        }
    };

    const handleCancelPasswordChange = () => {
        setShowModal(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    };

    const handleConfirm = async () => {
        setIsEditing(false);
        try {
            await axios.put(`/api/tourist/updateTourist/${id}`, formData);
            alert('Tourist details updated successfully!');
            const response = await fetch(`/api/tourist/getTourist/${id}`);
            const updatedData = await response.json();
            setTourist(updatedData);
        } catch (error) {
            console.error('Error updating tourist details:', error);
            alert('Failed to update tourist details. Please try again.');
        }
    };

    if (!tourist) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Tourist Details</h1>
            <div className="bg-white rounded-lg shadow-lg p-8">
                {tourist && (
                    <>
                        <div className="mb-6">
                            <h2 className="text-2xl font-medium text-gray-800">Username: {tourist.username}</h2>
                            <div className="text-gray-600">
                                <strong>Wallet:</strong> {tourist.wallet}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium text-gray-700">Email:</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="mt-1 text-gray-700">{tourist.email}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium text-gray-700">Mobile Number:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="mobileNumber"
                                    value={formData.mobileNumber}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="mt-1 text-gray-700">{tourist.mobileNumber}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium text-gray-700">Nationality:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="nationality"
                                    value={formData.nationality}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="mt-1 text-gray-700">{tourist.nationality}</p>
                            )}
                        </div>
                        <div className="mb-6">
                            <label className="block font-medium text-gray-700">Status:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="mt-1 text-gray-700">{tourist.status}</p>
                            )}
                        </div>
                        <div className="mt-4">
                            {isEditing ? (
                                <button
                                    onClick={handleConfirm}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                                >
                                    Confirm
                                </button>
                            ) : (
                                <button
                                    onClick={handleUpdate}
                                    className="px-4 mb-4  py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
                                >
                                    Update
                                </button>
                            )}
                            <button
                                onClick={handleChangePassword}
                                className=" mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
                            >
                                Change Password
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Change Password Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Change Password</h2>
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
                                onClick={handleCancelPasswordChange}
                                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition duration-200 mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmPasswordChange}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TouristDetails;
