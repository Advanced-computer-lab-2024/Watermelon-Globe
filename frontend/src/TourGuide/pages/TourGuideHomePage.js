import "../../pages/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "../../pages/Navbar.css";
import Navbar from "../../pages/Navbar.jsx";
import ItineraryComponent from "../Components/ItineraryComponent.js";
import TourGuideSettings from "./TourGuideSettings.js";
import ProfilePhotoUpload from "../Components/ProfilePhoto.jsx";
import { useParams, useNavigate } from "react-router-dom";
import ItineraryComponent2 from "../Components/Itineraries.jsx";

export default function YourMainPage() {
  const { id } = useParams();
  const navigate = useNavigate();


  console.log(id);
  return (
    <div>
      <header className="bg-white shadow-md">
        <Navbar />
      </header>

      <div className="flex min-h-screen bg-gray-100">

        {/* Sidebar */}
      <div>
          <TourGuideSettings id={id} />
        </div>
        <div>
          <ProfilePhotoUpload id={id}/>
        </div>
        {/* Main Content */}
        <main className="flex-1 p-6">
          <ItineraryComponent2 guideID ={id} />
          {/* <ItineraryComponent guideID ={id}/> */}
          
        </main>
      </div>
    </div>
  );
}
