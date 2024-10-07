// import React, { useState } from 'react';
// import axios from 'axios';
// // import { set } from 'mongoose';



// ///////////////////////////////////////////////////////////////
// // import React, { useState } from 'react';
// // import './App.css'
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import Navbar from './Components/Navbar';
// // import SignupPage from './Components/SignUp';
// // import AccountPage from './Components/AccountPage';
// // import EditProfilePage from './Components/EditCompanyProfile';
// // import ActivityForm from '../../src/Components/ActivityForm';
// // import HomeScreen from './Components/CompanyHomepage';
// // import EditActivity from './Components/EditActivity';
// // import ActivityDetails from './Components/ActivityDetails';

// // function App() {
// //     const [isSignedUp, setIsSignedUp] = useState(false);
// //     const [profile, setProfile] = useState(null);

// //     const handleSignup = (newProfile) => {
// //         setIsSignedUp(true);
// //         setProfile(newProfile);
// //     };
// //     const handleSignOut =() => {
// //       setIsSignedUp(false);
// //       localStorage.removeItem('userId');
// //       window.location.reload();
// //     }

// //     return (
// //         <Router>
// //             <Navbar isSignedUp={isSignedUp} handleSignOut={handleSignOut}/>
// //               <div className='signupIcon'>
// //                 <Routes>
// //                   <Route path='/' element={<HomeScreen/>}/>
// //                   <Route path='/add-activity' element={<ActivityForm/>}/>
// //                   <Route path="/signup" element={<SignupPage onSignup={handleSignup} />} />
// //                   <Route path="/account" element={<AccountPage profile={profile} />} />
// //                   <Route path="/edit-profile" element={<EditProfilePage/>} />
// //                   <Route path='/edit-activity/:id' element={<EditActivity/>}/>
// //                   <Route path='/activity/:id' element={<ActivityDetails/>}/>
// //                 </Routes>
// //               </div>
// //         </Router>
// //     );
// // }

// // export default App;

// ///////////////////////////////////////////////////////////////


// const App = () => {
//   const [data, setData] = useState(null); // Holds the response data from backend
//   const [error, setError] = useState(null); // Holds any error message
//   const [activId, setActivId] = useState('');
//   const [profId, setProfId] = useState('');
//   const [GuideId, setGuideId] = useState('');
//   const [Guide1Id, setGuide1Id] = useState('');
//   const [siteId, setSiteId] = useState('');
//   const [govId, setGovId] = useState('');
//   const [itineraryId, setItineraryId] = useState(''); // State for itinerary ID input
//   const [childItineraryId, setChildItineraryId] = useState('');
//   const [rawJson, setRawJson] = useState(''); // State for raw JSON input

//   const handleRequest1 = async (url, method = 'get', rawJson = null) => {
//     try {
//       let response;
//       let options = {
//         headers: { 'Content-Type': 'application/json' },
//       };

//       if (method === 'get' && rawJson) {
//         // Convert the raw JSON to query string parameters for GET request
//         const queryParams = new URLSearchParams(JSON.parse(rawJson)).toString();
//         url = `${url}?${queryParams}`; // Add query parameters to the URL
//       } else if (method === 'post' || method === 'put') {
//         const body = JSON.parse(rawJson); // Convert raw JSON input to JS object
//         options.data = body; // Add the body to the request options
//       }

//       response = await axios({ method, url, ...options });
//       setData(response.data);  // Set the response data
//       setError(null);  // Reset error if the request succeeds
//       setRawJson('');  // Clear the raw JSON input after the request
//       setActivId('');
//       setChildItineraryId('');
//       setGovId('');
//       setGuide1Id('');
//       setGuideId('');
//       setItineraryId('');
//       setProfId('');
//       setSiteId('');
//     } catch (err) {
//       setError(err.response ? err.response.data : "Something went wrong");
//     }
//   };



//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Backend Requests</h1>

//       {/* Itineraries Routes */}
//       <h2>Raw JSON Body</h2>
//       <textarea 
//         rows={10}
//         cols={50}
//         value={rawJson}
//         onChange={(e) => setRawJson(e.target.value)}
//         placeholder="Enter raw JSON Here"
//         style={{ width: '100%', marginBottom: '20px' }}
//       />



//       {/* Profile Routes */}
//       <h2>Profiles</h2>
//       <button onClick={() => handleRequest1('/createProfile', 'post', rawJson)}>
//         Create Profile  
//       </button>
//       <button onClick={() => handleRequest1(`/updateProfile/${profId}`, 'put', rawJson)}>
//         Update Profile
//       </button>
//       <button onClick={() => handleRequest1(`/profiles/${profId}`)}>
//         Get Profiles
//       </button>

