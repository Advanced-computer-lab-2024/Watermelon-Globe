import { React, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import "./App.css";
import ReactDOM from "react-dom";
// Importing all necessary components
import SignupPage from "./Components/SignUp";

// SignUpNew Page
import SignUpSellerNew from "Tourist/pages/SellerSignUp";
import SignupAdvertiserNew from "Tourist/pages/AdvertiserSignUp";
import SignupGuideNew from "Tourist/pages/GuideSignUp";
import AdvertiserSignupConfirm from "pages/advertiserSignUpConfirm";
import AllLogin from "./Components/AllLogin";
import NewItineraryDetails from "TourGuide/Components/ItineraryDetails.tsx";
import NewItineraryDetailsGeneral from "TourGuide/Components/itineraryDetailsG";

import RatingsAndCommentsPage from "./Tourist/pages/RatingsAndCommentsPage.tsx";
import CompletedActivities from "./Tourist/pages/CompletedActivities.js";
import CompletedItineraries from "./Tourist/pages/CompletedItineraries.js";
import HomePage from "./Components/Homepage";
import AppPage from "./Components/BackendReq";
import SalesReportPage from "./Advertiser/Components/salesReport/SalesReport.jsx";
import CompanyHomepage from "./Components/CompanyHomepage.jsx";
import TermsAndConditions from "./pages/Terms&Conditions.js";
import TermsAndConditionsGuide from "./pages/Terms&ConditionsGuide.js";
import TermsAndConditionsAdvertiser from "./pages/Terms&ConditionsAdvertiser.js";
// import AdvertiserSignup from "./pages/AdvertiserSignUp2.js";
import SignupOptions from "./pages/SignUpOptions.js";
import MainHome from "./Guest/pages/GuestHomepage.tsx";

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

import GuestPage from "./Guest/pages/GuestHomepage.tsx";
//Admin++ Pages
import ViewDocuments from "./Admin++/pages/ViewDocuments/ViewDocuments";
import AdminSales from "./Admin++/pages/home/HomeSales.jsx";
import AdminUsers from "./Admin++/pages/home/HomeUsers.jsx";
import ActiveUsers from "./Admin++/pages/ActiveUsers/ActiveUsers.jsx";
import PendingUsers from "./Admin++/pages/PendingUsers/PendingUsers.jsx";
import Categories from "./Admin++/pages/AddActivityCategory/AddActivityCategory.jsx";
import AddAdmin from "./Admin++/pages/AddAdmin/AddAdmin.jsx";
import AddGoverner from "./Admin++/pages/AddGoverner/AddGoverner.jsx";
import AddTag from "./Admin++/pages/AddTag/AddTag.jsx";
import ViewAllProducts from "./Admin++/pages/Products/ViewAllProducts.jsx";
import ViewMyProducts from "./Admin++/pages/Products/ViewMyProducts.jsx";
import ViewSalesQuantities from "./Admin++/pages/Products/ViewAvailableQuantity.jsx";
import AddPromoCode from "./Admin++/pages/AddPromoCode/AddPromoCode.jsx";
// import GuestPage from "./Guest/pages/GuestHomepage.jsx";
import AllTourists from "./Admin++/pages/AllTourists/AllTourists.jsx";
import ViewItinerariesEvents from "./Admin++/pages/ViewItinerariesEvents/ViewItinerariesEvents";
//Advertiser Pages
//import AdvertiserSignup from "./Advertiser/Components/AdvertiserSignup.jsx";

// import AdvertiserSignupConfirm from "./Advertiser/Components/AdvertiserSignupConfirm.jsx";
import AdvertiserPage from "./Advertiser/pages/CompanyHomepage.jsx";
import TouristActivityReport from "./Advertiser/pages/ViewActivities/TouristActivityReport";
import AccountPage from "./Advertiser/pages/AccountPage/AccountPage.jsx";
import EditProfilePage from "./Advertiser/Components/EditCompanyProfile.jsx";
import AdvertiserActivityDetails from "./Advertiser/Components/ActivityDetails.jsx";
import ActivityDetails from "./Advertiser/Components/ActivityDetails/ActivityDetails.jsx";
import ActivityForm from "./Advertiser/Components/ActivityForm.jsx";
import AdvertiserLogo from "./Advertiser/Components/AdvertiserLogo.jsx";
import ViewActitvities from "Advertiser/pages/ViewActivities/ViewActivities";
import ViewMyActitvities from "Advertiser/pages/ViewActivities/ViewMyActivities";
import SellerHome from "./Seller/pages/SellerHomePage.jsx";
// import AdminHomePage from "./Admin/pages/home/Home.jsx";

import ChangePasswordAdvertiser from "./Advertiser/Components/ChangePasswordAdvertiser.js";
import EditActivity from "./Advertiser/Components/EditActivity.jsx";
//Seller Pages
import SellerSignup from "./pages/SellerSignup.jsx";
import SellerSignupConfirm from "./pages/sellerSignupConfirm.jsx";
import SellerPage from "./SellerPage.js";
import SellerLogin from "./Seller/pages/SellerLogin";
// import SellerProduct from './Seller/pages/SellerProduct.js';//////////////////////////////

import SellerProduct from "./Seller/pages/SellerProduct.jsx";
import GetAllProducts from "./Seller/Components/GetAllProducts.js";
import CreateProduct from "./Seller/Components/createProduct.js";
import ViewQuantity from "./Seller/Components/ViewAvailableQuantity.js";
import ProductDetails from "./Seller/Components/productDetails.jsx";
import SearchProductByName from "./Seller/Components/SearchProductByName.js";
import SellerProfile from "./Seller/Components/sellerProfile.jsx";
import ViewProfile from "./Seller/Components/viewProfile.tsx";
import ChangePasswordSeller from "./Seller/Components/changePasswordSeller.js";
import GetAllProductsGeneral from "./Seller/Components/GetAllProductsGeneral.jsx";
import ProductsDetailsGeneral from "./Seller/Components/ProductsDetailsGeneral.jsx";

//Tour guide pages
import TourGuideHome from "./TourGuide/pages/TourGuideHomePage.js";
import TourguideSignup from "./pages/TourguideSignup.jsx";
import TourguideSignupConfirm from "./pages/TourguideSignupConfirm.jsx";
import TourGuidePage from "./Components/tourGuidePage";
import TouristItineraryReport from "./TourGuide/pages/ViewItineraries/TouristItinerayReport";
import ChangePasswordTourGuide from "./TourGuide/Components/changePasswordTourGuide.js";
// import ItineraryTourguide from "./TourGuide/Components/itineraryDetails.jsx";
import TourguideHome from "./TourGuide/pages/TourguideHome.jsx";
import ItineraryComponent2 from "./TourGuide/Components/Itineraries.jsx";
import TourGuideProfile from "./TourGuide/Components/viewProfile.tsx";
import AllItineraries from "./TourGuide/Components/AllItineraries.jsx";
import GeneralDetails from "./TourGuide/Components/AllItinerariesDetail.jsx";
//Tour guide pages -- Sprint 3
import ViewItineraries from "./TourGuide/pages/ViewItineraries/ViewItineraries";
import ViewMyItineraries from "./TourGuide/pages/ViewItineraries/ViewMyItineraries";
//Tourism governer pages
import TourismGovernorPage from "./Governor/pages/GovernorHomePage.jsx";
import AddSite from "./Governor/Components/AddSite.js";
import GetMySites from "./Governor/Components/GetMySites.js";
import ChangePasswordGovernor from "./Governor/Components/changePasswordGovernor.js";
import GovernorSiteDetails from "./Governor/Components/siteDetails.js";
import GovernorLogin from "./Governor/pages/GovernorLogin.jsx";
import AddTagGovernor from "Governor/pages/AddTag/AddTag";
import ViewMySites from "Governor/pages/ViewSites/ViewMySites";
import ViewSites from "Governor/pages/ViewSites/ViewSites";
//Tourist pages
import TouristSignup from "./Tourist/pages/TouristSignup.js";
import TouristLogin from "./Tourist/pages/TouristLogin.jsx";
import MainTouristPage from "./Tourist/pages/homepage.tsx";
import MainTour from "./Tourist/pages/TouristHomepage.jsx";
import TouristPage from "./TouristPage.js";
import TouristHomePage from "./Tourist/pages/TouristHomepage.jsx";
import TouristDetails from "./Tourist/pages/TouristDetails.tsx";
import TouristProductsPage from "./Tourist/pages/TouristProduct.js";
import ProductTourist from "./Tourist/pages/ProductsTourist.jsx";
import PurchasedProducts from "./Tourist/pages/PurchasedProducts.jsx";
import ItineraryDetails from "./Tourist/pages/ItineraryDetails.tsx";
import MyBookings from "./Tourist/pages/MyBookings.tsx";
import TouristActivityDetails from "./Tourist/pages/ActivityDetails.tsx";
import TouristComplaints from "./Tourist/pages/TouristComplaints.tsx";
import ShoppingCart from "./Tourist/pages/shoppingCart.tsx";
import CheckoutPage from "./Tourist/pages/CheckoutPage.tsx";
import DraftHomePage from "./Tourist/pages/TouristHomepage.jsx";
import OrdersPage from "./Tourist/pages/OrdersPage.tsx";

import SelectMyPref from "./Tourist/pages/SelectMyPreference.js";

//Flights
import FlightMain from "./Flights/Pages/FlightMain.tsx";
import HotelMain from "./Hotels/Pages/HotelMain.tsx";
import Complaints from "./Admin++/pages/Complaints/Complaints.jsx";

import SiteDetails from "./Tourist/pages/siteDetails.js";

import HotelOffers from "./Hotels/Components/HotelSearchForOffers.tsx";

import TouristBookmarks from './Tourist/Components/TouristBookmarks.jsx'
import MyHotelFlightBookings from "./Tourist/Components/HotelFlightBookings.tsx";
//tourguide new
import TransportationDetails from "./Tourist/pages/TransportationDetails.jsx";
import CreateItinerary from "./TourGuide/Components/CreateItinerary.tsx";
import UploadActivityPicture from "Advertiser/Components/UploadActivityImage";
import AdvertiserProfile from "Advertiser/Components/AdvertiserProfile.tsx";

import { CurrencyProvider } from "./Tourist/Components/CurrencyContext"; 

const stripePromise = loadStripe('pk_test_51QQWIBKTPpyea1n0DvMMy6pxbX2ihuoDsD1K5Hbrsrh5hkw2mG214K159dORl0oA9otHspuTTPMP7NbqgP8buKhE00qzg5wBBP');


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

  // ReactDOM.render(
  //   <CurrencyProvider>
  //     <App />
  //   </CurrencyProvider>,
  //   document.getElementById("root")
  // );

  return (
    <CurrencyProvider>
    <Router>
      <div style={{ padding: "20px" }}>
        <Routes>
          {/* Main Home Page */}
          <Route path="/" element={<GuestPage />} />

          <Route path="/GuestPage" element={<GuestPage />} />

          <Route path="/sign-in/sellers" element={<SignUpSellerNew />} />
          <Route
            path="/sign-in/advertisers"
            element={<SignupAdvertiserNew />}
          />
          <Route path="/sign-in/tour-guides" element={<SignupGuideNew />} />
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
          

          {/*<Route path="/create-admin" element={<CreateAdminForm />} />
          <Route path="/CompanyHomepage" element={<CompanyHomepage />} /> */}

          {/* Admin++ Routes */}
          <Route path="/AdminSales/:id" element={<AdminSales />} />
          <Route path="/AdminUsers/:id" element={<AdminUsers />} />
          <Route path="AddAdmins/:id" element={<AddAdmin />} />
          <Route path="AddGoverner/:id" element={<AddGoverner />} />
          <Route path="ManageActive/:id" element={<ActiveUsers />} />
          <Route path="ManagePending/:id" element={<PendingUsers />} />
          <Route path="Categories/:id" element={<Categories />} />
          <Route path="Tags/:id" element={<AddTag />} />
          <Route path="/ViewAllProducts/:id" element={<ViewAllProducts />} />
          <Route path="/ViewMyProducts/:id" element={<ViewMyProducts />} />
          <Route
            path="/TouristBookmarks/:touristId"
            element={<TouristBookmarks />}
          />
          <Route
            path="/ViewSaleQuantities/:id"
            element={<ViewSalesQuantities />}
          />
          <Route path="/adminAddPromoCode/:id" element={<AddPromoCode />} />
          <Route path="/Tourists/:id" element={<AllTourists />} />

          <Route path="/users/:id" element={<ViewDocuments />} />
          <Route
            path="/ViewItinerariesEvents/:id"
            element={<ViewItinerariesEvents />}
          />
          <Route path="/" element={<MainHome />} />

          <Route path="/complaintss" element={<Complaints />} />
          {/* <Route path="/" element={<Iteneraries />} />
            <Route path="/" element={<SignupOptions />} /> */}
          <Route path="/seller-signup" element={<SellerSignup />} />
          {/* <Route path="/advertiser-signup" element={<AdvertiserSignup />} /> */}
          <Route path="/tourist-signup" element={<TouristSignup />} />
          <Route path="/tourguide-signup" element={<TourguideSignup />} />

          <Route path="/signup-options" element={<SignupOptions />} />
          <Route path="/MainTouristPage/:id" element={<MainTouristPage />} />
          {/* <Route path="/advertiser" element={<CompanyHomepage />} /> */}

          {/* Guest and Advertiser Routes */}
          <Route path="/advertiser/:id" element={<AdvertiserPage />} />
          <Route path="/ViewActitvities/:id" element={<ViewActitvities />} />
          <Route
            path="/ViewMyActitvities/:id"
            element={<ViewMyActitvities />}
          />
          <Route path="/edit-logo/:id" element={<AdvertiserLogo />} />
          <Route
            path="/AdvertiserProfile/:id"
            element={<AdvertiserProfile />}
          />

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
          <Route
            path="/GovernorHomePage/:id"
            element={<TourismGovernorPage />}
          />
          {/* <Route
            path="/itineraryTourguide/:id"
            element={<ItineraryTourguide />}
          /> */}
          <Route path="/TourguideHome/:id" element={<TourguideHome />} />
          <Route
            path="/ItineraryComponent2/:id"
            element={<ItineraryComponent2 />}
          />
          <Route path="/TourGuideProfile/:id" element={<TourGuideProfile />} />
          <Route path="/AllItineraries/:id" element={<AllItineraries />} />
          <Route path="/GeneralDetails/:id" element={<GeneralDetails />} />
          <Route path="/CreateItinerary/:id" element={<CreateItinerary />} />

          <Route path="/AllLogin" element={<AllLogin />} />

          <Route
            path="/tourism-governor/:id"
            element={<TourismGovernorPage />}
          />
          <Route
            path="/GovernorHomePage/:id"
            element={<TourismGovernorPage />}
          />
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
          <Route
            path="/ActivityReport/:id"
            element={<TouristActivityReport />}
          />
          <Route
            path="/ItineraryReport/:id"
            element={<TouristItineraryReport />}
          />
          <Route path="/edit-logo/:id" element={<AdvertiserLogo />} />
          <Route
            path="/advertiserProfile/:advertiserId"
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
          <Route
            path="/activityDetail/:id/:activityId"
            element={<ActivityDetails />}
          />
          <Route
            path="/UploadActivityPicture/:id"
            element={<UploadActivityPicture />}
          />
          <Route path="/editActivity/:id" element={<EditActivity />} />
          <Route path="/add-activity/:id" element={<ActivityForm />} />
          <Route
            path="/SalesReportPage/:advertiserId"
            element={<SalesReportPage />}
          />

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
            element={
              <Elements stripe={stripePromise}>
                <ItineraryDetails />
              </Elements>
            }
          />
          <Route
            path="/NewItineraryDetailsGeneral/:tripid"
            element={<NewItineraryDetailsGeneral />}
          />

          <Route
            path="/NewItineraryDetails/:tripid"
            element={<NewItineraryDetails />}
          />

          <Route
            path="/TouristActivityDetails/:activityId/:id"
            element={
            <Elements stripe={stripePromise}>
            <TouristActivityDetails />
            </Elements>
            }
          />

          <Route path="/TouristLogin" element={<TouristLogin />} />

          <Route path="/MainTouristPage/:id" element={<MainTouristPage />} />
          <Route path="/TouristDetails/:id" element={<TouristDetails />} />
          <Route path="/ProductTourist/:id" element={<ProductTourist />} />
          <Route
            path="/PurchasedProducts/:id"
            element={<PurchasedProducts />}
          />
          <Route path="/TouristPage" element={<TouristPage />} />
          <Route path="/SelectMyPref" element={<SelectMyPref />} />
          <Route path="/TouristHomePage/:id" element={<TouristHomePage />} />
          <Route
            path="/TouristComplaints/:id"
            element={<TouristComplaints />}
          />
          <Route path="/MyBookings/:id" element={<MyBookings />} />
          <Route path="/SiteDetails/:id/:touristId" element={<SiteDetails />} />

          {/* shopping cart*/}
          <Route path="/ShoppingCart/:touristId" element={<ShoppingCart />} />
          <Route path="/CheckoutPage/:touristId" element={<CheckoutPage />} />

          {/* Tourist homepage draft */}
          <Route path="/Draft/:touristId" element={<DraftHomePage />} />

          <Route path="/OrdersPage/:touristId" element={<OrdersPage />} />

          {/* Seller and Other Pages */}
          <Route path="/SellerLogin" element={<SellerLogin />} />
          <Route path="/SellerPage" element={<SellerPage />} />
          <Route path="/GetAllProducts/:id" element={<GetAllProducts />} />
          <Route path="/CreateProduct/:id" element={<CreateProduct />} />
          <Route path="/ViewQuantity/:id" element={<ViewQuantity />} />
          <Route path="/ProductDetails/:id" element={<ProductDetails />} />
          <Route path="/sellerProfile/:id" element={<SellerProfile />} />
          <Route path="/viewProfile/:id" element={<ViewProfile />} />
          <Route
            path="/ChangePasswordSeller/:id"
            element={<ChangePasswordSeller />}
          />
          <Route
            path="/GetAllProductsGeneral/:id"
            element={<GetAllProductsGeneral />}
          />
          <Route
            path="/ProductsDetailsGeneral/:id"
            element={<ProductsDetailsGeneral />}
          />

          {/* Governor Pages*/}
          <Route path="/AddSite/:id" element={<AddSite />} />
          <Route path="/GetMySites/:id" element={<GetMySites />} />
          <Route
            path="/ChangePasswordGovernor/:id"
            element={<ChangePasswordGovernor />}
          />
          <Route path="/ViewItineraries/:id" element={<ViewItineraries />} />
          <Route
            path="/ViewMyItineraries/:id"
            element={<ViewMyItineraries />}
          />
          <Route
            path="/GovernorSiteDetails/:id"
            element={<GovernorSiteDetails />}
          />

          <Route path="/ViewSites/:id" element={<ViewSites />} />
          <Route path="/ViewMySites/:id" element={<ViewMySites />} />
          <Route path="/AddTag/:id" element={<AddTagGovernor />} />

          <Route path="/GovernorLogin" element={<GovernorLogin />} />

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
            path="/TransportationDetails/:id/:touristId"
            element={<TransportationDetails />}
          />

          {/* Path for Flight and Hotel APIs */}
          <Route path="/Flights/:touristId" element={<FlightMain />} />
          <Route path="/Hotels/:touristId" element={<HotelMain />} />
          <Route
            path="/HotelOffers/:hotelId/:touristId/:hotelName"
            element={<HotelOffers />}
          />
          <Route
            path="/MyHotelFlightBookings/:touristId"
            element={<MyHotelFlightBookings />}
          />
        </Routes>
      </div>
    </Router>
    </CurrencyProvider>
  );
};

export default App;
