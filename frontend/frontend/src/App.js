import React, { useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import SignupPage from './Components/SignUp';
import AccountPage from './Components/AccountPage';
import EditProfilePage from './Components/EditCompanyProfile';
import HomeScreen from './Components/CompanyHomepage';
import ActivityForm from './Components/ActivityForm';

function App() {
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [profile, setProfile] = useState(null);

    const handleSignup = (newProfile) => {
        setIsSignedUp(true);
        setProfile(newProfile);
    };
    const handleSignOut =() => {
      setIsSignedUp(false);
      window.location.reload();
    }

    return (
        <Router>
            <Navbar isSignedUp={isSignedUp} handleSignOut={handleSignOut}/>
              <div className='signupIcon'>
                <Routes>
                  <Route path='/' element={<HomeScreen/>}/>
                  <Route path='add-activity' element={<ActivityForm/>}/>
                  <Route path="/signup" element={<SignupPage onSignup={handleSignup} />} />
                  <Route path="/account" element={<AccountPage profile={profile} />} />
                  <Route path="/edit-profile" element={<EditProfilePage/>} />
                </Routes>
              </div>
        </Router>
    );
}

export default App;