//       <div>
//         <input 
//           type="text" 
//           value={profId} 
//           onChange={(e) => setProfId(e.target.value)} 
//           placeholder="Enter profile ID" 
//         />
//       </div>

//       <hr />

//       {/* Activity Routes */}
//       <h2>Activities</h2>
//       <button onClick={() => handleRequest1('/newActivity', 'post', rawJson)}>
//         Create Activity
//       </button>
//       <button onClick={() => handleRequest1('/activities')}>
//         Get All Activities
//       </button>
//       <button onClick={() => handleRequest1(`/activities/${activId}`)}>
//         Get Activity by ID
//       </button>
//       <button onClick={() => handleRequest1(`/UpdateActivity/${activId}`, 'put', rawJson)}>
//         Update Activity
//       </button>
//       <button onClick={() => handleRequest1(`/deleteActivity/${activId}`, 'delete')}>
//         Delete Activity
//       </button>


//       <div>
//         <input 
//           type="text" 
//           value={activId} 
//           onChange={(e) => setActivId(e.target.value)} 
//           placeholder="Enter activity ID" 
//         />
//       </div>

//       <hr />

//       {/* Tour Guide Routes */}
//       <h2>Tour Guides</h2>
//       <button onClick={() => handleRequest1('/addGuide', 'post', rawJson)}>
//         Add Guide
//       </button>
//       <button onClick={() => handleRequest1('/getGuide','get', rawJson)}>
//         Get Guide
//       </button>
//       <button onClick={() => handleRequest1(`/updateGuide/${Guide1Id}`, 'put', rawJson)}>
//         Update Guide
//       </button>

//       <div>
//         <input 
//           type="text" 
//           value={Guide1Id} 
//           onChange={(e) => setGuide1Id(e.target.value)} 
//           placeholder="Enter Guide ID " 
//         />
//       </div>

//       <hr />

//       {/* Tourism Governor/Sites Routes */}
//       <h2>Tourism Governor/Sites</h2>
//       <button onClick={() => handleRequest1('/addGov', 'post', rawJson)}>
//         Add Governor
//       </button>
//       <button onClick={() => handleRequest1('/addSite', 'post', rawJson)}>
//         Add Site
//       </button>
//       <button onClick={() => handleRequest1(`/getSite/${siteId}`)}>
//         Get Site
//       </button>
//       <button onClick={() => handleRequest1('/getAllSites')}>
//         Get All Sites
//       </button>
//       <button onClick={() => handleRequest1(`/updateSite/${siteId}`, 'put', rawJson)}>
//         Update Site
//       </button>
//       <button onClick={() => handleRequest1(`/deleteSite/${siteId}`, 'delete')}>
//         Delete Site
//       </button>

//       <div>
//         <input 
//           type="text" 
//           value={siteId} 
//           onChange={(e) => setSiteId(e.target.value)} 
//           placeholder="Enter Site ID" 
//         />
//       </div>

//       <button onClick={() => handleRequest1(`/getMySites?governorID=${govId}`)}>
//         Get My Sites
//       </button>

//       <div>
//         <input 
//           type="text" 
//           value={govId} 
//           onChange={(e) => setGovId(e.target.value)} 
//           placeholder="Enter Gov ID" 
//         />
//       </div>

//       <hr />


//       {/* Itineraries Routes */}
//       <h2>Itineraries</h2>
//       <button onClick={() => handleRequest1('/createItinerary', 'post', rawJson)}>
//         Create Itinerary
//       </button>

//       <button onClick={() => handleRequest1(`/getItinerary/${itineraryId}`)}>
//         Get Itinerary by ID
//       </button>

//       <button onClick={() => handleRequest1('/getAllItineraries')}>
//         Get All Itineraries
//       </button>


//       <button onClick={() => handleRequest1(`/updateItinerary/${itineraryId}`, 'put', rawJson)}>
//         Update Itinerary
//       </button>

//       <button onClick={() => handleRequest1(`/deleteItinerary/${itineraryId}`, 'delete')}>
//         Delete Itinerary
//       </button>

//       <div>
//         <input 
//           type="text" 
//           value={itineraryId} 
//           onChange={(e) => setItineraryId(e.target.value)} 
//           placeholder="Enter Itinerary ID " 
//         />
//       </div>

