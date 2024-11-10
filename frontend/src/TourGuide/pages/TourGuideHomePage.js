


import '../../pages/styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../../pages/Navbar.css';
import Navbar from '../../pages/Navbar.jsx';
import ItinerarySlider from '../Components/ItenerarySlider.js';
import TourGuideSettings from './TourGuideSettings.js';

export default function YourMainPage() {
  return (
    <div>
      <header className="bg-white shadow-md">
        <Navbar />
      </header>
      
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <TourGuideSettings />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <ItinerarySlider />
        </main>
      </div>
    </div>
  )
}
