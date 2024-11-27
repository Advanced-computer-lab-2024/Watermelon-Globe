import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./AccountPage.css";

const AccountPage = () => {
    const { profileId } = useParams();
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`/api/Advertiser/profiles/${profileId}`);
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, [profileId]);

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete your account? This action is irreversible."
        );
        if (confirmed) {
            try {
                const response = await axios.put(`/api/Advertiser/requestDeletionAdvertiser/${profileId}`);
                if (response.status === 200) {
                    alert("Your account has been successfully deleted.");
                    navigate("/"); // Redirect to home or login after deletion
                } else {
                    alert("Failed to delete account. Please try again.");
                }
            } catch (error) {
                console.error("Error deleting account:", error);
                alert("An error occurred while trying to delete the account.");
            }
        }
    };

    const handleChangePassword=async()=>{
        navigate(`/ChangePasswordAdvertiser/${profileId}`);
    }

    if (!profile) return <p>Loading profile...</p>;

    return (
        <div className="account-page">
            <div className="account-header">
                <h1>{profile.Name}'s Account</h1>
            </div>
            <div className="account-details">
                <div className="account-info">
                    <p>
                        <strong>About:</strong> {profile.About}
                    </p>
                    <p>
                        <strong>Hotline:</strong> {profile.Hotline}
                    </p>
                    <p>
                        <strong>Website:</strong>{" "}
                        <a href={profile.Link} target="_blank" rel="noopener noreferrer">
                            {profile.Link}
                        </a>
                    </p>
                </div>
                <div className="action-buttons">
                    <div className="primary-buttons">
                        <Link to={`/editAdvertiser/${profileId}`}>
                            <button className="action-button">Edit Profile</button>
                        </Link>
                        <button
                            onClick={() => navigate("/advertiser")}
                            className="action-button"
                        >
                            Return to Homepage
                        </button>
                    </div>
                    <button
                        onClick={handleChangePassword}
                        className="action-button secondary"
                    >
                        Change Password
                    </button>
                    <button
                        onClick={handleDeleteAccount}
                        className="delete-button"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
            {/* {showChangePassword && (
                <ChangePasswordAdvertiser
                    onClose={() => setShowChangePassword(false)}
                />
            )} */}
        </div>
    );
};

export default AccountPage;
