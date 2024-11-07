import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProfilePage = () => {

    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        Name: '',
        About: '',
        Hotline: '',
        Link: '',
    });

    const profileId = localStorage.getItem('userId');

    // Fetch the current profile data when the component loads
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/profiles/${profileId}`);
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, [profileId]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updates = {};
        for (const key in profile) {
            if (profile[key]) {
                updates[key] = profile[key]; // Only include fields that are not empty
            }
        }

        try {
            await axios.put(`http://localhost:8000/updateProfile/${profileId}`, updates);
            alert('Profile updated successfully!');
            navigate('/CompanyAccount');
        } catch (error) {
            console.error(error);
            alert('Error updating profile');
        }
    };

    return (
        <div>
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="Name"
                    value={profile.Name}
                    onChange={handleChange}
                    placeholder="Company Name"
                />
                <input
                    type="text"
                    name="About"
                    value={profile.About}
                    onChange={handleChange}
                    placeholder="About"
                />
                <input
                    type="text"
                    name="Hotline"
                    value={profile.Hotline}
                    onChange={handleChange}
                    placeholder="Hotline"
                />
                <input
                    type="text"
                    name="Link"
                    value={profile.Link}
                    onChange={handleChange}
                    placeholder="Website Link"
                />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfilePage;
