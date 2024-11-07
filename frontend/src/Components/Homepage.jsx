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

      <button onClick={() => navigate('/BackendReq')}>
        Go to Guest Page
      </button>

     <button onClick={() => navigate('/SellerProduct')}>
        Go to Seller Page
      </button>

      <button onClick={() => navigate('/advertiser')}>
        Go to Advertiser Page
      </button>

      <button onClick={() => navigate('/MainTouristPage/:id')}>
        Go to Tourist Page
      </button>

      <button onClick={() => navigate('/tour-guide')}>
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
