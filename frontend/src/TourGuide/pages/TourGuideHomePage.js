import "../../pages/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "../../pages/Navbar.css";
import Navbar from "../../pages/Navbar.jsx";
import ItinerarySlider from "../Components/ItenerarySlider.js";
import TourGuideSettings from "./TourGuideSettings.js";
import ProfilePhotoUpload from "../Components/ProfilePhoto.jsx";
import { useParams, useNavigate } from "react-router-dom";

export default function YourMainPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <header className="bg-white shadow-md">
        <Navbar />
      </header>

      <div className="flex min-h-screen bg-gray-100">
        <div>
          <ProfilePhotoUpload id={id}/>
        </div>
        {/* Sidebar */}
        <div>
          <TourGuideSettings id={id} />
        </div>
        {/* Main Content */}
        <main className="flex-1 p-6">
          <ItinerarySlider />
        </main>
      </div>
    </div>
  );
}
