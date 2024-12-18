

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import Navbar from "./navbar/Navbar";
// import Sidebar from "./sidebar/Sidebar";
// import "./guide.scss"

// const CreateItinerary = () => {
//   const { id } = useParams();
//   const watermelonGreen = '#4CAF50';
//   const watermelonPink = '#FF4081';
//   const [tags, setTags] = useState([]);
//   const [selectedTags, setSelectedTags] = useState([]);
//   const [activities, setActivities] = useState([]);
//   const [selectedActivities, setSelectedActivities] = useState([]);
//   const [pickupDropoffLocations, setPickupDropoffLocations] = useState([]);
//   const [pickup, setPickup] = useState("");
//   const [dropoff, setDropoff] = useState("");
//   const [availableDates, setAvailableDates] = useState([]);
//   const [availableTimes, setAvailableTimes] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     locations: "",
//     timeline: "",
//     languageOfTour: "",
//     priceOfTour: "",
//     accessibility: false,
//     bookings: false,
//   });
//   const [errors, setErrors] = useState({
//     name: "",
//     locations: "",
//     timeline: "",
//     languageOfTour: "",
//     priceOfTour: "",
//   });

//   useEffect(() => {
//     const fetchTags = async () => {
//       try {
//         const response = await axios.get("/api/admin/GetAllPreferenceTag");
//         setTags(response.data);
//       } catch (error) {
//         console.error("Error fetching tags:", error);
//       }
//     };

    

//     const fetchActivities = async () => {
//       try {
//         const response = await axios.get("/api/Activities/activities");
//         setActivities(response.data);
//       } catch (error) {
//         console.error("Error fetching activities:", error);
//       }
//     };

//     fetchTags();
//     fetchActivities();
//   }, []);

  
//  const validateField = (name, value) => {
//     let error = '';
//     if (!value) {
//       error = 'This field should be filled';
//     }
//     setErrors((prev) => ({
//       ...prev,
//       [name]: error,
//     }));
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value
//     });
//     validateField(name, value);
//   };

//   const toggleTag = (tagId) => {
//     setSelectedTags((prev) =>
//       prev.includes(tagId)
//         ? prev.filter((id) => id !== tagId)
//         : [...prev, tagId]
//     );
//   };

//   const toggleActivity = (activityId) => {
//     setSelectedActivities((prev) =>
//       prev.includes(activityId)
//         ? prev.filter((id) => id !== activityId)
//         : [...prev, activityId]
//     );
//   };

//   const addPickupDropoff = () => {
//     if (pickup && dropoff) {
//       setPickupDropoffLocations([...pickupDropoffLocations, { pickup, dropoff }]);
//       setPickup("");
//       setDropoff("");
//     }
//   };

//   const addDate = (date) => {
//     if (date && !availableDates.includes(date)) {
//       setAvailableDates([...availableDates, date]);
//     }
//   };

//   const addTime = (time) => {
//     if (time && !availableTimes.includes(time)) {
//       setAvailableTimes([...availableTimes, time]);
//     }
//   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const dataToSubmit = {
// //         ...formData,
// //         tag: selectedTags,
// //         activities: selectedActivities,
// //         pickupDropoffLocations,
// //         availableDates,
// //         availableTimes,
// //       };
// //       console.log(formData);

// //       const response = await axios.post(
// //         `/api/itinerary/createItinerary/${id}`,
// //         dataToSubmit
// //       );


// //       alert("Itinerary created successfully!");
// //       console.log(response.data);
// //     } catch (error) {
// //       console.error("Error creating itinerary:", error);
// //       alert("Failed to create itinerary.");
// //     }
// //   };

// const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Validate fields
//     Object.keys(formData).forEach((field) => {
//       validateField(field, formData[field]);
//     });
  
//     if (Object.values(errors).some((error) => error !== "")) {
//       return; // Exit if there are validation errors
//     }
  
//     try {
//       const dataToSubmit = {
//         ...formData,
//         tag: selectedTags,
//         activities: selectedActivities,
//         pickupDropoffLocations,
//         availableDates,
//         availableTimes,
//       };
      
