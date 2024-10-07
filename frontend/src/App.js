// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Homepage';
import AppPage from './BackendReq'; // Rename the original App component to AppPage if needed
import TouristPage from './TouristPage';
import SellerPage from './SellerPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/BackendReq" element={<AppPage />} />
        <Route path="/TouristPage" element={<TouristPage />} />
        <Route path="/SellerPage" element={<SellerPage />} />
      </Routes>
    </Router>
  );
};

export default App;