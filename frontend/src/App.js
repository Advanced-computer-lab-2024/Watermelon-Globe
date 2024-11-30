import { React, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
// Importing all necessary components
import SignupPage from "./Components/SignUp";

import RatingsAndCommentsPage from "./Tourist/pages/RatingsAndCommentsPage.js";
import CompletedActivities from "./Tourist/pages/CompletedActivities.js";
import CompletedItineraries from "./Tourist/pages/CompletedItineraries.js";
import HomePage from "./Components/Homepage";
import AppPage from "./Components/BackendReq";
import CompanyHomepage from "./Components/CompanyHomepage.jsx";
import TermsAndConditions from "./pages/Terms&Conditions.js";
import TermsAndConditionsGuide from "./pages/Terms&ConditionsGuide.js";
import TermsAndConditionsAdvertiser from "./pages/Terms&ConditionsAdvertiser.js";
import AdvertiserSignup from "./pages/ AdvertiserSignUp2.js";
import SignupOptions from "./pages/SignUpOptions.js";
import MainHome from "./Guest/pages/GuestHomepage.jsx";

import ViewProducts from "./Guest/pages/ViewProducts.js";
//Admin Pages
// import AdminHome from "./Admin/pages/AdminHome.js";
// import AdminProduct from "./Admin/pages/AdminProduct.jsx";
// import Admin from "./Admin/pages/Admin.js";
// import Governer from "./Admin/pages/Governer.js";
// import ActivityCategory from "./Admin/pages/ActivityCategory.js";
// import PreferenceTag from "./Admin/pages/PrefenceTag.js";
// import AcceptReject from "./Admin/pages/AcceptRejectPage.js";
// import ChangePasswordAdmin from "./Admin/pages/ChangePasswordAdmin.js";
// import Complaint from "./Admin/pages/Complaint.js";
// import Itinerary from "./Admin/pages/Itinerary.js";
// import SelectMyPref from "./Tourist/pages/SelectMyPreference.js";

//Admin++ Pages
import AdminPlusHome from "./Admin++/pages/home/Home.jsx";
import ActiveUsers from "./Admin++/pages/ActiveUsers/ActiveUsers.jsx";
import PendingUsers from "./Admin++/pages/PendingUsers/PendingUsers.jsx";
import Categories from "./Admin++/pages/AddActivityCategory/AddActivityCategory.jsx";
import AddAdmin from "./Admin++/pages/AddAdmin/AddAdmin.jsx";
import AddGoverner from "./Admin++/pages/AddGoverner/AddGoverner.jsx";
import AddTag from "./Admin++/pages/AddTag/AddTag.jsx";

import GuestPage from "./Guest/pages/GuestHomepage.jsx";

//Advertiser Pages
//import AdvertiserSignup from "./Advertiser/Components/AdvertiserSignup.jsx";

import AdvertiserSignupConfirm from "./Advertiser/Components/AdvertiserSignupConfirm.jsx";
import AdvertiserPage from "./Advertiser/pages/CompanyHomepage.jsx";
import AccountPage from "./Advertiser/pages/AccountPage/AccountPage.jsx";
import EditProfilePage from "./Advertiser/Components/EditCompanyProfile.jsx";
import AdvertiserActivityDetails from "./Advertiser/Components/ActivityDetails.jsx";
import ActivityForm from "./Advertiser/Components/ActivityForm.jsx";
import AdvertiserLogo from "./Advertiser/Components/AdvertiserLogo.jsx";
import SellerHome from "./Seller/pages/SellerHomePage.jsx";
// import AdminHomePage from "./Admin/pages/home/Home.jsx";

import ChangePasswordAdvertiser from "./Advertiser/Components/ChangePasswordAdvertiser.js";
import EditActivity from "./Advertiser/Components/EditActivity.jsx";
//Seller Pages
import SellerSignup from "./pages/SellerSignup.jsx";
import SellerSignupConfirm from "./pages/sellerSignupConfirm.jsx";
import SellerPage from "./SellerPage.js";
// import SellerProduct from './Seller/pages/SellerProduct.js';//////////////////////////////

import SellerProduct from './Seller/pages/SellerProduct.jsx';
import GetAllProducts from './Seller/Components/GetAllProducts.js';
import CreateProduct from './Seller/Components/createProduct.js';
import ViewQuantity from './Seller/Components/ViewAvailableQuantity.js'
import ProductDetails from'./Seller/Components/productDetails.jsx'
import SearchProductByName from'./Seller/Components/SearchProductByName.js'
import SellerProfile from './Seller/Components/sellerProfile.jsx'
import ViewProfile from './Seller/Components/viewProfile.js'
import ChangePasswordSeller from './Seller/Components/changePasswordSeller.js'
import GetAllProductsGeneral from './Seller/Components/GetAllProductsGeneral.jsx';
import ProductsDetailsGeneral from './Seller/Components/ProductsDetailsGeneral.jsx';

//Tour guide pages
import TourGuideHome from "./TourGuide/pages/TourGuideHomePage.js";
import TourguideSignup from "./pages/TourguideSignup.jsx";
import TourguideSignupConfirm from "./pages/TourguideSignupConfirm.jsx";
import TourGuidePage from "./Components/tourGuidePage";
import ChangePasswordTourGuide from "./TourGuide/Components/changePasswordTourGuide.js";
import ItineraryTourguide from './TourGuide/Components/itineraryDetails.jsx'
import TourguideHome from './TourGuide/pages/TourguideHome.jsx';
import ItineraryComponent2 from './TourGuide/Components/Itineraries.jsx';
import TourGuideProfile from './TourGuide/Components/viewProfile.jsx';
import AllItineraries from './TourGuide/Components/AllItineraries.jsx';
import GeneralDetails from './TourGuide/Components/AllItinerariesDetail.jsx';



//Tourism governer pages
import TourismGovernorPage from "./Governor/Components/tourismGovernorPage.jsx";

//Tourist pages
import TouristSignup from "./Tourist/pages/TouristSignup.js";
import MainTouristPage from "./Tourist/pages/TouristHomepage.jsx";
import MainTour from "./Tourist/pages/TouristHomepage.jsx";
import TouristPage from "./TouristPage.js";
import TouristHomePage from "./Tourist/pages/TouristHomepage.jsx";
import TouristDetails from "./Tourist/pages/TouristDetails.jsx";
import TouristProductsPage from "./Tourist/pages/TouristProduct.js";
import ProductTourist from "./Tourist/pages/ProductsTourist.jsx";
import PurchasedProducts from "./Tourist/pages/PurchasedProducts.jsx";
import ItineraryDetails from "./Tourist/pages/ItineraryDetails.jsx";
import MyBookings from "./Tourist/pages/MyBookings.jsx";
import TouristActivityDetails from "./Tourist/pages/ActivityDetails.jsx";
import TouristComplaints from "./Tourist/pages/TouristComplaints.jsx";

//Flights
import FlightMain from "./Flights/Pages/FlightMain.js";
import HotelMain from "./Hotels/Pages/HotelMain.js";

import SiteDetails from "./Tourist/pages/siteDetails.js";

import HotelOffers from "./Hotels/Components/HotelSearchForOffers.js";

import MyHotelFlightBookings from "./Tourist/Components/MyBookings.js";
//tourguide new
import ViewDocuments from './Admin/pages/ViewDocuments.jsx';
import TransportationDetails from './Tourist/pages/TransportationDetails.jsx';
import CreateItinerary from './TourGuide/Components/CreateItinerary.jsx';

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
          {/*<Route path="/AdminHomepage" element={<AdminHomePage />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/ActivityCategory" element={<ActivityCategory />} />
          <Route path="/PreferenceTag" element={<PreferenceTag />} />
          <Route path="/AdminProduct" element={<AdminProduct />} />
          <Route path="/AcceptRejectPage" element={<AcceptReject />} />
          <Route path="/SellerProduct" element={<SellerProduct />} />
          
          <Route
            path="/SearchProductByName"
            element={<SearchProductByName />}
          />
*/}
          <Route path="/SellerHome/:id" element={<SellerHome />} />
          {/* <Route path="/TouristProduct" element={<TouristProduct />} /> */}
          {/* <Route path="/Admin" element={<Admin />} /> */}
          {/* <Route path="/Governer" element={<Governer />} />
          <Route
            path="/ChangePasswordAdmin"
            element={<ChangePasswordAdmin />}
          />
          <Route path="/Complaint" element={<Complaint />} />
          <Route path="/AdminViewItinerary" element={<Itinerary />} />
          <Route path="/AdminViewDocuments" element={<ViewDocuments />} /> */}

          {/*<Route path="/create-admin" element={<CreateAdminForm />} />
          <Route path="/CompanyHomepage" element={<CompanyHomepage />} /> */}

          {/* Admin++ Routes */}
          <Route path="/AdminHome++" element={<AdminPlusHome />} />
          <Route path="AddAdmins" element={<AddAdmin />} />
          <Route path="AddGoverner" element={<AddGoverner />} />
          <Route path="ManageActive" element={<ActiveUsers />} />
          <Route path="ManagePending" element={<PendingUsers />} />
          <Route path="Categories" element={<Categories />} />
          <Route path="Tags" element={<AddTag />} />
          <Route path="/" element={<MainHome />} />

          {/* <Route path="/" element={<Iteneraries />} />
            <Route path="/" element={<SignupOptions />} /> */}
          <Route path="/seller-signup" element={<SellerSignup />} />
          <Route path="/advertiser-signup" element={<AdvertiserSignup />} />
          <Route path="/tourist-signup" element={<TouristSignup />} />
          <Route path="/tourguide-signup" element={<TourguideSignup />} />

          <Route path="/signup-options" element={<SignupOptions />} />
          <Route path="/MainTouristPage/:id" element={<MainTouristPage />} />
          {/* <Route path="/advertiser" element={<CompanyHomepage />} /> */}

          {/* Guest and Advertiser Routes */}
          <Route path="/advertiser" element={<AdvertiserPage />} />
          <Route path="/edit-logo/:id" element={<AdvertiserLogo />} />

          {/* Guest Routes */}
          <Route
            path="/completed-itineraries/:id"
            element={<CompletedItineraries />}
          />
          <Route
            path="/completed-activities/:id"
            element={<CompletedActivities />}
          />
          {/* <Route path="/rate-tour-guide/:id" element={<RateTourGuide />} /> */}
          {/* <Route path="/rate-itinerary/:id" element={<RateItinerary />} /> */}
          {/* <Route path="/ratingsAndCommentsPage/:relatedObjectId" element={<RatingsAndCommentsPage />} /> */}
          <Route
            path="/ratingsAndCommentsPage/:relatedObjectId/:touristId/:type"
            element={<RatingsAndCommentsPage />}
          />

          {/* <Route path="/advertiser" element={<AdvertiserPage />} /> */}
          <Route path="/tour-guide" element={<TourGuidePage />} />
          <Route path="/itineraryTourguide/:id" element={<ItineraryTourguide />} />
          <Route path="/TourguideHome/:id" element={<TourguideHome />} />
          <Route path="/ItineraryComponent2/:id" element={<ItineraryComponent2 />} />
          <Route path="/TourGuideProfile/:id" element={<TourGuideProfile />} />
          <Route path="/AllItineraries/:id" element={<AllItineraries />} />
          <Route path="/GeneralDetails/:id" element={<GeneralDetails />} />
          <Route path="/CreateItinerary/:id" element={<CreateItinerary />} />





          <Route path="/tourism-governor/:id" element={<TourismGovernorPage />} />
          <Route
            path="/signup"
            element={<SignupPage onSignup={handleSignup} />}
          />
          <Route
            path="/ChangePasswordAdvertiser/:advertiserId"
            element={<ChangePasswordAdvertiser />}
          />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/BackendReq" element={<AppPage />} />

          {/* Advertiser Pages */}
          <Route path="/advertiser" element={<AdvertiserPage />} />
          <Route path="/edit-logo/:id" element={<AdvertiserLogo />} />
          <Route
            path="/advertiserProfile/:profileId"
            element={<AccountPage />}
          />
          <Route
            path="/editAdvertiser/:profileId"
            element={<EditProfilePage />}
          />
          <Route
            path="/activityDetails/:id/:profileId"
            element={<AdvertiserActivityDetails />}
          />
          <Route path="/editActivity/:id" element={<EditActivity />} />
          <Route path="/add-activity/:userId" element={<ActivityForm />} />

          {/* Signup Pages */}

          <Route
            path="/terms-and-conditions/:userId"
            element={<TermsAndConditions />}
          />
          <Route
            path="/terms-and-conditionsGuide/:userId"
            element={<TermsAndConditionsGuide />}
          />
          <Route
            path="/terms-and-conditionsAdvertiser/:userId"
            element={<TermsAndConditionsAdvertiser />}
          />
          <Route
            path="/SellerSignupConfirm/:id"
            element={<SellerSignupConfirm />}
          />
          <Route
            path="/advertiserSignupConfirm/:id"
            element={<AdvertiserSignupConfirm />}
          />
          <Route path="/tourist-signup" element={<TouristSignup />} />
          <Route
            path="/TourguideSignupConfirm/:id"
            element={<TourguideSignupConfirm />}
          />
          <Route path="/signup-options" element={<SignupOptions />} />

          {/* Tourist Pages */}
          <Route
            path="/Tourist_ProductsPage"
            element={<TouristProductsPage />}
          />
          <Route
            path="/ItineraryDetails/:tripid/:id"
            element={<ItineraryDetails />}
          />
          <Route
            path="/TouristActivityDetails/:activityId/:id"
            element={<TouristActivityDetails />}
          />

          <Route path="/MainTouristPage/:id" element={<MainTouristPage />} />
          <Route path="/TouristDetails/:id" element={<TouristDetails />} />
          <Route path="/ProductTourist/:id" element={<ProductTourist />} />
          <Route
            path="/PurchasedProducts/:id"
            element={<PurchasedProducts />}
          />
          <Route path="/TouristPage" element={<TouristPage />} />
          {/* <Route path="/SelectMyPref" element={<SelectMyPref />} /> */}
          <Route path="/TouristHomePage/:id" element={<TouristHomePage />} />
          <Route
            path="/TouristComplaints/:id"
            element={<TouristComplaints />}
          />
          <Route path="/MyBookings/:id" element={<MyBookings />} />
          <Route path="/SiteDetails/:id" element={<SiteDetails />} />

          {/* Seller and Other Pages */}
          <Route path="/SellerPage" element={<SellerPage />} />
          <Route path="/GetAllProducts/:id" element={<GetAllProducts />} />
          <Route path="/CreateProduct/:id" element={<CreateProduct />} />
          <Route path="/ViewQuantity/:id" element={<ViewQuantity />} />
          <Route path="/ProductDetails/:id" element={<ProductDetails />} />
          <Route path="/sellerProfile/:id" element={<SellerProfile />} />
          <Route path="/viewProfile/:id" element={<ViewProfile />} />
          <Route path="/ChangePasswordSeller/:id" element={<ChangePasswordSeller />} />
          <Route path="/GetAllProductsGeneral/:id" element={<GetAllProductsGeneral />} />
          <Route path="/ProductsDetailsGeneral/:id" element={<ProductsDetailsGeneral />} />






          <Route path="/ViewProducts" element={<ViewProducts />} />
          {/* Tour Guide Pages */}
          <Route path="/TourGuideHome/:id" element={<TourGuideHome />} />
          <Route
            path="/changePasswordTourGuide/:id"
            element={<ChangePasswordTourGuide />}
          />

          {/* <Route path='/advertiserHome' element={<CompanyHomepage/>}/> */}
          <Route path="/add-activity" element={<ActivityForm />} />
          <Route
            path="/TransportationDetails/:id"
            element={<TransportationDetails />}
          />

          {/* Path for Flight and Hotel APIs */}
          <Route path="/Flights/:touristId" element={<FlightMain />} />
          <Route path="/Hotels/:touristId" element={<HotelMain />} />
          <Route
            path="/HotelOffers/:hotelId/:touristId"
            element={<HotelOffers />}
          />
          <Route
            path="/MyHotelFlightBookings/:touristId"
            element={<MyHotelFlightBookings />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
