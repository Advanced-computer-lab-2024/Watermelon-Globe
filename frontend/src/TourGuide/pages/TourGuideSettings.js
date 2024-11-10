// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const TourGuideSettings = () => {
//     const navigate = useNavigate();

//     const handleChangePassword = () => {
//         navigate('/changePasswordTourGuide');
//     };

//     return (
//         <div className="w-64 min-h-screen bg-gray-800 p-6 text-gray-200">
//             <h1 className=" px-6 text-2xl font-semibold text-blue-400 mb-6">   Settings</h1>
            
//             {/* Change Password Option */}
//             <button
//                 onClick={handleChangePassword}
//                 className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded transition duration-200 text-left"
//             >
//                 Change Password
//             </button>
//         </div>
//     );
// };

// export default TourGuideSettings;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const TourGuideSettings = ({ id }) => {
    const navigate = useNavigate();

    const handleChangePassword = () => {
        navigate(`/changePasswordTourGuide/${id}`); // Pass the ID as a URL parameter
    };

    return (
        <div className="w-64 min-h-screen bg-gray-800 p-6 text-gray-200">
            <h1 className="text-2xl font-semibold text-blue-400 mb-6">Settings</h1>
            
            {/* Change Password Option */}
            <button
                onClick={handleChangePassword}
                className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded transition duration-200 text-left"
            >
                Change Password
            </button>
        </div>
    );
};

export default TourGuideSettings;
