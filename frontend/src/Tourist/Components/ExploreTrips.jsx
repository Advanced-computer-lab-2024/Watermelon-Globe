import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {
  Search,
  Calendar,
  DollarSign,
  Globe,
  Tag,
  Filter,
  RefreshCw,
  SortAsc,
} from "lucide-react";

const ExploreTrips = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [itineraries, setItineraries] = useState([]);
  const [filteredItineraries, setFilteredItineraries] = useState([]);
  const [tripSearch, setTripSearch] = useState("");
  const [tripSort, setTripSort] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [languageOfTour, setLanguageOfTour] = useState("");
  const [prefItinerary, setPrefItinerary] = useState([]);
  const [selectedPrefItinerary, setSelectedPrefItinerary] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const tripScrollRef = useRef(null);

  useEffect(() => {
    fetchTrips();
    fetchPref();
  }, []);

  const fetchTrips = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // const response = await fetch('/api/Itinerary/getAllItineraries');//////////////
      const response = await fetch("/api/Itinerary/activeItineraries");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const appropriateItinerary = data.filter(
        (itineraries) => !itineraries.inappropriate
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

  const handlePrefIChange = (event) => {
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

  const handleTripClick = (tripId) => {
    // navigate(`/ItineraryDetails/${tripId}`);////////////////////////////
    navigate(`/ItineraryDetails/${tripId}/${id}`);
  };

  const handleSearch = (e) => {
    setTripSearch(e.target.value);
    const searchResults = itineraries.filter(
      (trip) =>
        trip.name &&
        trip.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredItineraries(searchResults);
  };

  return (
    <section className="container mx-auto px-4 py-12 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-left text-gray-800">
        Explore Trips
      </h2>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <Search className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search trips"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={tripSearch}
            onChange={handleSearch}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <div className="relative">
              <Calendar
                className="absolute text-gray-400 top-3 left-3"
                size={16}
              />
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <div className="relative">
              <Calendar
                className="absolute text-gray-400 top-3 left-3"
                size={16}
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Price
            </label>
            <div className="relative">
              <DollarSign
                className="absolute text-gray-400 top-3 left-3"
                size={16}
              />
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Price
            </label>
            <div className="relative">
              <DollarSign
                className="absolute text-gray-400 top-3 left-3"
                size={16}
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language of Tour
            </label>
            <div className="relative">
              <Globe
                className="absolute text-gray-400 top-3 left-3"
                size={16}
              />
              <input
                type="text"
                value={languageOfTour}
                onChange={(e) => setLanguageOfTour(e.target.value)}
                className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort by
            </label>
            <div className="relative">
              <SortAsc
                className="absolute text-gray-400 top-3 left-3"
                size={16}
              />
              <select
                className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={tripSort}
                onChange={(e) => {
                  setTripSort(e.target.value);
                  applySort();
                }}
              >
                <option value="">Select sorting</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="ratingAsc">Rating: Low to High</option>
                <option value="ratingDesc">Rating: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <Tag className="text-gray-400 mr-2" />
          <select
            value={selectedPrefItinerary}
            onChange={handlePrefIChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a preference</option>
            <option value="all">All</option>
            {prefItinerary.map((tag) => (
              <option key={tag._id} value={tag._id}>
                {tag.tag}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            className="flex items-center px-4 py-2 bg-gray-200 text-gray rounded-md hover:bg-blue-600 transition duration-300"
            onClick={applyFilters}
          >
            <Filter className="mr-2" size={16} />
            Apply Filters
          </button>
          <button
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300"
            onClick={resetFilters}
          >
            <RefreshCw className="mr-2" size={16} />
            Reset Filters
          </button>
        </div>
      </div>

      {isLoading && (
        <p className="text-center text-gray-600">Loading trips...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!isLoading && !error && (
        <div className="relative">
          <div className="flex overflow-x-auto pb-4" ref={tripScrollRef}>
            {filteredItineraries.map((trip) => (
              <div
                key={trip._id}
                className="flex-shrink-0 w-72 bg-white rounded-lg shadow-md mx-2 overflow-hidden cursor-pointer"
                onClick={() => handleTripClick(trip._id)}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={trip.image || "/placeholder.svg?height=200&width=300"}
                    alt={trip.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 h-48 overflow-y-auto">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                    {trip.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {trip.location}
                  </p>
                  <p className="text-lg font-semibold text-blue-600 mb-2">
                    ${trip.priceOfTour}
                  </p>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="text-gray-700">{trip.rating}/5</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ExploreTrips;