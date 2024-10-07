// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Homepage';
import AppPage from './BackendReq'; // Rename the original App component to AppPage if needed

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/BackendReq" element={<AppPage />} />
      </Routes>
    </Router>
  );
};

export default App;