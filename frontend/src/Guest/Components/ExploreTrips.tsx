import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../Components/ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Modal from "../Components/Modal"; // Import a reusable modal component
import {
  Search,
  Calendar,
  DollarSign,
  Globe,
} from "lucide-react";

interface Itinerary {
  _id: string;
  name: string;
  image: string;
  inappropriate: boolean;
}

interface PreferenceTag {
  _id: string;
  tag: string;
}

const ExploreTrips: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [filteredItineraries, setFilteredItineraries] = useState<Itinerary[]>([]);
  const [tripSearch, setTripSearch] = useState<string>("");
  const [tripSort, setTripSort] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [languageOfTour, setLanguageOfTour] = useState<string>("");
  const [prefItinerary, setPrefItinerary] = useState<PreferenceTag[]>([]);
  const [selectedPrefItinerary, setSelectedPrefItinerary] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const tripScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchTrips();
    fetchPref();
  }, []);

  const fetchTrips = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/Itinerary/activeItineraries");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const appropriateItinerary = data.filter(
        (itinerary: Itinerary) => !itinerary.inappropriate
      );
      setItineraries(appropriateItinerary);
      setFilteredItineraries(appropriateItinerary);
    } catch (error) {
      console.error("Error fetching trips:", error);
      setError("Failed to fetch trips. Please try again later.");
      setItineraries([]);
      setFilteredItineraries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPref = async () => {
    try {
      const response = await axios.get("/api/Admin/GetAllPreferenceTag");
      setPrefItinerary(response.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
      setPrefItinerary([]);
    }
  };

  const applyFilters = async () => {
    setIsLoading(true);
    setError(null);
    try {
      let filterUrl = "/api/filter/itineraryFilter?";
      if (startDate) filterUrl += `startDate=${startDate.toISOString()}&`;
      if (endDate) filterUrl += `endDate=${endDate.toISOString()}&`;
      if (minPrice) filterUrl += `minPrice=${minPrice}&`;
      if (maxPrice) filterUrl += `maxPrice=${maxPrice}&`;
      if (languageOfTour) filterUrl += `language=${languageOfTour}&`;
      if (selectedPrefItinerary && selectedPrefItinerary !== "all")
        filterUrl += `preferenceTag=${selectedPrefItinerary}&`;

      const response = await axios.get(filterUrl);
      setFilteredItineraries(response.data);
    } catch (error) {
      console.error("Error applying filters:", error);
      setError("Failed to apply filters. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const applySort = async () => {
    setIsLoading(true);
    setError(null);
    try {
      let sortUrl = "/api/sort/sortByPrice?";
      if (tripSort === "priceAsc" || tripSort === "priceDesc") {
        sortUrl += `order=${tripSort === "priceAsc" ? "asc" : "desc"}`;
      } else if (tripSort === "ratingAsc" || tripSort === "ratingDesc") {
        sortUrl = "/api/sortByRating?";
        sortUrl += `order=${tripSort === "ratingAsc" ? "asc" : "desc"}`;
      }

      const response = await axios.get(sortUrl);
      setFilteredItineraries(response.data);
    } catch (error) {
      console.error("Error applying sort:", error);
      setError("Failed to apply sorting. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrefIChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPrefItinerary(event.target.value);
  };

  const resetFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setMinPrice("");
    setMaxPrice("");
    setLanguageOfTour("");
    setTripSearch("");
    setTripSort("");
    setSelectedPrefItinerary("");
    setFilteredItineraries(itineraries);
  };

  const handleTripClick = (tripId: string) => {
    navigate(`/ItineraryDetails/${tripId}/${id}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTripSearch(e.target.value);
    const searchResults = itineraries.filter(
      (trip) =>
        trip.name &&
        trip.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredItineraries(searchResults);
  };

  const handleButtonClick = () => {
    setShowModal(true); // Show the modal when a button is clicked
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  const handleSignUpRedirect = () => {
    navigate(`/tourist-signup`);
  };

  return (
    <section className="container mx-auto px-4 py-12 bg-background">
      <h2 className="text-3xl font-bold mb-8 text-left text-secondary">
        Explore Trips
      </h2>

      <div className="bg-cardBackground rounded-lg shadow-lg p-8 mb-8">
        <div className="flex items-center mb-4">
          <Search className="text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Search trips"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ease-in-out"
            value={tripSearch}
            onChange={handleSearch}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
            <div className="relative">
              <Calendar className="absolute text-gray-500 top-3 left-3" size={18} />
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                className="w-full pl-12 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ease-in-out"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
            <div className="relative">
              <Calendar className="absolute text-gray-500 top-3 left-3" size={18} />
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                className="w-full pl-12 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ease-in-out"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Min Price</label>
            <div className="relative">
              <DollarSign className="absolute text-gray-500 top-3 left-3" size={18} />
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full pl-12 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ease-in-out"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Max Price</label>
            <div className="relative">
              <DollarSign className="absolute text-gray-500 top-3 left-3" size={18} />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full pl-12 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <label className="text-sm font-semibold text-gray-700 mr-4">Language</label>
          <select
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={languageOfTour}
            onChange={(e) => setLanguageOfTour(e.target.value)}
          >
            <option value="">Select Language</option>
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
          </select>
        </div>

        <div className="flex items-center mb-4">
          <label className="text-sm font-semibold text-gray-700 mr-4">Preferences</label>
          <select
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={selectedPrefItinerary}
            onChange={handlePrefIChange}
          >
            <option value="">Select Preference</option>
            {prefItinerary.map((pref) => (
              <option key={pref._id} value={pref._id}>
                {pref.tag}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between mt-8">
          <button
            onClick={applyFilters}
            className="p-3 bg-primary text-white rounded-lg hover:bg-primaryDark transition duration-200 ease-in-out"
          >
            Apply Filters
          </button>

          <button
            onClick={resetFilters}
            className="p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200 ease-in-out"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div ref={tripScrollRef} className="overflow-x-auto">
        <div className="flex space-x-4"> {/* Added flex container to arrange items horizontally */}
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            filteredItineraries.map((trip) => (
              <div
                key={trip._id}
                className="bg-cardBackground shadow-md rounded-lg flex-shrink-0 cursor-pointer"
                onClick={() => handleButtonClick()}
              >
                <img
                  src={trip.image}
                  alt={trip.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2 text-primary">{trip.name}</h3>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal onClose={closeModal}>
          <div className="p-8  max-w-sm mx-auto">
            <h2 className="text-2xl font-bold text-center text-primary mb-4">Join the Adventure!</h2>
            <p className="text-center text-gray-600 mb-6">Unlock exclusive access to your personal tour guide and travel companion—sign up now to start your journey with us!</p>
            <Button
              onClick={handleSignUpRedirect}
              className="bg-primary text-white font-semibold py-2 px-4 rounded-full w-full transition duration-300 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
              Start Your Adventure
            </Button>
          </div>
        </Modal>
        )}
    </section>

    


  );
};

export default ExploreTrips;
