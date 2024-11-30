import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

const GovernorSiteDetails = () => {
  const { id } = useParams(); // Extracting site ID from URL
  const [site, setSite] = useState(null); // Initial state is null
  const [isEditing, setIsEditing] = useState(false);
  const [updatedSite, setUpdatedSite] = useState(null); // State for editing fields

  const watermelonGreen = "#4CAF50";
  const watermelonPink = "#FF4081";

  // Fetch site details using the correct site ID
  useEffect(() => {
    const fetchSite = async () => {
      try {
        const response = await axios.get(`/api/Governor/getSite?id=${id}`);
        setSite(response.data); // Populate the site data
      } catch (error) {
        console.error("Error fetching site details:", error);
      }
    };

    fetchSite();
  }, [id]);

  // Handle updating the site details
  const handleUpdateSite = async () => {
    try {
      const response = await axios.put(`/api/Governor/updateSite?id=${id}`, updatedSite);

      if (response.status === 200) {
        // Refresh site data from backend after update
        const updatedResponse = await axios.get(`/api/Governor/getSite?id=${id}`);
        setSite(updatedResponse.data); // Update state with new data
        setIsEditing(false); // Exit editing mode
      } else {
        console.error("Failed to update site");
      }
    } catch (error) {
      console.error("Error updating site:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSite((prev) => ({ ...prev, [name]: value }));
  };

  const watermelonStyle = {
    border: `1px solid ${watermelonGreen}`,
    color: "#4a4a4a",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const buttonStyle = {
    backgroundColor: watermelonPink,
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
  };

  if (!site) {
    return (
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          <div className="flex justify-center items-center min-h-screen">
            <p>Loading site details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="flex justify-center items-center min-h-screen p-6">
          <div style={watermelonStyle} className="w-full max-w-xl">
            <div className="flex justify-center mb-6">
              {site.pictures && (
                <img
                  src={site.pictures}
                  alt={`Image of ${site.name}`}
                  style={{
                    width: "25%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
              )}
            </div>

            <div className="text-center mb-6">
              <h2
                className="text-3xl font-semibold"
                style={{ color: watermelonGreen }}
              >
                {site.name}
              </h2>
              <p className="text-xl" style={{ color: "#1a5d1a" }}>
                Location: {site.location}
              </p>
              <p className="text-xl" style={{ color: "#1a5d1a" }}>
                Ticket Price: ${site.ticketPrices}
              </p>
            </div>

            {!isEditing ? (
              <div className="space-y-4">
                <p>
                  <strong>Id:</strong> {site._id}
                </p>
                <p>
                  <strong>Description:</strong> {site.description}
                </p>
                <p>
                  <strong>Opening Hours:</strong> {site.openingHours}
                </p>
                <button
                  style={buttonStyle}
                  onClick={() => {
                    setUpdatedSite(site); // Pre-fill with existing data
                    setIsEditing(true);
                  }}
                >
                  Update Site
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={updatedSite?.name || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Site Name"
                />
                <textarea
                  name="description"
                  value={updatedSite?.description || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Description"
                />
                <input
                  type="text"
                  name="location"
                  value={updatedSite?.location || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Location"
                />
                <input
                  type="text"
                  name="openingHours"
                  value={updatedSite?.openingHours || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Opening Hours"
                />
                <input
                  type="number"
                  name="ticketPrices"
                  value={updatedSite?.ticketPrices || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Ticket Price"
                />
                <div className="flex justify-center space-x-4 mt-6">
                  <button style={buttonStyle} onClick={handleUpdateSite}>
                    Confirm Update
                  </button>
                  <button
                    style={{
                      ...buttonStyle,
                      backgroundColor: "#808080",
                    }}
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernorSiteDetails;
