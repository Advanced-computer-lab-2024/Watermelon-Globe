import React, { useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import SignupPage from './Components/SignUp';
import AccountPage from './Components/AccountPage';
import EditProfilePage from './Components/EditCompanyProfile';
import ActivityForm from './Components/ActivityForm';
import HomeScreen from './Components/CompanyHomepage';
import EditActivity from './Components/EditActivity';
import ActivityDetails from './Components/ActivityDetails';
import GMGOW from './Components/GMGOW';

function App() {
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [profile, setProfile] = useState(null);

    const handleSignup = (newProfile) => {
        setIsSignedUp(true);
        setProfile(newProfile);
    };
    const handleSignOut =() => {
      setIsSignedUp(false);
      localStorage.removeItem('userId');
      window.location.reload();
    }

    return (
        <Router>
            <Navbar isSignedUp={isSignedUp} handleSignOut={handleSignOut}/>
              <div className='signupIcon'>
                <Routes>
                  <Route path='/' element={<HomeScreen/>}/>
                  <Route path='/gmgow' element = {<GMGOW/>}/>
                  <Route path='/add-activity' element={<ActivityForm/>}/>
                  <Route path="/signup" element={<SignupPage onSignup={handleSignup} />} />
                  <Route path="/account" element={<AccountPage profile={profile} />} />
                  <Route path="/edit-profile" element={<EditProfilePage/>} />
                  <Route path='/edit-activity/:id' element={<EditActivity/>}/>
                  <Route path='/activity/:id' element={<ActivityDetails/>}/>
                </Routes>
              </div>
        </Router>
    );
}

export default App;
