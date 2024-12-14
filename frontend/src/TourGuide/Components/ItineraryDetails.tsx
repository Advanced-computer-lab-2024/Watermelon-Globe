

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import {
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaDollarSign,
  FaLanguage,
  FaWheelchair,
  FaShare,
  FaEnvelope,
  FaCheck,
  FaTimes,
  FaCalendar,
  FaUser,
  FaComment,
  FaEdit,
  FaTrash,
  FaImage,
  FaBell,
  FaPlus,
  FaMinus
} from "react-icons/fa";

interface Activity {
  _id: string;
  Name: string;
}

interface PreferenceTag {
  _id: string;
  name: string;
}

interface PickupDropoff {
  pickup: string;
  dropoff: string;
}

interface Rating {
  user: string;
  rating: number;
}

interface Comment {
  user: string;
  comment: string;
  date: Date;
}

interface Booking {
  user: string;
}

interface Itinerary {
  _id: string;
  name: string;
  activities: Activity[];
  tag: (PreferenceTag | null)[];
  locations: string[];
  timeline: string;
  languageOfTour: string;
  priceOfTour: number;
  availableDates: Date[];
  availableTimes: string[];
  accessibility: boolean;
  pickupDropoffLocations: PickupDropoff[];
  bookings: boolean;
  guide: string;
  ratings: Rating[];
  rating: number;
  noOfRatings: number;
  ratingsSum: number;
  comments: Comment[];
  inappropriate: boolean;
  bookingsList: Booking[];
  picture: string;
  notifyRequests: string[];
}

interface GeneralTag {
  _id: string;
  name: string;
}

