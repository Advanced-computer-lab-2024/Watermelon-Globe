

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

const CreateItinerary = () => {
  const { id } = useParams();
  const watermelonGreen = '#4CAF50';
  const watermelonPink = '#FF4081';
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [pickupDropoffLocations, setPickupDropoffLocations] = useState([]);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    locations: "",
    timeline: "",
    languageOfTour: "",
    priceOfTour: "",
    accessibility: false,
    bookings: false,
  });
  const [errors, setErrors] = useState({
    name: "",
    locations: "",
    timeline: "",
    languageOfTour: "",
    priceOfTour: "",
  });

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

  
 const validateField = (name, value) => {
    let error = '';
    if (!value) {
      error = 'This field should be filled';
    }
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    validateField(name, value);
  };

  const toggleTag = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const toggleActivity = (activityId) => {
    setSelectedActivities((prev) =>
      prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId]
    );
  };

  const addPickupDropoff = () => {
    if (pickup && dropoff) {
      setPickupDropoffLocations([...pickupDropoffLocations, { pickup, dropoff }]);
      setPickup("");
      setDropoff("");
    }
  };

  const addDate = (date) => {
    if (date && !availableDates.includes(date)) {
      setAvailableDates([...availableDates, date]);
    }
  };

  const addTime = (time) => {
    if (time && !availableTimes.includes(time)) {
      setAvailableTimes([...availableTimes, time]);
    }
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const dataToSubmit = {
//         ...formData,
//         tag: selectedTags,
//         activities: selectedActivities,
//         pickupDropoffLocations,
//         availableDates,
//         availableTimes,
//       };
//       console.log(formData);

//       const response = await axios.post(
//         `/api/itinerary/createItinerary/${id}`,
//         dataToSubmit
//       );


//       alert("Itinerary created successfully!");
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error creating itinerary:", error);
//       alert("Failed to create itinerary.");
//     }
//   };

const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate fields
    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field]);
    });
  
    if (Object.values(errors).some((error) => error !== "")) {
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
      };
      
      const response = await axios.post(`/api/itinerary/createItinerary/${id}`, dataToSubmit);
      alert("Itinerary created successfully!");
      console.log(response.data);
      setFormData({
        name: "",
        locations: "",
        timeline: "",
        languageOfTour: "",
        priceOfTour: "",
        accessibility: false,
        bookings: false,
      });
  
      // Reset selected tags and activities
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
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-green-100 via-pink-50 to-green-200 py-10">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h2 style={{color:'#4CAF50'}} className="text-3xl font-bold text-center text-pink-500 mb-6">
              Create Itinerary
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-green-600">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-pink-50  border-green-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  required
                />
                  {errors.name && <p className="text-darkPink-600 text-sm">{errors.name}</p>}

              </div>

              {/* Activities */}
              <div>
              <label className="block text-sm font-medium text-green-600">Activities</label>
              <div className="px-2 py-1 text-xs font-medium rounded-full transition-colors w-auto">
              {activities.map((activity) => (
    <button
      type="button"
      style={{backgroundColor:"#FF79A8",
               marginBottom:2,
               width:"20%"
               
            }}
      onMouseOver={(e) => (e.target.style.backgroundColor = "#FF4081")} // Hover color
      onMouseOut={(e) => (e.target.style.backgroundColor = "#FF79A8")}
      key={activity._id}
      className={`px-2 py-1 text-xs font-medium rounded-full transition-colors ${
        selectedActivities.includes(activity._id)
          ? "bg-pink-500 text-white"
          : "bg-green-200 text-green-800 hover:bg-green-300"
      }`}
      onClick={() => toggleActivity(activity._id)}
    >
      {activity.Name}
    </button>
  ))}
