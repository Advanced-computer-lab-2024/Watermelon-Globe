import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {
  Search,
  Calendar,
  DollarSign,
  Tag,
  Filter,
  RefreshCw,
} from "lucide-react";
import Modal from "../Components/Modal"; // Import a reusable modal component
import { Button } from "../Components/ui/button";

export default function ExploreActivities() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [activitySearch, setActivitySearch] = useState("");
  const [startDateActivity, setStartDateActivity] = useState(null);
  const [endDateActivity, setEndDateActivity] = useState(null);
  const [minPriceActivity, setMinPriceActivity] = useState("");
  const [maxPriceActivity, setMaxPriceActivity] = useState("");
  const [prefItinerary, setPrefItinerary] = useState([]);
  const [selectedPrefActivity, setSelectedPrefActivity] = useState("");
  const [itineraryCategory, setItineraryCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const activitiesScrollRef = useRef(null);

  useEffect(() => {
    fetchActivities();
    fetchPref();
    fetchCategories();
  }, []);

  const handlePrefAChange = (event) => {
    setSelectedPrefActivity(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const resetFilters = () => {
    setStartDateActivity(null);
    setEndDateActivity(null);
    setMinPriceActivity("");
    setMaxPriceActivity("");
    setActivitySearch("");
    setSelectedPrefActivity("");
  };

  useEffect(() => {
    filterActivities();
  }, [
    activities,
    activitySearch,
    startDateActivity,
    endDateActivity,
    minPriceActivity,
    maxPriceActivity,
    selectedPrefActivity,
    selectedCategory,
  ]);

  const handleActivityClick = (activityId) => {
    navigate(`/tourist-signup`);
  };

  const fetchActivities = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/Activities/getActivitiesNew");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.activities && Array.isArray(data.activities)) {
        setActivities(data.activities);
        setFilteredActivities(data.activities);
      } else {
        setActivities([]);
        setFilteredActivities([]);
      }
    } catch (error) {
      setError("Failed to fetch activities. Please try again later.");
      setActivities([]);
      setFilteredActivities([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPref = async () => {
    try {
      const response = await fetch("/api/Admin/GetAllPreferenceTag");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPrefItinerary(Array.isArray(data) ? data : []);
    } catch (error) {
      setPrefItinerary([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/Admin/GetAllActivityCategory");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setItineraryCategory(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setItineraryCategory([]);
    }
  };

  const filterActivities = () => {
    let filtered = [...activities];
    if (activitySearch) {
      filtered = filtered.filter(
        (activity) =>
          activity.Name &&
          activity.Name.toLowerCase().includes(activitySearch.toLowerCase())
      );
    }

    if (startDateActivity) {
      filtered = filtered.filter(
        (activity) =>
          activity.Date && new Date(activity.Date) >= startDateActivity
      );
    }

    if (endDateActivity) {
      filtered = filtered.filter(
        (activity) =>
          activity.Date && new Date(activity.Date) <= endDateActivity
      );
    }

    if (minPriceActivity) {
      filtered = filtered.filter(
        (activity) =>
          activity.Price &&
          parseFloat(activity.Price) >= parseFloat(minPriceActivity)
      );
    }

    if (maxPriceActivity) {
      filtered = filtered.filter(
        (activity) =>
          activity.Price &&
          parseFloat(activity.Price) <= parseFloat(maxPriceActivity)
      );
    }

    if (selectedPrefActivity && selectedPrefActivity !== "all") {
      filtered = filtered.filter(
        (activity) =>
          activity.PreferenceTag &&
          activity.PreferenceTag.includes(selectedPrefActivity)
      );
    }
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter(
        (activity) =>
          activity.ActivityCategory &&
          activity.ActivityCategory.includes(selectedCategory)
      );
    }

    setFilteredActivities(filtered);
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
    <section className="container mx-auto px-4 py-12 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-left text-gray-800">
        Explore Activities
      </h2>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <Search className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search activities"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={activitySearch}
            onChange={(e) => setActivitySearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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
                selected={startDateActivity}
                onChange={(date) => setStartDateActivity(date)}
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
                selected={endDateActivity}
                onChange={(date) => setEndDateActivity(date)}
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
                value={minPriceActivity}
                onChange={(e) => setMinPriceActivity(e.target.value)}
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
                value={maxPriceActivity}
                onChange={(e) => setMaxPriceActivity(e.target.value)}
                className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <Tag className="text-gray-400 mr-2" />
          <select
            value={selectedPrefActivity}
            onChange={handlePrefAChange}
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
        <div className="flex items-center mb-4">
          <Tag className="text-gray-400 mr-2" />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a Category</option>
            <option value="all">All</option>
            {itineraryCategory.map((category) => (
              <option key={category._id} value={category._id}>
                {category.activity}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            className="flex items-center px-4 py-2 bg-gray-200 text-gray rounded-md hover:bg-blue-600 transition duration-300"
            onClick={filterActivities}
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
        <p className="text-center text-gray-600">Loading activities...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!isLoading && !error && (
        <div className="relative">
          <div className="flex overflow-x-auto pb-4" ref={activitiesScrollRef}>
            {filteredActivities.map((activity) => (
              <div
                key={activity._id}
                className="flex-shrink-0 w-72 bg-white rounded-lg shadow-md mx-2 cursor-pointer"
                onClick={() => handleButtonClick()}
              >
                <div className="h-48 overflow-x-auto">
                <img
                      className="h-full w-full object-cover md:w-full"
                      src={activity?.picture ? `/uploads/${activity.picture}` : "https://via.placeholder.com/300"}
                      alt={activity?.Name}
                    />
                </div>
                <div className="p-4 h-64 overflow-y-auto">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                    {activity.Name || "Unnamed Activity"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {activity.Location?.coordinates.join(", ") ||
                      "Location not specified"}
                  </p>
                  <p className="text-lg font-semibold text-blue-600 mb-2">
                    {activity.Price
                      ? `$${activity.Price}`
                      : "Price not available"}
                  </p>
                  {activity.Date && (
                    <p className="text-sm text-gray-600 mb-1">
                      Date: {new Date(activity.Date).toLocaleDateString()}
                    </p>
                  )}
                  {activity.Time && (
                    <p className="text-sm text-gray-600 mb-1">
                      Time: {activity.Time}
                    </p>
                  )}
                  {activity.Discount > 0 && (
                    <p className="text-sm text-green-600 font-semibold">
                      Discount: {activity.Discount}% hohohoOFF
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
}