const NewItineraryDetailsGeneral: React.FC = () => {
  const {id}=useParams();
  const { tripid } = useParams<{ tripid: string }>();
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editedValue, setEditedValue] = useState<string | number | boolean | PickupDropoff[] | Date[]>("");
  const [generalTags, setGeneralTags] = useState<GeneralTag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newDate, setNewDate] = useState<Date | null>(null);
  const [newTime, setNewTime] = useState<string>("12:00");

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await axios.get(`/api/Itinerary/getItinerary/${tripid}`);
        setItinerary(response.data);
        setSelectedTags(response.data.tag.filter(Boolean).map((tag: PreferenceTag) => tag._id));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || "Failed to fetch itinerary details");
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchGeneralTags = async () => {
      try {
        const response = await axios.get('/api/tags/getGeneralTags');
        setGeneralTags(response.data);
      } catch (error) {
        console.error("Failed to fetch general tags:", error);
      }
    };

    fetchItinerary();
    fetchGeneralTags();
  }, [tripid]);

  const handleEdit = (field: string, value: string | number | boolean | PickupDropoff[] | Date[]) => {
    setEditMode(field);
    setEditedValue(value);
  };

  const handleSave = async (field: string) => {
    try {
      await axios.put(`/api/Itinerary/updateItinerary/${tripid}`, { [field]: editedValue });
      setItinerary(prev => prev ? { ...prev, [field]: editedValue } : null);
      setEditMode(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(`Failed to update itinerary: ${error.response?.data?.message || error.message}`);
      } else {
        alert("An unexpected error occurred while updating the itinerary");
      }
    }
  };

  const handleCancel = () => {
    setEditMode(null);
    setEditedValue("");
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this itinerary?")) {
      try {
        await axios.delete(`/api/Itinerary/deleteItinerary/${tripid}`);
        alert("Itinerary deleted successfully");
        navigate(`/ViewMyItineraries/${id}`); 
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(`Failed to delete itinerary: ${error.response?.data?.message || error.message}`);
        } else {
          alert("An unexpected error occurred while deleting the itinerary");
        }
      }
    }
  };

  const handleTagChange = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  };

  const handleSaveTags = async () => {
    try {
      await axios.put(`/api/Itinerary/updateItinerary/${tripid}`, { tag: selectedTags });
      setItinerary(prev => {
        if (!prev) return null;
        const updatedTags = selectedTags.map(tagId => {
          const foundTag = generalTags.find(gt => gt._id === tagId);
          return foundTag ? { _id: foundTag._id, name: foundTag.name } : null;
        });
        return { ...prev, tag: updatedTags };
      });
      setEditMode(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(`Failed to update tags: ${error.response?.data?.message || error.message}`);
      } else {
        alert("An unexpected error occurred while updating tags");
      }
    }
  };

  const handleAddDate = async () => {
    if (newDate) {
      try {
        const updatedDates = [...(itinerary?.availableDates || []), newDate];
        await axios.put(`/api/Itinerary/updateItinerary/${tripid}`, { availableDates: updatedDates });
        setItinerary(prev => prev ? { ...prev, availableDates: updatedDates } : null);
        setNewDate(null);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(`Failed to add date: ${error.response?.data?.message || error.message}`);
        } else {
          alert("An unexpected error occurred while adding date");
        }
      }
    }
  };

  const handleDeleteDate = async (dateToDelete: Date) => {
    try {
      const updatedDates = itinerary?.availableDates.filter(date => 
        new Date(date).toDateString() !== new Date(dateToDelete).toDateString()
      ) || [];
      await axios.put(`/api/Itinerary/updateItinerary/${tripid}`, { availableDates: updatedDates });
      setItinerary(prev => prev ? { ...prev, availableDates: updatedDates } : null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(`Failed to delete date: ${error.response?.data?.message || error.message}`);
      } else {
        alert("An unexpected error occurred while deleting date");
      }
    }
  };

  const handleAddTime = async () => {
    if (newTime) {
      try {
        const updatedTimes = [...(itinerary?.availableTimes || []), newTime];
        await axios.put(`/api/Itinerary/updateItinerary/${tripid}`, { availableTimes: updatedTimes });
        setItinerary(prev => prev ? { ...prev, availableTimes: updatedTimes } : null);
        setNewTime("12:00");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(`Failed to add time: ${error.response?.data?.message || error.message}`);
        } else {
          alert("An unexpected error occurred while adding time");
        }
      }
    }
  };

  const handleDeleteTime = async (timeToDelete: string) => {
    try {
      const updatedTimes = itinerary?.availableTimes.filter(time => time !== timeToDelete) || [];
      await axios.put(`/api/Itinerary/updateItinerary/${tripid}`, { availableTimes: updatedTimes });
      setItinerary(prev => prev ? { ...prev, availableTimes: updatedTimes } : null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(`Failed to delete time: ${error.response?.data?.message || error.message}`);
      } else {
        alert("An unexpected error occurred while deleting time");
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error || !itinerary) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error || "Itinerary not found"}</div>;
  }

  return (
    <div style={{
      backgroundColor: "#fff",
      minHeight: "100vh",
      width: "102%",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
    }}>
      <div className="listAdminProduct">
        <Sidebar />
        <div className="listContainerAdminProduct">
          <Navbar />
          <div style={{ padding: "20px" }}>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-primary p-5 relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-white rounded-full p-2">
                        <img src={itinerary.picture} alt={itinerary.name} className="h-16 w-16 object-cover rounded-full" />
                      </div>
                     <div>
                      {editMode === 'name' ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={editedValue as string}
                          onChange={(e) => setEditedValue(e.target.value)}
                          className="text-3xl font-bold text-white bg-transparent border-b border-white"
                        />
                        <button
                          onClick={() => handleSave('name')} // Save changes
                          className="bg-green-500 text-white p-2 rounded-full"
                        >
                          <FaCheck/>
                        </button>
                        <button
                          onClick={() => setEditMode(null)} // Cancel editing
                          className="bg-red-500 text-white p-2 rounded-full"
                        >
                          <FaTimes/>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                                            <h2 className="text-3xl font-bold text-white flex items-center">
                                            {itinerary.name}
                        </h2>
                        <button
                                          onClick={() => handleEdit('name', itinerary.name)}
                                          className="bg-white text-primary p-2 rounded-full"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    )}
                    <p className="text-white opacity-75">
                      {itinerary.locations.join(", ")}
                    </p>
                  </div>

                                    </div>
                                  </div>

                                  </div>  

                                        
                                    </div> 
                                    <div>
 

                <div className="p-6 space-y-6">
                  {/* Activities */}
                  <div className="bg-cardBackground shadow-md rounded-lg p-4">
                    <h3 className="text-xl font-semibold text-secondary mb-4">Activities</h3>
                    <ul className="space-y-2 max-h-60 overflow-y-auto pr-4">
                      {itinerary.activities.map((activity) => (
                        <li key={activity._id} className="flex justify-between items-center bg-white p-3 rounded shadow">
                          <span className="text-gray-800 font-medium">{activity.Name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  {/* <div className="bg-cardBackground shadow-md rounded-lg p-4">
                    <h3 className="text-xl font-semibold text-secondary mb-4 flex items-center justify-between">
                      Tags
                      <button
                        onClick={() => setEditMode('tags')}
                        className="text-primary"
                      >
                        <FaEdit />
                      </button>
                    </h3>
                    {editMode === 'tags' ? (
                      <div>
                        <div className="grid grid-cols-2 gap-2">
                          {generalTags.map(tag => (
                            <label key={tag._id} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={selectedTags.includes(tag._id)}
                                onChange={() => handleTagChange(tag._id)}
                                className="form-checkbox h-5 w-5 text-primary"
                              />
                              <span>{tag.name}</span>
                            </label>
                          ))}
                        </div>
                        <div className="mt-4">
                          <button onClick={handleSaveTags} className="bg-primary text-white px-4 py-2 rounded mr-2">
                            Save Tags
                          </button>
                          <button onClick={() => setEditMode(null)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {itinerary?.tag.filter(Boolean).map((tag) => (
                          <span key={tag._id} className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div> */}

                  {/* Timeline */}
                  <div className="bg-cardBackground shadow-md rounded-lg p-4">
                    <h3 className="text-xl font-semibold text-secondary mb-4 flex items-center justify-between">
                      Timeline
                      <button
                        onClick={() => handleEdit('timeline', itinerary.timeline)}
                        className="text-primary"
                      >
                        <FaEdit />
                      </button>
                    </h3>
                    {editMode === 'timeline' ? (
                      <div>
                        <textarea
                          value={editedValue as string}
                          onChange={(e) => setEditedValue(e.target.value)}
                          className="w-full p-2 border rounded"
                          rows={4}
                        />
                        <div className="mt-2">
                          <button onClick={() => handleSave('timeline')} className="text-green-500 mr-2">
                            <FaCheck />
                          </button>
                          <button onClick={handleCancel} className="text-red-500">
                            <FaTimes />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-600 leading-relaxed">{itinerary.timeline}</p>
                    )}
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Language */}
                    <div className="bg-cardBackground shadow-md rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-secondary mb-2 flex items-center justify-between">
                        <span><FaLanguage className="mr-2 inline" /> Language of Tour</span>
                        <button
                          onClick={() => handleEdit('languageOfTour', itinerary.languageOfTour)}
                          className="text-primary"
                        >
                          <FaEdit />
                        </button>
                      </h3>
                      {editMode === 'languageOfTour' ? (
                        <div>
                          <input
                            type="text"
                            value={editedValue as string}
                            onChange={(e) => setEditedValue(e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                          <div className="mt-2">
                            <button onClick={() => handleSave('languageOfTour')} className="text-green-500 mr-2">
                              <FaCheck />
                            </button>
                            <button onClick={handleCancel} className="text-red-500">
                              <FaTimes />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-600">{itinerary.languageOfTour}</p>
                      )}
                    </div>

                    {/* Price */}
                    <div className="bg-cardBackground shadow-md rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-secondary mb-2 flex items-center justify-between">
                        <span><FaDollarSign className="mr-2 inline" /> Price</span>
                        <button
                          onClick={() => handleEdit('priceOfTour', itinerary.priceOfTour)}
                          className="text-primary"
                        >
                          <FaEdit />
                        </button>
                      </h3>
                      {editMode === 'priceOfTour' ? (
                        <div>
                          <input
                            type="number"
                            value={editedValue as number}
                            onChange={(e) => setEditedValue(Number(e.target.value))}
                            className="w-full p-2 border rounded"
                          />
                          <div className="mt-2">
                            <button onClick={() => handleSave('priceOfTour')} className="text-green-500 mr-2">
                              <FaCheck />
                            </button>
                            <button onClick={handleCancel} className="text-red-500">
                              <FaTimes />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-600 text-2xl font-bold">${itinerary.priceOfTour}</p>
                      )}
                    </div>

                    {/* Accessibility */}
                    <div className="bg-cardBackground shadow-md rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-secondary mb-2 flex items-center justify-between">
                        <span><FaWheelchair className="mr-2 inline" /> Accessibility</span>
                        <button
                          onClick={() => handleEdit('accessibility', itinerary.accessibility)}
                          className="text-primary"
                        >
                          <FaEdit />
                        </button>
                      </h3>
                      {editMode === 'accessibility' ? (
                        <div>
                          <select
                            value={editedValue as boolean ? 'true' : 'false'}
                            onChange={(e) => setEditedValue(e.target.value === 'true')}
                            className="w-full p-2 border rounded"
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                          <div className="mt-2">
                            <button onClick={() => handleSave('accessibility')} className="text-green-500 mr-2">
                              <FaCheck />
                            </button>
                            <button onClick={handleCancel} className="text-red-500">
                              <FaTimes />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-600">
                          {itinerary.accessibility ? "Yes" : "No"}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="bg-cardBackground shadow-md rounded-lg p-4">
                    <h3 className="text-xl font-semibold text-secondary mb-2 flex items-center">
                      <FaStar className="mr-2" /> Average Rating
                    </h3>
                    <p className="text-lg font-medium text-gray-800">
                      {itinerary.rating.toFixed(1)} / 5 ({itinerary.noOfRatings} ratings)
                    </p>
                  </div>

                  {/* Pick-up and Drop-off Spots */}
                  <div className="bg-cardBackground shadow-md rounded-lg p-4">
                    <h3 className="text-xl font-semibold text-secondary mb-4 flex items-center justify-between">
                      Pick-up and Drop-off Spots
                      <button
                        onClick={() => handleEdit('pickupDropoffLocations', itinerary.pickupDropoffLocations)}
                        className="text-primary"
                      >
                        <FaEdit />
                      </button>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {editMode === 'pickupDropoffLocations' ? (
                        <div className="col-span-2">
                          <textarea
                            value={(editedValue as PickupDropoff[]).map(loc => `${loc.pickup} - ${loc.dropoff}`).join('\n')}
                            onChange={(e) => setEditedValue(e.target.value.split('\n').map(line => {
                              const [pickup, dropoff] = line.split(' - ');
                              return { pickup, dropoff };
                            }))}
                            className="w-full p-2 border rounded"
                            rows={8}
                          />
                          <div className="mt-2">
                            <button onClick={() => handleSave('pickupDropoffLocations')} className="text-green-500 mr-2">
                              <FaCheck />
                            </button>
                            <button onClick={handleCancel} className="text-red-500">
                              <FaTimes />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-700 mb-2">Pick-up Spots</h4>
                            <ul className="list-disc list-inside">
                              {itinerary.pickupDropoffLocations.map((loc, index) => (
                                <li key={index} className="text-gray-600">{loc.pickup}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-700 mb-2">Drop-off Spots</h4>
                            <ul className="list-disc list-inside">
                              {itinerary.pickupDropoffLocations.map((loc, index) => (
                                <li key={index} className="text-gray-600">{loc.dropoff}</li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Available Dates and Times */}
                  <div className="bg-cardBackground shadow-md rounded-lg p-4">
                    <h3 className="text-xl font-semibold text-secondary mb-4 flex items-center justify-between">
                      Available Dates and Times
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">Dates</h4>
                        <div className="flex items-center space-x-2 mb-4">
                          <DatePicker
                            selected={newDate}
                            onChange={(date: Date | null) => setNewDate(date)}
                            className="form-input rounded-md shadow-sm mt-1 block w-full"
                            placeholderText="Select new date"
                          />
                          <button
                            onClick={handleAddDate}
                            className="bg-primary text-white p-2 rounded-full"
                            aria-label="Add date"
                          >
                            <FaPlus />
                          </button>
                        </div>
                        <ul className="space-y-2">
                          {itinerary?.availableDates.map((date, index) => (
                            <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                              <span>{new Date(date).toLocaleDateString()}</span>
                              <button
                                onClick={() => handleDeleteDate(new Date(date))}
                                className="text-red-500"
                                aria-label="Delete date"
                              >
                                <FaTrash />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">Times</h4>
                        <div className="flex items-center space-x-2 mb-4">
                          <input
                            type="time"
                            value={newTime}
                            onChange={(e) => setNewTime(e.target.value)}
                            className="form-input rounded-md shadow-sm mt-1 block w-full"
                          />
                          <button
                            onClick={handleAddTime}
                            className="bg-primary text-white p-2 rounded-full"
                            aria-label="Add time"
                          >
                            <FaPlus />
                          </button>
                        </div>
                        <ul className="space-y-2">
                          {itinerary?.availableTimes.map((time, index) => (
                            <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                              <span>{time}</span>
                              <button
                                onClick={() => handleDeleteTime(time)}
                                className="text-red-500"
                                aria-label="Delete time"
                              >
                                <FaTrash />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Comments */}
                  <div className="bg-cardBackground shadow-md rounded-lg p-4">
                    <h3 className="text-xl font-semibold text-secondary mb-4 flex items-center">
                      <FaComment className="mr-2" /> Comments
                    </h3>
                    <ul className="space-y-4">
                      {itinerary.comments.map((comment, index) => (
                        <li key={index} className="bg-white p-3 rounded shadow">
                          <p className="text-gray-800">{comment.comment}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            By User ID: {comment.user} on {new Date(comment.date).toLocaleString()}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bookings */}
                  <div className="bg-cardBackground shadow-md rounded-lg p-4">
                    <h3 className="text-xl font-semibold text-secondary mb-4 flex items-center justify-between">
                      Bookings
                      <button
                        onClick={() => handleEdit('bookings', itinerary.bookings)}
                        className="text-primary"
                      >
                        <FaEdit />
                      </button>
                    </h3>
                    {editMode === 'bookings' ? (
                      <div>
                        <select
                          value={editedValue as boolean ? 'true' : 'false'}
                          onChange={(e) => setEditedValue(e.target.value === 'true')}
                          className="w-full p-2 border rounded"
                        >
                          <option value="true">Open</option>
                          <option value="false">Closed</option>
                        </select>
                        <div className="mt-2">
                          <button onClick={() => handleSave('bookings')} className="text-green-500 mr-2">
                            <FaCheck />
                          </button>
                          <button onClick={handleCancel} className="text-red-500">
                            <FaTimes />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-600">
                        {itinerary.bookings ? "Open for bookings" : "Closed for bookings"}
                      </p>
                    )}
                  </div>

                  {/* Bookings List */}
                  <div className="bg-cardBackground shadow-md rounded-lg p-4">
                    <h3 className="text-xl font-semibold text-secondary mb-4">Bookings List</h3>
                    <ul className="space-y-2">
                      {itinerary.bookingsList.map((booking, index) => (
                        <li key={index} className="text-gray-600">User ID: {booking.user}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Notify Requests */}
                  <div className="bg-cardBackground shadow-md rounded-lg p-4">
                    <h3 className="text-xl font-semibold text-secondary mb-4 flex items-center">
                      <FaBell className="mr-2" /> Notify Requests
                    </h3>
                    <ul className="space-y-2">
                      {itinerary.notifyRequests.map((userId, index) => (
                        <li key={index} className="text-gray-600">User ID: {userId}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Inappropriate Flag */}
                  <div className="bg-cardBackground shadow-md rounded-lg p-4">
                    <h3 className="text-xl font-semibold text-secondary mb-4 flex items-center justify-between">
                      Inappropriate Flag
                     
                    </h3>
                    {editMode === 'inappropriate' ? (
                      <div>
                        <select
                          value={editedValue as boolean ? 'true' : 'false'}
                          onChange={(e) => setEditedValue(e.target.value === 'true')}
                          className="w-full p-2 border rounded"
                        >
                          <option value="true">Flagged as inappropriate</option>
                          <option value="false">Not flagged as inappropriate</option>
                        </select>
                        <div className="mt-2">
                          <button onClick={() => handleSave('inappropriate')} className="text-green-500 mr-2">
                            <FaCheck />
                          </button>
                          <button onClick={handleCancel} className="text-red-500">
                            <FaTimes />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-600">
                        {itinerary.inappropriate ? "This itinerary has been flagged as inappropriate." : "This itinerary has not been flagged as inappropriate."}
                      </p>
                    )}
                  </div>

                  {/* Picture */}
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewItineraryDetailsGeneral;

