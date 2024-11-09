import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../Components/TouristProduct/TouristSideBar';
import GetAllProducts from '../Components/TouristProduct/GetAllProducts';
import SearchProductByName from '../Components/TouristProduct/SearchProductByName';
import FilterProduct from '../Components/TouristProduct/filterProduct';
import SortProduct from '../Components/TouristProduct/sortProduct';
import profileIcon from '../../Assets/Profile.png';

const TouristProduct = () => {
  const [selectedOption, setSelectedOption] = useState('allProducts');
  const [isSignedUp, setIsSignedUp] = useState(true); // Assuming the user is signed in

  const renderContent = () => {
    switch (selectedOption) {
      case 'allProducts':
        return <GetAllProducts />;
      case 'searchProductByName':
        return <SearchProductByName />;
      case 'filterProductByPrice':
        return <FilterProduct />;
      case 'sortProducts':
        return <SortProduct />;
      default:
        return <GetAllProducts />;
    }
  };

  const handleSignOut = () => {
    // Implement your sign out logic here
    setIsSignedUp(false);
    // You might want to clear user data, tokens, etc.
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md">
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold">
              <Link to="/Homepage" className="homeButton">WaterMelon Globe</Link>
            </div>
            <div className="hidden md:flex space-x-4">
              <Link to="/Tourist-ProductsPage" className="text-gray-600 hover:text-gray-900">Products</Link>
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
      </header>

      <div className="flex-grow flex">
        <SideBar setSelectedOption={setSelectedOption} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Product Management</h1>
            {renderContent()}
          </div>
        </main>
      </div>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; {new Date().getFullYear()} WaterMelon Globe. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TouristProduct;