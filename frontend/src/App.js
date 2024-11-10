import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importing all necessary components
import AdvertiserPage from './Components/advertiserPage';
import TourGuidePage from './Components/tourGuidePage';
import TourismGovernorPage from './Governor/Components/tourismGovernorPage.jsx';
import SignupPage from './Components/SignUp';
import ActivityForm from './Advertiser/Components/ActivityForm.jsx';
import ActivityDetails from './Components/ActivityDetails.jsx';
import HomePage from './Components/Homepage';
import AppPage from './Components/BackendReq';
import CompanyHomepage from './Components/CompanyHomepage.jsx';
import TouristPage from './TouristPage.js';
import SellerPage from './SellerPage.js';

import './App.css';

// import TouristDetails from "./pages/TouristDetails.js";
import TouristDetails from './Tourist/Components/TouristDetails.js';
import SellerSignup from "./pages/SellerSignup.js";
import AdvertiserSignup from "./Advertiser/Components/SignUp.jsx";
import TouristSignup from "./Tourist/pages/TouristSignup.js";
import TourguideSignup from "./pages/TourguideSignup.js";
import SignupOptions from "./pages/SignUpOptions.js";
import ItineraryDetails from "./Tourist/pages/ItineraryDetails.js";
import MainTouristPage from "./Tourist/pages/TouristHomepage.jsx";
import MainHome from "./Guest/pages/GuestHomepage.jsx";
import ViewProducts from './Guest/pages/ViewProducts.js';
import TouristProductsPage from './Tourist/pages/TouristProduct.js';
import ProductTourist from './Tourist/pages/ProductsTourist.jsx';
import PurchasedProducts from './Tourist/pages/PurchasedProducts.jsx';

import AdminHome from './Admin/pages/AdminHome.js';
import ActivityCategory from './Admin/pages/ActivityCategory.js';
import PreferenceTag from './Admin/pages/PrefenceTag.js';
import AdminProduct from './Admin/pages/AdminProduct.js';
import SellerProduct from './Seller/pages/SellerProduct.js';
import Admin from './Admin/pages/Admin.js';
import Governer from './Admin/pages/Governer.js';
import ActivityDetails from './Components/ActivityDetails.jsx';
import ChangePasswordAdmin from './Admin/pages/ChangePasswordAdmin.js';

import AccountPage from './Advertiser/Components/AccountPage.jsx';
import HomeScreen from './Advertiser/Components/CompanyHomepage.jsx';
import EditProfilePage from './Advertiser/Components/EditCompanyProfile.jsx';
import EditActivity from './Advertiser/Components/EditActivity.jsx';
import TourGuideHome from './TourGuide/pages/TourGuideHomePage.js';

import './App.css';

import './App.css';

const App = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [profile, setProfile] = useState(null);

  const handleSignup = (newProfile) => {
    setIsSignedUp(true);
    setProfile(newProfile);
  };

  const handleSignOut = () => {
    setIsSignedUp(false);
    localStorage.removeItem('userId');
    window.location.reload();
  }

  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <Routes>
          {/* Main Home Page */}
          <Route path="/" element={<MainHome />} />

          {/* Admin Routes */}
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/ActivityCategory" element={<ActivityCategory />} />
          <Route path="/PreferenceTag" element={<PreferenceTag />} />
          <Route path="/AdminProduct" element={<AdminProduct />} />
          <Route path="/SellerProduct" element={<SellerProduct />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Governer" element={<Governer />} />

          {/* Guest and Advertiser Routes */}
          <Route path="/advertiser" element={<AdvertiserPage />} />
          <Route path="/tour-guide" element={<TourGuidePage />} />
          <Route path="/tourism-governor" element={<TourismGovernorPage />} />
          <Route path="/signup" element={<SignupPage onSignup={handleSignup} />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/BackendReq" element={<AppPage />} />
          <Route path="/CompanyHomepage" element={<CompanyHomepage />} />
          <Route path="/CompanyAccount" element={<AccountPage />} />
          <Route path="/advertiserHomePage" element={<HomeScreen />} />
          <Route path="/editAdvertiser" element={<EditProfilePage />} />
          <Route path="/editActivity/:id" element={<EditActivity />} />
          <Route path="/activityDetails" element={<ActivityDetails />} />
          <Route path="/add-activity" element={<ActivityForm />} />

          {/* Signup Pages */}
          <Route path="/seller-signup" element={<SellerSignup />} />
          <Route path="/advertiser-signup" element={<AdvertiserSignup />} />
          <Route path="/tourist-signup" element={<TouristSignup />} />
          <Route path="/tourguide-signup" element={<TourguideSignup />} />
          <Route path="/signup-options" element={<SignupOptions />} />

          {/* Tourist Pages */}
          <Route path="/itineraryDetails/:id" element={<ItineraryDetails />} />
          <Route path="/Tourist_ProductsPage" element={<TouristProductsPage />} />
          <Route path="/MainTouristPage/:id" element={<MainTouristPage />} />
          <Route path="/TouristDetails/:id" element={<TouristDetails />} />
          <Route path="/ProductTourist/:id" element={<ProductTourist />} />
          <Route path="/PurchasedProducts/:id" element={<PurchasedProducts />} />
          <Route path="/TouristPage" element={<TouristPage />} />

          {/* Seller and Other Pages */}
          <Route path="/SellerPage" element={<SellerPage />} />
          <Route path='/ViewProducts' element={<ViewProducts />} />

          {/* Tour Guide Pages */}
          <Route path="/TourGuideHome" element={<TourGuideHome />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