//       <button onClick={() => handleRequest1(`/getMyItineraries?guideID=${GuideId}`)}>
//         Get My Itineraries
//       </button>

//       <div>
//         <input 
//           type="text" 
//           value={GuideId} 
//           onChange={(e) => setGuideId(e.target.value)} 
//           placeholder="Enter Guide ID " 
//         />
//       </div>


//       <hr />

//       {/* Child Itineraries Routes */}
//       <h2>Tourist Itineraries</h2>
//       <button onClick={() => handleRequest1('/createChildItinerary', 'post', rawJson)}>
//         Create Tourist Itinerary
//       </button>
//       <button onClick={() => handleRequest1(`/getChildItinerary/${childItineraryId}`)}>
//         Get Tourist Itinerary by ID
//       </button>
//       <button onClick={() => handleRequest1('/getAllChildIitineraries')}>
//         Get All Tourist Itineraries
//       </button>

//       <div>
//         <input 
//           type="text" 
//           value={childItineraryId} 
//           onChange={(e) => setChildItineraryId(e.target.value)} 
//           placeholder="Enter Itinerary ID for Update/Delete" 
//         />
//       </div>

//       <button onClick={() => handleRequest1(`/updateChildItinerary/${childItineraryId}`, 'put', rawJson)}>
//         Update Tourist Itinerary
//       </button>
//       <button onClick={() => handleRequest1(`/deleteChildItinerary/${childItineraryId}`, 'delete')}>
//         Delete Tourist Itinerary
//       </button>

//       <hr />


//       {/* Display data or error */}
//       <div>
//         <h2>Response Data:</h2>
//         {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default App;


import { React, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AdvertiserPage from './Components/advertiserPage';
import TourGuidePage from './Components/tourGuidePage';
import TourismGovernorPage from './Components/tourismGovernorPage';
import SignupPage from './Components/SignUp';
// src/App.js
import TouristPage from './TouristPage';
import SellerPage from './SellerPage';
import HomePage from './Components/Homepage';
import AppPage from './Components/BackendReq';
import AdminComponent from './Components/Admin';
import CreateAdminForm from './Components/CreateAdminForm';
//import ActivityDetails from './Components/ActivityDetails';
import CompanyHomepage from './Components/CompanyHomepage';

<<<<<<< Updated upstream
=======
import './App.css';
//pages and components
import TouristDetails from "./pages/TouristDetails.js";
import SellerSignup from "./pages/SellerSignup.js";
import AdvertiserSignup from "./pages/AdvertiserSignup.js";
import TouristSignup from "./pages/TouristSignup.js";
import TourguideSignup from "./pages/TourguideSignup.js";
import SignupOptions from "./pages/SignUpOptions.js";
// import Iteneraries from "./pages/Iteneraries.js"
import ItineraryDetails from "./pages/ItineraryDetails.js";
import MainTouristPage from "./pages/MainTouristPage.js"
import MainHome from "./pages/MainHomeStart.js";
import Homepage from "./Components/Homepage.jsx"
import './pages/Navbar.jsx';

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
          <Route path="/advertiser" element={<AdvertiserPage />} />
          <Route path="/tour-guide" element={<TourGuidePage />} />
          <Route path="/tourism-governor" element={<TourismGovernorPage />} />
          <Route path="/signup" element={<SignupPage onSignup={handleSignup} />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/BackendReq" element={<AppPage />} />
          <Route path="/TouristPage" element={<TouristPage />} />
          <Route path="/SellerPage" element={<SellerPage />} />
          <Route path="/Admin" element={<AdminComponent />} />
=======


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


          <Route path="/advertiser" element={<AdvertiserPage />} />
          <Route path="/tour-guide" element={<TourGuidePage />} />
          <Route path="/tourism-governor" element={<TourismGovernorPage />} />
          <Route path="/BackendReq" element={<AppPage />} />
          <Route path="/TouristPage" element={<TouristPage />} />
          <Route path="/SellerPage" element={<SellerPage />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path='/Admin' element={<Admin />} />
          <Route path='/Governer' element={<Governer />} />
          <Route path='/ActivityCategory' element={<ActivityCategory />} />
          <Route path='/PreferenceTag' element={<PreferenceTag />} />
          <Route path='/AdminProduct' element={<AdminProduct />} />
>>>>>>> Stashed changes
          <Route path="/create-admin" element={<CreateAdminForm />} />
          <Route path="/CompanyHomepage" element={<CompanyHomepage />} />
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