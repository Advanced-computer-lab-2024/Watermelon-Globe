// Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ onProfileView, advertiser, onViewActivities, onCreateActivity, advertiserId }) => {
    const navigate = useNavigate();
    console.log(advertiserId);

    const handleLogoClick = () => {
        navigate(`/edit-logo/${advertiserId}`);
    };
    const handleChangePassword=async()=>{
            navigate(`/ChangePasswordAdvertiser/${advertiserId}`)
    }

    return (
        <div className="sidebar">
            {/* Profile Logo */}
            <div className="profile-logo" onClick={handleLogoClick}>
                <img 
                    src={`/uploads/${advertiser.Logo}`} 
                    alt="Advertiser Logo" 
                    className="logo-image"
                />
            </div>
            <h2>{advertiser.Name}</h2>
            
            {/* Sidebar Links */}
            <button onClick={onProfileView}>Profile</button>
            <button onClick={onViewActivities}>View Activities</button>
            <button onClick={onCreateActivity}>Create Activity</button>
            <button onClick={handleChangePassword}>Change Password</button> 
        </div>
    );
};

export default Sidebar;