
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  FaComment
} from "react-icons/fa";
import axios from "axios";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

interface Activity {
  _id: string;
  Name: string;
  duration: string;
  Price:number;
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

interface Itinerary {
  _id: string;
  name: string;
  activities: Activity[];
  tag: PreferenceTag[];
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
}

const NewItineraryDetailsGeneral: React.FC = () => {
  const { tripid } = useParams<{ tripid: string }>();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editedValue, setEditedValue] = useState<string | number | boolean | PickupDropoff[]>("");

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await axios.get(`/api/Itinerary/getItinerary/${tripid}`);
        setItinerary(response.data);
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

    fetchItinerary();
  }, [tripid]);

  const handleEdit = (field: string, value: string | number | boolean | PickupDropoff[]) => {
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
                  <div className="flex items-center space-x-4">
                    <div className="bg-white rounded-full p-2">
                      <FaMapMarkerAlt className="h-16 w-16 text-primary" />
                    </div>
                    <div>
                    <h2 className="text-3xl font-bold text-white flex items-center">
                          {itinerary.name}
                          
                        </h2>
                     
                       
                    
                        
                      
                      <p className="text-white opacity-75">
                        {itinerary.locations.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Activities */}
                  <div className="bg-cardBackground shadow-md rounded-lg p-4">
                    <h3 className="text-xl font-semibold text-secondary mb-4">Activities</h3>
                    <ul className="space-y-2 max-h-60 overflow-y-auto pr-4">
                      {itinerary.activities.map((activity) => (
                        <li key={activity._id} className="flex justify-between items-center bg-white p-3 rounded shadow">
                          <span className="text-gray-800 font-medium">{activity.Name}</span>
                          <span className="text-sm bg-green-100 text-black-800 px-3 py-1 rounded">
                            {activity.Price}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Timeline */}
                  <div className="bg-cardBackground shadow-md rounded-lg p-4">
                    <h3 className="text-xl font-semibold text-secondary mb-4 flex items-center">
                      Timeline
                    
                       
                     
                    </h3>
                    {editMode === 'timeline' ? (
                      <textarea
                        value={editedValue as string}
                        onChange={(e) => setEditedValue(e.target.value)}
                        className="w-full p-2 border rounded"
                        rows={4}
                      />
                    ) : (
                      <p className="text-gray-600 leading-relaxed">{itinerary.timeline}</p>
                    )}
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Language */}
                    <div className="bg-cardBackground shadow-md rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-secondary mb-2 flex items-center">
                        <FaLanguage className="mr-2" /> Language of Tour
                      </h3>
                      <p className="text-gray-600">{itinerary.languageOfTour}</p>
                    </div>

                    {/* Price */}
                    <div className="bg-cardBackground shadow-md rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-secondary mb-2 flex items-center">
                        <FaDollarSign className="mr-2" /> Price
                       
                        
                      
                      </h3>
                      {editMode === 'priceOfTour' ? (
                        <input
                          type="number"
                          value={editedValue as number}
                          onChange={(e) => setEditedValue(Number(e.target.value))}
                          className="w-full p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-600 text-2xl font-bold">${itinerary.priceOfTour}</p>
                      )}
                    </div>

                    {/* Accessibility */}
                    <div className="bg-cardBackground shadow-md rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-secondary mb-2 flex items-center">
                        <FaWheelchair className="mr-2" /> Accessibility
                      </h3>
                      <p className="text-gray-600">
                        {itinerary.accessibility ? "Yes" : "No"}
                      </p>
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
                    <h3 className="text-xl font-semibold text-secondary mb-4">Pick-up and Drop-off Spots</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {editMode === 'pickupDropoffLocations' ? (
                        <>
                          <textarea
                            value={(editedValue as PickupDropoff[]).map(loc => `${loc.pickup} - ${loc.dropoff}`).join('\n')}
                            onChange={(e) => setEditedValue(e.target.value.split('\n').map(line => {
                              const [pickup, dropoff] = line.split(' - ');
                              return { pickup, dropoff };
                            }))}
                            className="w-full p-2 border rounded"
                            rows={8}
                          />
                          <div>
                            <FaCheck 
                              className="ml-2 cursor-pointer text-green-500" 
                              onClick={() => handleSave('pickupDropoffLocations')}
                            />
                            <FaTimes 
                              className="ml-2 cursor-pointer text-red-500" 
                              onClick={handleCancel}
                            />
                          </div>
                        </>
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
                    <h3 className="text-xl font-semibold text-secondary mb-4">Available Dates and Times</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">Dates</h4>
                        <ul className="list-disc list-inside">
                          {itinerary.availableDates.map((date, index) => (
                            <li key={index} className="text-gray-600">{new Date(date).toLocaleDateString()}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">Times</h4>
                        <ul className="list-disc list-inside">
                          {itinerary.availableTimes.map((time, index) => (
                            <li key={index} className="text-gray-600">{time}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  
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

                  {/* Inappropriate Flag */}
                  <div className="bg-cardBackground shadow-md rounded-lg p-4">
                    <h3 className="text-xl font-semibold text-secondary mb-4">Inappropriate Flag</h3>
                    <p className="text-gray-600">
                      {itinerary.inappropriate ? "This itinerary has been flagged as inappropriate." : "This itinerary has not been flagged as inappropriate."}
                    </p>
                  </div>

                  {/* Sharing Options */}
                  <div className="bg-cardBackground shadow-md rounded-lg p-4">
                    <div className="flex justify-between">
                     
                     
                    </div>
                  </div>
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