//       const response = await axios.post(`/api/itinerary/createItinerary/${id}`, dataToSubmit);
//       alert("Itinerary created successfully!");
//       console.log(response.data);
//       setFormData({
//         name: "",
//         locations: "",
//         timeline: "",
//         languageOfTour: "",
//         priceOfTour: "",
//         accessibility: false,
//         bookings: false,
//       });
  
//       // Reset selected tags and activities
//       setSelectedTags([]);
//       setSelectedActivities([]);
//       setPickupDropoffLocations([]);
//       setAvailableDates([]);
//       setAvailableTimes([]);
//     } catch (error) {
//       console.error("Error creating itinerary:", error);
//       alert("Failed to create itinerary.");
//     }
//   };
  
//   return (
//     <div
//     style={{
//       backgroundColor: "#fff",
//       minHeight: "100vh", // Ensures it covers the full viewport
//       width: "102%", // Full width of the viewport
//       margin: 0, // Remove default margins
//       padding: 0, // Remove default padding
//       display: "flex", // Optional: for flexible alignment
//       flexDirection: "column",
//     }}
//   >
//     <div className="listAdminProduct">
//       <Sidebar/>
//       <div className="listContainerAdminProduct">
//         <Navbar/>
//         <div style={{ padding: "20px" }}>
//         <div className="min-h-screen ">
//           <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
//              <h2 style={{ color: '#2E8B57' }} className="text-2xl font-bold text-800 text-center mb-6">
//               Create Itinerary
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Name Input */}
//               <div>
//                 <label className="block text-sm font-medium text-green-600">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full px-3 py-2 bg-pink-50  border-green-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
//                   required
//                 />
//                   {errors.name && <p className="text-darkPink-600 text-sm">{errors.name}</p>}

//               </div>

//               {/* Activities */}
//               <div>
//               <label className="block text-sm font-medium text-green-600">Activities</label>
//               <div className="px-2 py-1 text-xs font-medium rounded-full transition-colors w-auto">
//               {activities.map((activity) => (
//     <button
//       type="button"
//       style={{backgroundColor:"#FF79A8",
//                marginBottom:2,
//                width:"20%"
               
//             }}
//       onMouseOver={(e) => (e.target.style.backgroundColor = "#FF4081")} // Hover color
//       onMouseOut={(e) => (e.target.style.backgroundColor = "#FF79A8")}
//       key={activity._id}
//       className={`px-2 py-1 text-xs font-medium rounded-full transition-colors ${
//         selectedActivities.includes(activity._id)
//           ? "bg-pink-500 text-white"
//           : "bg-green-200 text-green-800 hover:bg-green-300"
//       }`}
//       onClick={() => toggleActivity(activity._id)}
//     >
//       {activity.Name}
//     </button>
//   ))}
// </div>


