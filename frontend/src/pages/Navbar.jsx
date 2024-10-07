import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import profileIcon from '../Assets/Profile.png'; // Ensure the path is correct

const Navbar = ({ isSignedUp, handleSignOut }) => {
    return (
        <nav>
            <div className="homeButton"> 
                <Link to="/Homepage" >WATERMELON GLOBE</Link>
            </div>
            <div className="signupDiv">
                {isSignedUp ? ( // If user is signed in
                    <>
                        <Link to="/account" className="AccountLink">
                            <img
                                className="profileIcon"
                                src={profileIcon}
                                alt="Profile Icon"
                                style={{ width: '30px', height: '30px' }}
                            />
                        </Link>

                        <Link to="/edit-profile">
                            <button className="editProfile">Edit Profile</button>
                        </Link>

                        <button className="signOutButton" onClick={handleSignOut}>Sign Out</button>
                    </>
                ) : ( // If user is not signed in
                    <>
                        <Link to="/Register">
                            <button className="registerButton">Register</button>
                        </Link>
                        <Link to="/login">
                            <button className="loginButton">Log In</button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;