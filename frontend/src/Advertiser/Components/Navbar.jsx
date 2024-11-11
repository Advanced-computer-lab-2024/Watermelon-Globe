import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import profileIcon from '../Assets/profileIcon.png'

const Navbar = ({ isSignedUp, handleSignOut }) => {
    return (
        <nav>
            <div className='homeButton'> 
                <Link to="/CompanyHomepage" >Activities</Link>
            </div>
            <div className='signupDiv'>
                {isSignedUp ? (
                    <>
                        <Link to="/CompanyAccount" className='AccountLink'>
                            <img
                                className='profileIcon'
                                src={profileIcon}
                                alt="Profile Icon"
                                style={{ width: '30px', height: '30px' }}
                            />
                        </Link>

                        <Link to="/edit-profile">
                            <button className='editProfile'>Edit Profile</button>
                        </Link>

                        <button onClick={handleSignOut}>Sign Out</button>
                    </>
                ) : (
                    <Link to="/signup">Sign Up</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