//                 <div className="mt-4">
//                   {selectedActivities.length > 0 && (
//                     <div>
//                       <h3 className="text-green-600 font-medium">Selected Activities:</h3>
//                       <div className="flex flex-wrap gap-2 mt-2">
//                         {selectedActivities.map((activityId) => {
//                           const activity = activities.find((a) => a._id === activityId);
//                           return activity ? (
//                             <span key={activityId} className="px-4 py-2 bg-green-200 rounded-full text-green-800 text-sm">
//                               {activity.Name}
//                             </span>
//                           ) : null;
//                         })}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Tags */}
//               <div>
//                 <label className="block text-sm font-medium text-green-600">Tags</label>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {tags.map((tag) => (
//                     <button
//                       type="button"
//                       style={{backgroundColor:"#FF79A8",marginBottom:2,width:"10%"}}
//                       onMouseOver={(e) => (e.target.style.backgroundColor = "#FF4081")} // Hover color
//                       onMouseOut={(e) => (e.target.style.backgroundColor = "#FF79A8")}
//                       key={tag._id}
//                       className={`px-2 py-2 rounded-full text-sm font-medium transition-colors ${
//                         selectedTags.includes(tag._id)
//                           ? "bg-pink-500 text-white"
//                           : "bg-green-200 text-green-800 hover:bg-green-300"
//                       }`}
//                       onClick={() => toggleTag(tag._id)}
//                     >
//                       {tag.tag}
//                     </button>
//                   ))}
//                 </div>
//                 <div className="mt-4">
//                   {selectedTags.length > 0 && (
//                     <div>
//                       <h3 className="text-green-600 font-medium">Selected Tags:</h3>
//                       <div className="flex flex-wrap gap-2 mt-2">
//                         {selectedTags.map((tagId) => {
//                           const tag = tags.find((t) => t._id === tagId);
//                           return tag ? (
//                             <span key={tagId} className="px-4 py-2 bg-green-200 rounded-full text-green-800 text-sm">
//                               {tag.tag}
//                             </span>
//                           ) : null;
//                         })}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Locations */}
//               <div>
//                 <label className="block text-sm font-medium text-green-600">Locations</label>
//                 <input
//                   type="text"
//                   name="locations"
//                   value={formData.locations}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full px-3 py-2 bg-green-50 border border-green-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
//                   required
//                 />
//                  {errors.locations && <p className="text-darkPink-600 text-sm">{errors.name}</p>}

//               </div>

//               {/* Timeline */}
//               <div>
//                 <label className="block text-sm font-medium text-green-600">Timeline</label>
//                 <input
//                   type="text"
//                   name="timeline"
//                   value={formData.timeline}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full px-3 py-2 bg-green-50 border border-green-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
//                   required
//                 />
//                 {errors.timeline && <p className="text-darkPink-600 text-sm">{errors.name}</p>}

//               </div>

//               {/* Language of Tour */}
//               <div>
//                 <label className="block text-sm font-medium text-green-600">Language of Tour</label>
//                 <input
//                   type="text"
//                   name="languageOfTour"
//                   value={formData.languageOfTour}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full px-3 py-2 bg-green-50 border border-green-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
//                   required
//                 />
//                 {errors.languageOfTour && <p className="text-darkPink-600 text-sm">{errors.name}</p>}

//               </div>

//               {/* Price of Tour */}
//               <div>
//                 <label style={{marginBottom:20}} className="block text-sm font-medium text-green-600">Price of Tour</label>
//                 <input
//                 style={{marginBottom:20}}
//                   type="number"
//                   name="priceOfTour"
//                   value={formData.priceOfTour}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full px-3 py-2 bg-green-50 border border-green-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
//                   required
//                 />
//                 {errors.priceOfTour && <p className="text-darkPink-600 text-sm">{errors.name}</p>}

//               </div>

//               {/* Accessibility */}
//               <div className="flex items-center">
//               <label className="ml-2 text-sm text-green-600">Accessibility</label>

//                 <input
//                     style={{marginRight:200}}
                    
//                     type="checkbox"
//                     name="accessibility"
//                     checked={formData.accessibility}
//                     onChange={handleInputChange}
//                     className="w-4 h-4 text-pink-500 focus:ring-pink-500 border-gray-300 rounded"
//                 />
//                 </div>


//               {/* Bookings */}
//               <div className="flex items-center" >
//               <label style={{ marginBottom:30}}
//               className="ml-2 text-sm text-green-600">Bookings</label>

