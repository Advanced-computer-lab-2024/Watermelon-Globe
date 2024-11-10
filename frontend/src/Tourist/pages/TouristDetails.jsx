import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Phone, Flag, Calendar, Briefcase, DollarSign, Edit2, Check, X } from 'react-feather';

const TouristDetails = () => {
    const { id } = useParams();
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
                console.log(`Fetching details for tourist ID: ${id}`);
                const response = await fetch(`/api/Tourist/getTourist/${id}`);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
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

    const handleConfirm = async () => {
        setIsEditing(false);
        try {
            await axios.put(`/api/Tourist/updateTourist/${id}`, formData);
            alert('Tourist details updated successfully!');
            const response = await fetch(`/api/Tourist/getTourist/${id}`);
            const updatedData = await response.json();
            setTourist(updatedData);
        } catch (error) {
            console.error('Error updating tourist details:', error);
            alert('Failed to update tourist details. Please try again.');
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({
            email: tourist.email,
            mobileNumber: tourist.mobileNumber,
            nationality: tourist.nationality,
            status: tourist.status,
        });
    };

    if (!tourist) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-r from-pink-300 via-red-300 to-pink-300">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-pink-300 via-red-300 to-pink-300 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-green-700">Watermelon Globe</h1>
                    <p className="mt-2 text-xl text-green-600">Your Travel Companion</p>
                </div>
                <div className="bg-white bg-opacity-90 rounded-xl shadow-lg overflow-hidden">
                    <div className="md:flex">
                        <div className="md:flex-shrink-0 bg-green-500 md:w-48 flex items-center justify-center p-6">
                            <User className="h-24 w-24 text-white" />
                        </div>
                        <div className="p-8 w-full">
                            <div className="uppercase tracking-wide text-sm text-green-600 font-semibold mb-1">Tourist Profile</div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">{tourist.username}</h2>
                            <p className="text-gray-600 mb-4">Member since {new Date(tourist.createdAt).toLocaleDateString()}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        <Mail className="inline-block mr-2 text-green-500" size={16} />
                                        Email:
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    ) : (
                                        <p className="text-gray-800">{tourist.email}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        <Phone className="inline-block mr-2 text-green-500" size={16} />
                                        Mobile Number:
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="mobileNumber"
                                            value={formData.mobileNumber}
                                            onChange={handleInputChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    ) : (
                                        <p className="text-gray-800">{tourist.mobileNumber}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        <Flag className="inline-block mr-2 text-green-500" size={16} />
                                        Nationality:
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="nationality"
                                            value={formData.nationality}
                                            onChange={handleInputChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    ) : (
                                        <p className="text-gray-800">{tourist.nationality}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        <Calendar className="inline-block mr-2 text-green-500" size={16} />
                                        Date of Birth:
                                    </label>
                                    <p className="text-gray-800">{new Date(tourist.dob).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        <Briefcase className="inline-block mr-2 text-green-500" size={16} />
                                        Status:
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    ) : (
                                        <p className="text-gray-800">{tourist.status}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        <DollarSign className="inline-block mr-2 text-green-500" size={16} />
                                        Wallet Balance:
                                    </label>
                                    <p className="text-gray-800">${tourist.wallet.toFixed(2)}</p>
                                </div>
                            </div>
                            
                            <div className="flex justify-end space-x-4 mt-6">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={handleConfirm}
                                            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                                        >
                                            <Check size={18} className="mr-2" />
                                            Confirm
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                                        >
                                            <X size={18} className="mr-2" />
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={handleUpdate}
                                        className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                                    >
                                        <Edit2 size={18} className="mr-2" />
                                        Update
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TouristDetails;