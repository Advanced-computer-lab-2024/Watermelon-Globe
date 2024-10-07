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

      <button onClick={() => navigate('/activities')}>
        Go to Activities page
      </button>

      <button onClick={() => navigate('/BackendReq')}>
        Go to Seller Page
      </button>

      <button onClick={() => navigate('/CompanyHomepage')}>
      CompanyHomepage
      </button>

      <button onClick={() => navigate('/BackendReq')}>
        Go to Advertiser Page
      </button>

      <button onClick={() => navigate('/BackendReq')}>
        Go to Tourist Page
      </button>

      <button onClick={() => navigate('/BackendReq')}>
        Go to Tour Guide Page
      </button>

      <button onClick={() => navigate('/BackendReq')}>
        Go to Tourism Governor Page
      </button>

      <button onClick={() => navigate('/Admin')}>
        Go to admin Page
      </button>










    </div>
  );
};

export default HomePage;
