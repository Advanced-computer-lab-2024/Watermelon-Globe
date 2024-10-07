// src/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to the Home Page</h1>
      <button onClick={() => navigate('/BackendReq')}>
        Go to App Page
      </button>

      <button onClick={() => navigate('/BackendReq')}>
        Go to Guest Page
      </button>

     <button onClick={() => navigate('/SellerPage')}>
        Go to Seller Page
      </button>

      <button onClick={() => navigate('/advertiser')}>
        Go to Advertiser Page
      </button>

      <button onClick={() => navigate('/TouristPage')}>
        Go to Tourist Page
      </button>

      <button onClick={() => navigate('/tour-guide')}>
        Go to Tour Guide Page
      </button>

      <button onClick={() => navigate('/tourism-governor')}>
        Go to Tourism Governor Page
      </button>

      <button onClick={() => navigate('/Admin')}>
        Go to admin Page
      </button>










    </div>
  );
};

export default HomePage;
