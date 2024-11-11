import { React, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

// Importing all necessary components
//Main Pages
import SignupPage from "./Components/SignUp";
import HomePage from "./Components/Homepage";
import AppPage from "./Components/BackendReq";
import SignupOptions from "./pages/SignUpOptions.js";
//Guest
import MainHome from "./Guest/pages/GuestHomepage.jsx";
import ViewProducts from './Guest/pages/ViewProducts.js';
//Admin Pages
import AdminHome from './Admin/pages/AdminHome.js';
import AdminProduct from './Admin/pages/AdminProduct.jsx';
import Admin from './Admin/pages/Admin.js';
import Governer from './Admin/pages/Governer.js';
import ActivityCategory from './Admin/pages/ActivityCategory.js';
import PreferenceTag from './Admin/pages/PrefenceTag.js';
import AcceptReject from "./Admin/pages/AcceptRejectPage.js";
import ChangePasswordAdmin from "./Admin/pages/ChangePasswordAdmin.js";
import Complaint from "./Admin/pages/Complaint.js";
import Itinerary from "./Admin/pages/Itinerary.js";
import GuestPage from "./Guest/pages/GuestHomepage.jsx";
//Advertiser Pages
import AdvertiserSignup from "./Advertiser/Components/AdvertiserSignup.jsx";
import AdvertiserSignupConfirm from './Advertiser/Components/AdvertiserSignupConfirm.jsx';
import AdvertiserPage from "./Advertiser/pages/CompanyHomepage.jsx";
import AccountPage from './Advertiser/Components/AccountPage.jsx';
import HomeScreen from './Components/CompanyHomepage.jsx';
import EditProfilePage from './Advertiser/Components/EditCompanyProfile.jsx';
import ActivityForm from "./Advertiser/Components/ActivityForm.jsx";
import ActivityDetails from "./Components/ActivityDetails.jsx";
import EditActivity from './Advertiser/Components/EditActivity.jsx';
import AdvertiserLogo from './Advertiser/Components/AdvertiserLogo.jsx';
//Seller Pages
import SellerSignup from "./pages/SellerSignup.jsx";
import SellerSignupConfirm from './pages/sellerSignupConfirm.jsx';
import SellerPage from "./SellerPage.js";
import SellerProduct from './Seller/pages/SellerProduct.jsx';
//Tour guide pages
import TourGuideHome from './TourGuide/pages/TourGuideHomePage.js';
import TourguideSignup from "./pages/TourguideSignup.jsx";
import TourguideSignupConfirm from './pages/TourguideSignupConfirm.jsx';
import TourGuidePage from "./Components/tourGuidePage";
import ChangePasswordTourGuide from "./TourGuide/pages/changePasswordTourGuide.js";
//Tourism governer pages
import TourismGovernorPage from "./Governor/Components/tourismGovernorPage.jsx";
//Tourist pages
import TouristSignup from "./Tourist/pages/TouristSignup.js";
import MainTouristPage from "./Tourist/pages/TouristHomepage.jsx";
import MainTour from "./Tourist/pages/TouristHomepage.jsx";
import TouristPage from "./TouristPage.js";
import TouristHomePage from "./Tourist/pages/TouristHomepage.jsx";
import TouristDetails from "./Tourist/pages/TouristDetails.jsx";
import TouristProductsPage from './Tourist/pages/TouristProduct.js';
import ProductTourist from './Tourist/pages/ProductsTourist.jsx';
import PurchasedProducts from './Tourist/pages/PurchasedProducts.jsx';
import ItineraryDetails from "./Tourist/pages/ItineraryDetails.jsx";
import MyBookings from "./Tourist/pages/MyBookings.jsx";
import TouristActivityDetails from "./Tourist/pages/ActivityDetails.jsx";
import TouristComplaints from "./Tourist/pages/TouristComplaints.jsx";
//Flights
import FlightMain from "./Flights/Pages/FlightMain.js";
import ViewDocuments from './Admin/pages/ViewDocuments.jsx';

const App = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [profile, setProfile] = useState(null);

  const handleSignup = (newProfile) => {
    setIsSignedUp(true);
    setProfile(newProfile);
  };

  const handleSignOut = () => {
    setIsSignedUp(false);
    localStorage.removeItem("userId");
    window.location.reload();
  };

  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <Routes>
          {/* Main Home Page */}
          <Route path="/" element={<GuestPage />} />

          <Route path="/GuestPage" element={<GuestPage />} />

          {/* Admin Routes */}
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/ActivityCategory" element={<ActivityCategory />} />
          <Route path="/PreferenceTag" element={<PreferenceTag />} />
          <Route path="/AdminProduct" element={<AdminProduct />} />
          <Route path="/AcceptRejectPage" element={<AcceptReject />} />
          <Route path="/SellerProduct" element={<SellerProduct />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Governer" element={<Governer />} />
          <Route
            path="/ChangePasswordAdmin"
            element={<ChangePasswordAdmin />}
          />
          <Route path="/Complaint" element={<Complaint />} />
          <Route path="/AdminViewItinerary" element={<Itinerary />} />
          <Route path="/AdminViewDocuments" element={<ViewDocuments />} />

          {/* Guest Routes */}
          <Route path="/tour-guide" element={<TourGuidePage />} />
          <Route path="/tourism-governor" element={<TourismGovernorPage />} />
          <Route
            path="/signup"
            element={<SignupPage onSignup={handleSignup} />}
          />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/BackendReq" element={<AppPage />} />
          {/* <Route path="/advertiserHomePage" element={<HomeScreen />} /> */}

          {/* Advertiser Pages */}
          <Route path="/advertiser" element={<AdvertiserPage />} />
          <Route path ="/edit-logo/:id" element={<AdvertiserLogo />} />
          <Route path="/advertiserProfile/:profileId" element = {<AccountPage/>}/>
          <Route path="/editAdvertiser/:profileId" element={<EditProfilePage/>} />
          <Route path="/activityDetails" element={<ActivityDetails />} />
          <Route path="/editActivity/:id" element={<EditActivity />} />
          <Route path="/add-activity" element={<ActivityForm />} />

          {/* Signup Pages */}
          <Route path="/seller-signup" element={<SellerSignup />} />
          <Route path="/SellerSignupConfirm/:id" element={<SellerSignupConfirm/>}/>
          <Route path="/advertiser-signup" element={<AdvertiserSignup />} />
          <Route path="/advertiserSignupConfirm/:id" element={<AdvertiserSignupConfirm/>}/>
          <Route path="/tourist-signup" element={<TouristSignup />} />
          <Route path="/tourguide-signup" element={<TourguideSignup />} />
          <Route path="/TourguideSignupConfirm/:id" element={<TourguideSignupConfirm/>}/>
          <Route path="/signup-options" element={<SignupOptions />} />

          {/* Tourist Pages */}
          <Route path="/itineraryDetails/:tripid/:id" element={<ItineraryDetails />} />
          <Route path="/TouristActivityDetails/:activityId/:id" element={<TouristActivityDetails />} />
          <Route
            path="/Tourist_ProductsPage"
            element={<TouristProductsPage />}
          />
          <Route path="/MainTouristPage/:id" element={<MainTouristPage />} />
          <Route path="/TouristDetails/:id" element={<TouristDetails />} />
          <Route path="/ProductTourist/:id" element={<ProductTourist />} />
          <Route
            path="/PurchasedProducts/:id"
            element={<PurchasedProducts />}
          />
          <Route path="/TouristPage" element={<TouristPage />} />
          <Route path="/TouristHomePage/:id" element={<TouristHomePage />} />
          <Route
            path="/TouristComplaints/:id"
            element={<TouristComplaints />}
          />
          <Route path="/MyBookings/:id" element={<MyBookings />} />

          {/* Seller and Other Pages */}
          <Route path="/SellerPage" element={<SellerPage />} />
          <Route path="/ViewProducts" element={<ViewProducts />} />
          {/* Tour Guide Pages */}
          <Route path="/TourGuideHome/:id" element={<TourGuideHome />} />
          <Route
            path="/changePasswordTourGuide/:id"
            element={<ChangePasswordTourGuide />}
          />

          {/* <Route path='/advertiserHome' element={<CompanyHomepage/>}/> */}
          <Route path="/add-activity" element={<ActivityForm />} />
          <Route path="/activityDetails" element={<ActivityDetails />} />

          {/* Path for Flight and Hotel APIs */}
          <Route path="/Flights/:touristId" element={<FlightMain />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
