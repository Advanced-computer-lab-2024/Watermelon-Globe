import React from 'react';
import { useNavigate } from 'react-router-dom';

const TourGuideSettings = ({ id }) => {
    const navigate = useNavigate();

    const handleChangePassword = () => {
        navigate(`/changePasswordTourGuide/${id}`); // Pass the ID as a URL parameter
    };

    return (
        <div className="w-80 min-h-screen bg-gray-800 p-8 text-gray-200 shadow-lg rounded-lg">
            {/* Settings Title - Make it smaller and white */}
            <h1 className="text-xl font-semibold text-white mb-8 text-center">
                Settings
            </h1>
            
            {/* Change Password Option */}
            <button
                onClick={handleChangePassword}
                className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
                Change Password
            </button>

            {/* You can add more settings here */}
            <div className="mt-8 text-center">
                <p className="text-gray-400 text-sm">Manage your account settings and preferences.</p>
            </div>
        </div>
    );
};

export default TourGuideSettings;
