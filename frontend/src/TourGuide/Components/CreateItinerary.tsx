
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import "./guide.scss";

const CreateItinerary = () => {
  const { id } = useParams();
  const [tags, setTags] = useState<{ _id: string; tag: string }[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activities, setActivities] = useState<{ _id: string; Name: string }[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [pickupDropoffLocations, setPickupDropoffLocations] = useState<{ pickup: string; dropoff: string }[]>([]);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    locations: "",
    timeline: "",
    languageOfTour: "",
    priceOfTour: "",
    accessibility: false,
    bookings: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get("/api/admin/GetAllPreferenceTag");
        setTags(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    const fetchActivities = async () => {
      try {
        const response = await axios.get("/api/Activities/activities");
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchTags();
    fetchActivities();
  }, []);

  const validateField = (name: string, value: string | boolean) => {
    let error = '';
    if (typeof value === 'string' && !value.trim()) {
      error = 'This field is required';
    }
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    validateField(name, newValue);
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const toggleActivity = (activityId: string) => {
    setSelectedActivities(prev =>
      prev.includes(activityId)
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  const addPickupDropoff = () => {
    if (pickup && dropoff) {
      setPickupDropoffLocations(prev => [...prev, { pickup, dropoff }]);
      setPickup("");
      setDropoff("");
    }
  };

  const removePickupDropoff = (index: number) => {
    setPickupDropoffLocations(prev => prev.filter((_, i) => i !== index));
  };

  const addDate = (date: string) => {
    if (date && !availableDates.includes(date)) {
      setAvailableDates(prev => [...prev, date]);
    }
  };

  const removeDate = (date: string) => {
    setAvailableDates(prev => prev.filter(d => d !== date));
  };

  const addTime = (time: string) => {
    if (time && !availableTimes.includes(time)) {
      setAvailableTimes(prev => [...prev, time]);
    }
  };

  const removeTime = (time: string) => {
    setAvailableTimes(prev => prev.filter(t => t !== time));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    Object.entries(formData).forEach(([field, value]) => {
      validateField(field, value);
    });

    if (Object.values(errors).some(error => error !== "")) {
      return; // Exit if there are validation errors
    }

    try {
      const dataToSubmit = {
        ...formData,
        tag: selectedTags,
        activities: selectedActivities,
        pickupDropoffLocations,
        availableDates,
        availableTimes,
        priceOfTour: parseFloat(formData.priceOfTour), // Ensure it's a number
        locations: formData.locations.split(',').map(loc => loc.trim()), // Convert to array
      };
    console.log(dataToSubmit);
      const response = await axios.post(`/api/itinerary/createItinerary/${id}`, dataToSubmit);
      alert("Itinerary created successfully!");
      console.log(response.data);
    
      // Reset form
      setFormData({
        name: "",
        locations: "",
        timeline: "",
        languageOfTour: "",
        priceOfTour: "",
        accessibility: false,
        bookings: false,
      });
      setSelectedTags([]);
      setSelectedActivities([]);
      setPickupDropoffLocations([]);
      setAvailableDates([]);
      setAvailableTimes([]);
    } catch (error) {
      console.error("Error creating itinerary:", error);
      alert("Failed to create itinerary.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="ml-64 p-8">
        <Navbar />
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-3xl font-bold text-green-600 text-center mb-8">Create Itinerary</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-green-600 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-pink-50 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Activities */}
            <div>
              <label className="block text-sm font-medium text-green-600 mb-2">Activities</label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {activities.map((activity) => (
                  <label key={activity._id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedActivities.includes(activity._id)}
                      onChange={() => toggleActivity(activity._id)}
                      className="form-checkbox h-5 w-5 text-green-600 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{activity.Name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-green-600 mb-2">Tags</label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    type="button"
                    key={tag._id}
                    onClick={() => toggleTag(tag._id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedTags.includes(tag._id)
                        ? "bg-pink-500 text-white"
                        : "bg-pink-100 text-green-800 hover:bg-green-200"
                    }`}
                  >
                    {tag.tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Locations */}
            <div>
              <label className="block text-sm font-medium text-green-600 mb-1">Locations</label>
              <input
                type="text"
                name="locations"
                value={formData.locations}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-pink-50 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              {errors.locations && <p className="text-red-500 text-xs mt-1">{errors.locations}</p>}
            </div>

            {/* Timeline */}
            <div>
              <label className="block text-sm font-medium text-green-600 mb-1">Timeline</label>
              <textarea
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-pink-50 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={4}
                required
              />
              {errors.timeline && <p className="text-red-500 text-xs mt-1">{errors.timeline}</p>}
            </div>

            {/* Language of Tour */}
            {/* <div>
              <label className="block text-sm font-medium text-green-600 mb-1">Language of Tour</label>
              <input
                type="text"
                name="languageOfTour"
                value={formData.languageOfTour}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-green-50 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              {errors.languageOfTour && <p className="text-red-500 text-xs mt-1">{errors.languageOfTour}</p>}
            </div> */}
            <div className="fex">

<div>
  <label className="block text-sm font-medium text-green-600 mb-1">Language of Tour</label>
  <select
    name="languageOfTour"
    value={formData.languageOfTour}
    onChange={handleInputChange}
    className="w-full px-3 py-2 bg-pink-50 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
    required
  >
    <option value="" disabled>Select a language</option> {/* Placeholder option */}
    <option value="English">English</option>
    <option value="French">French</option>
    <option value="Arabic">Arabic</option>
    <option value="Spanish">Spanish</option>
    <option value="German">German</option>
    <option value="Italian">Italian</option>
  </select>
  {errors.languageOfTour && (
    <p className="text-red-500 text-xs mt-1">{errors.languageOfTour}</p>
  )}
</div>

            {/* Price of Tour */}
              <div>
              <label className="block text-sm font-medium text-green-600 mb-1">Price of Tour</label>
              <input
                type="number"
                name="priceOfTour"
                value={formData.priceOfTour}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-pink-50 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              {errors.priceOfTour && <p className="text-red-500 text-xs mt-1">{errors.priceOfTour}</p>}
            </div> 
            </div>

    

            {/* Accessibility and Bookings */}
            <div className="flex space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="accessibility"
                  checked={formData.accessibility}
                  onChange={handleInputChange}
                  className="form-checkbox h-5 w-5 text-green-600 rounded focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">Accessibility</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="bookings"
                  checked={formData.bookings}
                  onChange={handleInputChange}
                  className="form-checkbox h-5 w-5 text-green-600 rounded focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">Bookings</span>
              </label>
            </div>

            {/* Pickup/Dropoff Locations */}
            <div>
              <label className="block text-sm font-medium text-green-600 mb-2">Pickup/Dropoff Locations</label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="Pickup"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="flex-1 px-3 py-2 bg-pink-50 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  placeholder="Dropoff"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  className="flex-1 px-3 py-2 bg-pink-50 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={addPickupDropoff}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  <FaPlus />
                </button>
              </div>
              <div className="space-y-2">
                {pickupDropoffLocations.map((location, index) => (
                  <div key={index} className="flex items-center justify-between bg-green-100 p-2 rounded-md">
                    <span className="text-sm text-gray-700">
                      Pickup: {location.pickup}, Dropoff: {location.dropoff}
                    </span>
                    <button
                      type="button"
                      onClick={() => removePickupDropoff(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Dates */}
            <div>
              <label className="block text-sm font-medium text-green-600 mb-2">Available Dates</label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="date"
                  className="flex-1 px-3 py-2 bg-pink-50 border border-green-300 rounded-md focus:outline-none focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
                    if (dateInput.value) {
                      addDate(dateInput.value);
                      dateInput.value = '';
                    }
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  <FaPlus />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {availableDates.map((date, index) => (
                  <div key={index} className="flex items-center bg-green-100 px-3 py-1 rounded-full">
                    <span className="text-sm text-gray-700 mr-2">{date}</span>
                    <button
                      type="button"
                      onClick={() => removeDate(date)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Times */}
            <div>
              <label className="block text-sm font-medium text-green-600 mb-2">Available Times</label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="time"
                  className="flex-1 px-3 py-2 bg-pink-50 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    const timeInput = document.querySelector('input[type="time"]') as HTMLInputElement;
                    if (timeInput.value) {
                      addTime(timeInput.value);
                      timeInput.value = '';
                    }
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  <FaPlus />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {availableTimes.map((time, index) => (
                  <div key={index} className="flex items-center bg-green-100 px-3 py-1 rounded-full">
                    <span className="text-sm text-gray-700 mr-2">{time}</span>
                    <button
                      type="button"
                      onClick={() => removeTime(time)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="px-8 py-3 bg-green-500 text-white rounded-full text-lg hover:bg-green-600 transition-colors"
              >
                Create Itinerary
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateItinerary;


