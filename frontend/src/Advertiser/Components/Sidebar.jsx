import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ advertiser, advertiserId, selectedTab, setSelectedTab }) => {
    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <div className="profile-logo" onClick={() => navigate(`/edit-logo/${advertiserId}`)}>
                <img
                    src={`/uploads/${advertiser?.Logo}`}
                    alt="Advertiser Logo"
                    className="logo-image"
                />
                <h2
                    className="advertiser-name"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the logo click event
                        navigate(`/advertiserProfile/${advertiserId}`);
                    }}
                >
                    {advertiser?.Name}
                </h2>
            </div>
            <button
                onClick={() => setSelectedTab('addActivity')}
                className={selectedTab === 'addActivity' ? 'active-tab' : ''}
            >
                Create Activity
            </button>
            <button
                onClick={() => setSelectedTab('all')}
                className={selectedTab === 'all' ? 'active-tab' : ''}
            >
                All Activities
            </button>
            <button
                onClick={() => setSelectedTab('my')}
                className={selectedTab === 'my' ? 'active-tab' : ''}
            >
                My Activities
            </button>
        </div>
    );
};

export default Sidebar;
