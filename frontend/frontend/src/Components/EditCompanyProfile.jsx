import React, { useState } from 'react';
import axios from 'axios';

const EditProfilePage = ({ profileId }) => {
    const [profile, setProfile] = useState({
        Name: '',
        About: '',
        Hotline: '',
        Link: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/profiles/${profileId}`, profile);
            alert('Profile updated successfully!');
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
