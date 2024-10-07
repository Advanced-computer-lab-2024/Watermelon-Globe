// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TouristPage from './TouristPage';
import SellerPage from './SellerPage';
import HomePage from './Components/Homepage';
import AppPage from './Components/BackendReq'; 
import AdminComponent from './Components/Admin';
import CreateAdminForm from './Components/CreateAdminForm';
//import ActivityDetails from './Components/ActivityDetails';
import CompanyHomepage from './Components/CompanyHomepage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/BackendReq" element={<AppPage />} />
        <Route path="/TouristPage" element={<TouristPage />} />
        <Route path="/SellerPage" element={<SellerPage />} />
        <Route path="/Admin" element={<AdminComponent />} />
        <Route path="/create-admin" element={<CreateAdminForm />} />
        <Route path="/CompanyHomepage" element={<CompanyHomepage />} />
      </Routes>
    </Router>
  );
};

export default App;