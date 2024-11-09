import { React, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AdvertiserPage from './Components/advertiserPage';
import TourGuidePage from './Components/tourGuidePage';
import TourismGovernorPage from './Governor/Components/tourismGovernorPage.jsx';
import SignupPage from './Components/SignUp';
import ActivityForm from './Advertiser/Components/ActivityForm.jsx';

import './App.css';

import TouristDetails from "./pages/TouristDetails.js";
import SellerSignup from "./pages/SellerSignup.js";
import AdvertiserSignup from "./Advertiser/Components/SignUp.jsx";
import TouristSignup from "./Tourist/pages/TouristSignup.js";
import TourguideSignup from "./pages/TourguideSignup.js";
import SignupOptions from "./pages/SignUpOptions.js";
import ItineraryDetails from "./Tourist/pages/ItineraryDetails.js";
import MainTouristPage from "./Tourist/pages/TouristHomepage.jsx";
import MainHome from "./Guest/pages/GuestHomepage.jsx";
import MainTour from "./Tourist/pages/TouristHomepage.jsx";
import TouristPage from './TouristPage.js';
import SellerPage from './SellerPage.js';
import HomePage from './Components/Homepage';
import AppPage from './Components/BackendReq';
import CompanyHomepage from './Components/CompanyHomepage.jsx';
import TouristProductsPage from './Tourist/pages/TouristProduct.js';
import ViewProducts from './Guest/pages/ViewProducts.js';

// admin new
import AdminHome from './Admin/pages/AdminHome.js';
import ActivityCategory from './Admin/pages/ActivityCategory.js';
import PreferenceTag from './Admin/pages/PrefenceTag.js';
import AdminProduct from './Admin/pages/AdminProduct.js';
import SellerProduct from './Seller/pages/SellerProduct.js';
<<<<<<< Updated upstream
// import TouristProduct from './pages/TouristProduct.js';
=======
>>>>>>> Stashed changes
import Admin from './Admin/pages/Admin.js';
import Governer from './Admin/pages/Governer.js';
import ActivityDetails from './Components/ActivityDetails.jsx';
import AccountPage from './Advertiser/Components/AccountPage.jsx';
import HomeScreen from './Advertiser/Components/CompanyHomepage.jsx';
import EditProfilePage from './Advertiser/Components/EditCompanyProfile.jsx';
import EditActivity from './Advertiser/Components/EditActivity.jsx';
import ProductTourist from './Tourist/pages/ProductsTourist.js';
import PurchasedProducts from './Tourist/pages/PurchasedProducts.js';
import TourGuideHome from './TourGuide/pages/TourGuideHomePage.js';

//tourguide new

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
        {/* <h1>Navigation</h1> */}
        {/* Navigation Buttons */}
        {/* <nav style={{ marginBottom: '20px' }}>
          <Link to="/advertiser">
            <button >Advertiser Page</button>
          </Link>
          <Link to="/tour-guide">
            <button >Tour Guide Page</button>
          </Link>
          <Link to="/tourism-governor">
            <button>Tourism Governor Page</button>
          </Link>
          <Link to="/signup">
            <button>signup</button>
          </Link>
        </nav> */}

        {/* Routes */}
        <Routes>
          {/* <Route path="/advertiser" element={<AdvertiserPage />} />
          <Route path="/tour-guide" element={<TourGuidePage />} />
          <Route path="/tourism-governor" element={<TourismGovernorPage />} />
          <Route path="/signup" element={<SignupPage onSignup={handleSignup} />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/BackendReq" element={<AppPage />} />
          <Route path="/TouristPage" element={<TouristPage />} />
          <Route path="/SellerPage" element={<SellerPage />} />*/}
          {/* admin new */}
        
          <Route path="/AdminHome" element={<AdminHome />} />
          
          <Route path="/ActivityCategory" element={<ActivityCategory />} />
          <Route path="/PreferenceTag" element={<PreferenceTag />} />
          <Route path="/AdminProduct" element={<AdminProduct />} />
          <Route path="/SellerProduct" element={<SellerProduct />} />
<<<<<<< Updated upstream
          {/* <Route path="/TouristProduct" element={<TouristProduct />} /> */}
=======
>>>>>>> Stashed changes
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Governer" element={<Governer />} />
          <Route path='/ViewProducts' element={<ViewProducts/>}/>
          <Route path ='/ProductTourist/:id' element={<ProductTourist/>}/>
          <Route path ='/PurchasedProducts/:id' element={<PurchasedProducts/>}/>

          {/*<Route path="/create-admin" element={<CreateAdminForm />} />
          <Route path="/CompanyHomepage" element={<CompanyHomepage />} /> */}

          <Route path="/" element={<MainHome />} />

          {/* <Route path="/" element={<Iteneraries />} />
            <Route path="/" element={<SignupOptions />} /> */}
          <Route path="/seller-signup" element={<SellerSignup />} />
          <Route path="/advertiser-signup" element={<AdvertiserSignup />} />
          <Route path="/tourist-signup" element={<TouristSignup />} />
          <Route path="/tourguide-signup" element={<TourguideSignup />} />
          <Route path="/itineraryDetails/:id" element={<ItineraryDetails />} />
          <Route path="/signup-options" element={<SignupOptions />} />
          <Route path="/MainTouristPage/:id" element={<MainTouristPage />} />
          <Route path="/TouristDetails/:id" element={<TouristDetails />} />
          {/* <Route path="/advertiser" element={<AdvertiserPage />} /> */}
          <Route path="/tour-guide" element={<TourGuidePage />} />
          <Route path="/tourism-governor" element={<TourismGovernorPage />} />
          <Route path="/signup" element={<SignupPage onSignup={handleSignup} />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/BackendReq" element={<AppPage />} />
          <Route path="/TouristPage" element={<TouristPage />} />
          <Route path="/SellerPage" element={<SellerPage />} />
          <Route path="/CompanyHomepage" element={<CompanyHomepage />} />
          <Route path="/CompanyAccount" element={<AccountPage/>}/>
          <Route path="/advertiserHomePage" element={<HomeScreen/>}/>
          <Route path="/editAdvertiser" element={<EditProfilePage/>}/>
          <Route path="/editActivity/:id" element={<EditActivity/>}/>
          <Route path='/activity/:id' element={<ActivityDetails/>}/>

          <Route path="/TourGuideHome" element={<TourGuideHome />} />

          {/* <Route path='/advertiserHome' element={<CompanyHomepage/>}/> */}
          <Route path='/add-activity' element={<ActivityForm/>}/>
          <Route path='/activityDetails' element={<ActivityDetails/>}/>

        </Routes>
      </div>
    </Router>
    
  );
 
};