//                 <input
//                  style={{marginRight:180,
//                     marginBottom:30
//                  }}
//                   type="checkbox"
//                   name="bookings"
//                   checked={formData.bookings}
//                   onChange={handleInputChange}
//                   className="w-4 h-4 text-pink-500 focus:ring-pink-500 border-gray-300 rounded"
//                 />
//               </div>
//                {/* Dates */}
//               <div>
//                  <label className="block text-sm font-medium text-green-600">Available Dates</label>
//                 <div className="flex items-center gap-2">
//                    <input
//                     type="date"
//                     className="mt-1 block w-full px-3 py-2 bg-green-50 border border-green-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
//                   />
//                   <button
//                   style={{width:"25%"}}
//                     type="button"
//                     onClick={() => {
//                       const dateInput = document.querySelector('input[type="date"]');
//                       if (dateInput.value) {
//                         addDate(dateInput.value);
//                         dateInput.value = '';
//                       }
//                     }}
//                     className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
//                   >
//                     Add Date
//                   </button>
//                 </div>
//                 {availableDates.length > 0 && (
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {availableDates.map((date, index) => (
//                       <span
//                         key={index}
//                         className="px-3 py-1 bg-green-200 rounded-full text-green-800 text-sm"
//                       >
//                         {date}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Times */}
//               <div>
//                 <label className="block text-sm font-medium text-green-600">Available Times</label>
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="time"
//                     className="mt-1 block w-full px-3 py-2 bg-green-50 border border-green-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
//                   />
//                   <button
//                   style={{width:"25%"}}
//                     type="button"
//                     onClick={() => {
//                       const timeInput = document.querySelector('input[type="time"]');
//                       if (timeInput.value) {
//                         addTime(timeInput.value);
//                         timeInput.value = '';
//                       }
//                     }}
//                     className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
//                   >
//                     Add Time
//                   </button>
//                 </div>
//                 {availableTimes.length > 0 && (
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {availableTimes.map((time, index) => (
//                       <span
//                         key={index}
//                         className="px-3 py-1 bg-green-200 rounded-full text-green-800 text-sm"
//                       >
//                         {time}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Pickup/Dropoff Locations */}
//               <div>
//                 <label className="block text-sm font-medium text-green-600">Pickup/Dropoff Locations</label>
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="text"
//                     placeholder="Pickup"
//                     value={pickup}
//                     onChange={(e) => setPickup(e.target.value)}
//                     className="px-3 py-2 bg-green-50 border border-green-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Dropoff"
//                     value={dropoff}
//                     onChange={(e) => setDropoff(e.target.value)}
//                     className="px-3 py-2 bg-green-50 border border-green-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
//                   />
//                   <button
//                   style={{width:"25%"}}
//                     type="button"
//                     onClick={addPickupDropoff}
//                     className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
//                   >
//                     Add
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {pickupDropoffLocations.map((location, index) => (
//                     <span
//                       key={index}
//                       className="px-3 py-1 bg-green-200 rounded-full text-green-800 text-sm"
//                     >
//                       Pickup: {location.pickup}, Dropoff: {location.dropoff}
//                     </span>
//                   ))}
//                 </div>
//               </div>



//               <div className="flex justify-center mt-8">
//                 <button
//                 style={{width:"30%" , 
//                   marginTop:10
//                 }}
//                   type="submit"
//                   className="px-8 py-3 bg-green-500 text-white rounded-full text-lg hover:bg-green-600"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//     </div>
//   );
// };

// export default CreateItinerary;

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      };
      
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
                className="w-full px-3 py-2 bg-green-50 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        ? "bg-green-500 text-white"
                        : "bg-green-100 text-green-800 hover:bg-green-200"
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
                className="w-full px-3 py-2 bg-green-50 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                className="w-full px-3 py-2 bg-green-50 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={4}
                required
              />
              {errors.timeline && <p className="text-red-500 text-xs mt-1">{errors.timeline}</p>}
            </div>

            {/* Language of Tour */}
            <div>
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
            </div>

            {/* Price of Tour */}
            <div>
              <label className="block text-sm font-medium text-green-600 mb-1">Price of Tour</label>
              <input
                type="number"
                name="priceOfTour"
                value={formData.priceOfTour}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-green-50 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              {errors.priceOfTour && <p className="text-red-500 text-xs mt-1">{errors.priceOfTour}</p>}
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
                  className="flex-1 px-3 py-2 bg-green-50 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  placeholder="Dropoff"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  className="flex-1 px-3 py-2 bg-green-50 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  className="flex-1 px-3 py-2 bg-green-50 border border-green-300 rounded-md focus:outline-none focus:ring-green-500"
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
                  className="flex-1 px-3 py-2 bg-green-50 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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


