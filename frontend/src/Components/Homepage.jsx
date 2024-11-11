// src/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Components/Navbar.css';
import Navbar from '../Components/Navbar.jsx';

const HomePage = () => {
  const navigate = useNavigate();

  return (

    
    <div style={{ padding: '20px' }}>
      <Navbar />
      
      <h1>Welcome to the Home Page</h1>
      <button onClick={() => navigate('/BackendReq')}>
        Go to App Page
      </button>

      <button onClick={() => navigate('/GuestPage')}>
        Go to Guest Page
      </button>

     <button onClick={() => navigate('/SellerProduct')}>
        Go to Seller Page
      </button>

      <button onClick={() => navigate('/advertiserHomePage')}>
        Go to Advertiser Page
      </button>

      <button onClick={() => navigate('/MainTouristPage/672f80816271465fd87bbddf')}>
        Go to Tourist Page
      </button>

      <button onClick={() => navigate('/TourGuideHome/67291c4a2cab8a982f09e3fd')}>
        Go to Tour Guide Page
      </button>

      <button onClick={() => navigate('/tourism-governor')}>
        Go to Tourism Governor Page
      </button>

      <button onClick={() => navigate('/AdminHome')}>
        Go to admin Page
      </button>










    </div>
  );
};

export default HomePage;