export default App;



// import React, { useState } from 'react';
// import './App.css'
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './Components/Navbar';
// import SignupPage from './Components/SignUp';
// import AccountPage from './Components/AccountPage';
// import EditProfilePage from './Components/EditCompanyProfile';
// import ActivityForm from './Components/ActivityForm';
// import HomeScreen from './Components/CompanyHomepage';
// import EditActivity from './Components/EditActivity';
// import ActivityDetails from './Components/ActivityDetails';

// function App() {
//     const [isSignedUp, setIsSignedUp] = useState(false);
//     const [profile, setProfile] = useState(null);

//     const handleSignup = (newProfile) => {
//         setIsSignedUp(true);
//         setProfile(newProfile);
//     };
//     const handleSignOut =() => {
//       setIsSignedUp(false);
//       localStorage.removeItem('userId');
//       window.location.reload();
//     }

//     return (
//         <Router>
//             <Navbar isSignedUp={isSignedUp} handleSignOut={handleSignOut}/>
//               <div className='signupIcon'>
//                 <Routes>
//                   <Route path='/' element={<HomeScreen/>}/>
//                   <Route path='/add-activity' element={<ActivityForm/>}/>
//                   <Route path="/signup" element={<SignupPage onSignup={handleSignup} />} />
//                   <Route path="/account" element={<AccountPage profile={profile} />} />
//                   <Route path="/edit-profile" element={<EditProfilePage/>} />
//                   <Route path='/edit-activity/:id' element={<EditActivity/>}/>
//                   <Route path='/activity/:id' element={<ActivityDetails/>}/>
//                 </Routes>
//               </div>
//         </Router>
//     );
// }

// export default App;