</div>


                <div className="mt-4">
                  {selectedActivities.length > 0 && (
                    <div>
                      <h3 className="text-green-600 font-medium">Selected Activities:</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedActivities.map((activityId) => {
                          const activity = activities.find((a) => a._id === activityId);
                          return activity ? (
                            <span key={activityId} className="px-4 py-2 bg-green-200 rounded-full text-green-800 text-sm">
                              {activity.Name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-green-600">Tags</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <button
                      type="button"
                      style={{backgroundColor:"#FF79A8",marginBottom:2,width:"10%"}}
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#FF4081")} // Hover color
                      onMouseOut={(e) => (e.target.style.backgroundColor = "#FF79A8")}
                      key={tag._id}
                      className={`px-2 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedTags.includes(tag._id)
                          ? "bg-pink-500 text-white"
                          : "bg-green-200 text-green-800 hover:bg-green-300"
                      }`}
                      onClick={() => toggleTag(tag._id)}
                    >
                      {tag.tag}
                    </button>
                  ))}
                </div>
                <div className="mt-4">
                  {selectedTags.length > 0 && (
                    <div>
                      <h3 className="text-green-600 font-medium">Selected Tags:</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedTags.map((tagId) => {
                          const tag = tags.find((t) => t._id === tagId);
                          return tag ? (
                            <span key={tagId} className="px-4 py-2 bg-green-200 rounded-full text-green-800 text-sm">
                              {tag.tag}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Locations */}
              <div>
                <label className="block text-sm font-medium text-green-600">Locations</label>
                <input
                  type="text"
                  name="locations"
                  value={formData.locations}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-green-50 border border-green-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  required
                />
                 {errors.locations && <p className="text-darkPink-600 text-sm">{errors.name}</p>}

              </div>

              {/* Timeline */}
              <div>
                <label className="block text-sm font-medium text-green-600">Timeline</label>
                <input
                  type="text"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-green-50 border border-green-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  required
                />
                {errors.timeline && <p className="text-darkPink-600 text-sm">{errors.name}</p>}

              </div>

              {/* Language of Tour */}
              <div>
                <label className="block text-sm font-medium text-green-600">Language of Tour</label>
                <input
                  type="text"
                  name="languageOfTour"
                  value={formData.languageOfTour}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-green-50 border border-green-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  required
                />
                {errors.languageOfTour && <p className="text-darkPink-600 text-sm">{errors.name}</p>}

              </div>

              {/* Price of Tour */}
              <div>
                <label style={{marginBottom:20}} className="block text-sm font-medium text-green-600">Price of Tour</label>
                <input
                style={{marginBottom:20}}
                  type="number"
                  name="priceOfTour"
                  value={formData.priceOfTour}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 bg-green-50 border border-green-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  required
                />
                {errors.priceOfTour && <p className="text-darkPink-600 text-sm">{errors.name}</p>}

              </div>

              {/* Accessibility */}
              <div className="flex items-center">
              <label className="ml-2 text-sm text-green-600">Accessibility</label>

                <input
                    style={{marginRight:200}}
                    
                    type="checkbox"
                    name="accessibility"
                    checked={formData.accessibility}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-pink-500 focus:ring-pink-500 border-gray-300 rounded"
                />
                </div>


              {/* Bookings */}
              <div className="flex items-center" >
              <label style={{ marginBottom:30}}
              className="ml-2 text-sm text-green-600">Bookings</label>

                <input
                 style={{marginRight:180,
                    marginBottom:30
                 }}
                  type="checkbox"
                  name="bookings"
                  checked={formData.bookings}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-pink-500 focus:ring-pink-500 border-gray-300 rounded"
                />
              </div>
               {/* Dates */}
              <div>
                 <label className="block text-sm font-medium text-green-600">Available Dates</label>
                <div className="flex items-center gap-2">
                   <input
                    type="date"
                    className="mt-1 block w-full px-3 py-2 bg-green-50 border border-green-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  />
                  <button
                  style={{width:"25%"}}
                    type="button"
                    onClick={() => {
                      const dateInput = document.querySelector('input[type="date"]');
                      if (dateInput.value) {
                        addDate(dateInput.value);
                        dateInput.value = '';
                      }
                    }}
                    className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                  >
                    Add Date
                  </button>
                </div>
                {availableDates.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {availableDates.map((date, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-200 rounded-full text-green-800 text-sm"
                      >
                        {date}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Times */}
              <div>
                <label className="block text-sm font-medium text-green-600">Available Times</label>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    className="mt-1 block w-full px-3 py-2 bg-green-50 border border-green-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  />
                  <button
                  style={{width:"25%"}}
                    type="button"
                    onClick={() => {
                      const timeInput = document.querySelector('input[type="time"]');
                      if (timeInput.value) {
                        addTime(timeInput.value);
                        timeInput.value = '';
                      }
                    }}
                    className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                  >
                    Add Time
                  </button>
                </div>
                {availableTimes.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {availableTimes.map((time, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-200 rounded-full text-green-800 text-sm"
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Pickup/Dropoff Locations */}
              <div>
                <label className="block text-sm font-medium text-green-600">Pickup/Dropoff Locations</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Pickup"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="px-3 py-2 bg-green-50 border border-green-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  />
                  <input
                    type="text"
                    placeholder="Dropoff"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    className="px-3 py-2 bg-green-50 border border-green-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  />
                  <button
                  style={{width:"25%"}}
                    type="button"
                    onClick={addPickupDropoff}
                    className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {pickupDropoffLocations.map((location, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-200 rounded-full text-green-800 text-sm"
                    >
                      Pickup: {location.pickup}, Dropoff: {location.dropoff}
                    </span>
                  ))}
                </div>
              </div>



              <div className="flex justify-center mt-8">
                <button
                style={{width:"30%" , 
                  marginTop:10
                }}
                  type="submit"
                  className="px-8 py-3 bg-green-500 text-white rounded-full text-lg hover:bg-green-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateItinerary;


