import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
//pages and components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import TouristDetails from "./components/TouristDetails";
import SellerSignup from "./pages/SellerSignup"; 
import AdvertiserSignup from "./pages/AdvertiserSignup";
import TouristSignup from "./pages/TouristSignup"; 
import TourguideSignup from "./pages/TourguideSignup.js"; 
import SignupOptions from "./pages/SignUpOptions.js"; 
import Iteneraries from "./pages/Iteneraries.js"
import ItineraryDetails from "./pages/ItineraryDetails.js";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        {/* <p>jiiiiii</p> */}
        {/* <p> hiiiiiii </p>
        <p > helllllooooooo</p>
        <p> it's meeeeee</p>
        <p> i was wondering</p>
        <p> if after all those years </p>
        <p> you'd like to meeeeeeeeeeet</p> */}
        <div className="pages">
          <Routes>
            

            <Route path="/" element={<Iteneraries />} />
            <Route path="/" element={<SignupOptions />} />
            <Route path="/seller-signup" element={<SellerSignup />} />
            <Route path="/advertiser-signup" element={<AdvertiserSignup />} />
            <Route path="/tourist-signup" element={<TouristSignup />} />
            <Route path="/tourguide-signup" element={<TourguideSignup />} /> 
            <Route path="/itineraryDetails/:id" element={<ItineraryDetails />} />


          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
