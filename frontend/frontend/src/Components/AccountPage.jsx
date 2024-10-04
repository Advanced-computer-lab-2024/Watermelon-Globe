// src/AccountPage.js
import React from 'react';

const AccountPage = ({ profile }) => {
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
