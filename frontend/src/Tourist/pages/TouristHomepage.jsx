import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import profileIcon from "../../Assets/Profile.png";
import "../pages/styles.css";
import Navbar from "../../pages/Navbar.jsx";
import ExploreTrips from "../Components/ExploreTrips.jsx";
import ExploreActivities from "../Components/ExploreActivities.jsx";
import ExploreHistoricalSites from "../Components/ExploreHistoricalSites.jsx";
import ExploreTransportations from "../Components/ExploreTransportations.jsx";

const TouristHomePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(true); // You might want to get this from a global state or context

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", { destination, dates, guests });
  };

  const handleSignOut = () => {
    // Implement your sign out logic here
    setIsSignedUp(false);
    // You might want to clear user data, tokens, etc.
  };

  const handleViewDetails = () => {
    navigate(`/TouristDetails/${id}`);
  };

  const handleViewPurchasedDetails = () => {
    navigate(`/PurchasedProducts/${id}`);
  };

  const handleViewProductsDetails = () => {
    navigate(`/ProductTourist/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md">
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold">
              <Link to="/Homepage" className="homeButton">
                WaterMelon Globe
              </Link>
            </div>
            <div className="hidden md:flex space-x-4">
              <Link to={`/Hotels/${id}`} className="text-gray-600 hover:text-gray-900">Hotel</Link>
              <Link to={`/Flights/${id}`} className="text-gray-600 hover:text-gray-900">Flight</Link>
              <Link to="#" className="text-gray-600 hover:text-gray-900">Train</Link>
              <Link to="/Tourist_ProductsPage" className="text-gray-600 hover:text-gray-900">Products</Link>
              <Link to={`/ProductTourist/${id}`} className="text-gray-600 hover:text-gray-900">Available products</Link>
              <Link to={`/PurchasedProducts/${id}`} className="text-gray-600 hover:text-gray-900">Purchased Products</Link>
              <Link to={`/TouristComplaints/${id}`} className="text-gray-600 hover:text-gray-900">Complaints</Link>
              <Link to={`/MyBookings/${id}`} className="text-gray-600 hover:text-gray-900">MyBookings</Link>


            </div>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-1 border rounded">EN</button>
              <button onClick={handleSignOut} className="px-4 py-1 border rounded">Sign Out</button>
              <button
                onClick={handleViewDetails}
                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              ><img
                  className="profileIcon"
                  src={profileIcon}
                  alt="Profile Icon"
                  style={{ width: '20px', height: '20px', bg: 'blue' }}
                />
                View Profile
              </button>
              <Link to={`/completed-itineraries/${id}`} className="px-4 py-1 ml-2 bg-green-600 text-white rounded">
                Completed Itineraries
              </Link>
              <Link to={`/completed-activities/${id}`} className="px-4 py-1 ml-2 bg-green-600 text-white rounded">
                Completed Activities
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="relative h-[600px] flex items-center justify-center text-center text-white">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(/placeholder.svg?height=600&width=1200)`,
            }}
          ></div>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Your Next Great Adventure
            </h1>
            <p className="text-xl mb-8">
              Immerse yourself in the wonders of the world with our handpicked
              selection of unforgettable journeys
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 -mt-16 relative z-20">
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-wrap gap-4"
          >
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="destination"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Find Location
              </label>
              <input
                type="text"
                id="destination"
                placeholder="Where are you going?"
                className="w-full p-2 border rounded"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="dates"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Check in and Check out date
              </label>
              <input
                type="text"
                id="dates"
                placeholder="Add dates"
                className="w-full p-2 border rounded"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="guests"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Special Travels
              </label>
              <select
                id="guests"
                className="w-full p-2 border rounded"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                <option value="">Add guests</option>
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4+ Guests</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>
        </section>

        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">
            Exclusive deals just for you!
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Exclusive Flight Deal"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">
                  Exclusive Flight Deals Just For You!
                </h3>
                <p className="text-blue-600 font-bold">50% Off</p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Exclusive Rental Deal"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">
                  Exclusive Rental Deals Just For You!
                </h3>
                <p className="text-blue-600 font-bold">25% Off</p>
              </div>
            </div>
          </div>
        </section>

        <ExploreTrips />
        <ExploreActivities />
        <ExploreHistoricalSites />
        <ExploreTransportations/>
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} WaterMelon Globe. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default TouristHomePage;
