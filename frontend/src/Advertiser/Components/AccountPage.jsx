import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const AccountPage = () => {
    const {profileId} = useParams();
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`/api/Advertiser/profiles/${profileId}`);
                setProfile(response.data);
                setFormData({
                    Name: response.data.Name,
                    About: response.data.About,
                    Hotline: response.data.Hotline,
                    Link: response.data.Link
                })
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [profileId]);

    if (!profile) return <p>No profile data available</p>;

    return (
        <div>
            <h1>{profile.Name}'s Account</h1>
            <p><strong>About:</strong> {profile.About}</p>
            <p><strong>Hotline:</strong> {profile.Hotline}</p>
            <p><strong>Link:</strong> <a href={profile.Link} target="_blank" rel="noopener noreferrer">{profile.Link}</a></p>
            <div style={{ marginTop: '20px' }}>
                <Link to={`/editAdvertiser/${profileId}`}>
                    <button>Edit Profile</button>
                </Link>
            </div>
        </div>
    );
};

export default AccountPage;
