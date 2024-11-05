import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TouristDetails = () => {
    const { id } = useParams(); // Get the tourist ID from URL parameters
    const navigate = useNavigate();
    
    const [tourist, setTourist] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        mobileNumber: '',
        nationality: '',
        status: '',
    });

    useEffect(() => {
        const fetchTourist = async () => {
            try {
                console.log(`Fetching details for tourist ID: ${id}`); // Log ID
                const response = await fetch(`/api/tourist/getTourist/${id}`);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json(); // Convert response to JSON
                setTourist(data); // Set tourist data
                setFormData({
                    email: data.email,
                    mobileNumber: data.mobileNumber,
                    nationality: data.nationality,
                    status: data.status,
                });
            } catch (error) {
                console.error('Error fetching tourist details:', error);
                alert('Failed to fetch tourist details. Please try again.'); // Notify user of error
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

    const handleConfirm = async () => {
        setIsEditing(false);
        try {
            // Call API to update the tourist details
            await axios.put(`/api/tourist/updateTourist/${id}`, formData);
            alert('Tourist details updated successfully!');
            // Optionally, redirect or fetch updated tourist data
            const response = await fetch(`/getTourist/${id}`);
            const updatedData = await response.json();
            setTourist(updatedData);
        } catch (error) {
            console.error('Error updating tourist details:', error);
            alert('Failed to update tourist details. Please try again.');
        }
    };

    if (!tourist) {
        return <div className="text-center mt-10">Loading...</div>; // Handle loading state
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
                        <div className="mb-4">
                            <label className="block font-medium text-gray-700">Date of Birth:</label>
                            {/* {isEditing ? (
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="mt-1 text-gray-700">{new Date(tourist.dob).toLocaleDateString()}</p>
                            )} */}
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
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
                                >
                                    Update
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TouristDetails;
