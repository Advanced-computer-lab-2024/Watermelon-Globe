import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AccountPage = () => {
    const [profile, setProfile] = useState(null);
    const profileId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/Advertiser/profiles/${profileId}`);
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [profileId]); // Fetch data on mount and when profileId changes

    if (!profile) return <p>No profile data available</p>;

    return (
        <div>
            <h1>{profile.Name}'s Account</h1>
            <p><strong>About:</strong> {profile.About}</p>
            <p><strong>Hotline:</strong> {profile.Hotline}</p>
            <p><strong>Link:</strong> <a href={profile.Link} target="_blank" rel="noopener noreferrer">{profile.Link}</a></p>
        </div>
    );
};

export default AccountPage;
