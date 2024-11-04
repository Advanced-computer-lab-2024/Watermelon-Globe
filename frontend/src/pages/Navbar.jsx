import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import profileIcon from '../Assets/Profile.png'; // Ensure the path is correct

const Navbar = ({ id, isSignedUp, handleSignOut }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/Homepage" className="homeButton">WaterMelon Globe</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link to="#" className="text-gray-600 hover:text-gray-900">Hotel</Link>
          <Link to="#" className="text-gray-600 hover:text-gray-900">Flight</Link>
          <Link to="#" className="text-gray-600 hover:text-gray-900">Train</Link>
          <Link to="#" className="text-gray-600 hover:text-gray-900">Travel</Link>
          <Link to="#" className="text-gray-600 hover:text-gray-900">Car Rental</Link>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-1 border rounded">EN</button>
          {isSignedUp ? (
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
                <button className="editProfile px-4 py-1 border rounded">Edit Profile</button>
              </Link>
              <button onClick={handleSignOut} className="px-4 py-1 border rounded">Sign Out</button>
              {id && (
                <button 
                  onClick={() => navigate(`/TouristDetails/${id}`)} 
                  className="px-4 py-1 bg-blue-600 text-white rounded"
                >
                  View Profile
                </button>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-1 border rounded text-blue-600">Log In</Link>
              <Link to="/signup-options" className="px-4 py-1 bg-blue-600 text-white rounded">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;