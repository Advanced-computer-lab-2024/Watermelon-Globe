import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Components/sidebar/Sidebar";
import Navbar from "../Components/navbar/Navbar";
import "./actions.scss";
import Tooltip from "@mui/material/Tooltip";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";

const GetMySites = () => {
  const [sites, setSites] = useState([]);
  const [filteredSites, setFilteredSites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const navigate = useNavigate();
  const { id } = useParams();

  const watermelonGreen = "#4CAF50";
  const watermelonPink = "#FF4081";

  const fetchMySites = async () => {
    try {
      const response = await fetch(`/api/Governor/getMySites/${id}`);
      const data = await response.json();

      if (response.ok) {
        setSites(data);
        setFilteredSites(data);
      } else {
        console.error("Error fetching sites:", data.error || "Failed to fetch sites");
        setSites([]);
        setFilteredSites([]);
      }
    } catch (error) {
      console.error("Error fetching sites:", error.message);
    }
  };

  useEffect(() => {
    fetchMySites();
  }, [id]);

  useEffect(() => {
    const filtered = sites.filter((site) =>
      site.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sorted = filtered.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "location") {
        return a.location.localeCompare(b.location);
      } else if (sortBy === "createdAt") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

    setFilteredSites(sorted);
  }, [searchTerm, sortBy, sites]);

  const handleSiteClick = (siteId) => {
    navigate(`/GovernorSiteDetails/${siteId}`);
  };

  const handleDeleteSite = async (siteId) => {
    try {
      const response = await fetch(`/api/Governor/deleteSite/${siteId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Site deleted successfully!");
        setSites(sites.filter((site) => site._id !== siteId));
        setFilteredSites(filteredSites.filter((site) => site._id !== siteId));
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to delete site.");
      }
    } catch (error) {
      console.error("Error deleting site:", error.message);
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSortBy("name");
  };

  const getImageSrc = (pictures) => {
    if (!pictures || pictures.length === 0) {
      console.warn("No pictures available, using placeholder");
      return "https://via.placeholder.com/150";
    }

    const image = pictures[0];

    if (image.startsWith("data:image/")) {
      return image;
    }

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    console.warn("Invalid image format, using placeholder:", image);
    return "https://via.placeholder.com/150";
  };

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/150"; // Fallback placeholder
  };

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: `1px solid ${watermelonGreen}`,
  };

  const buttonStyle = {
    backgroundColor: watermelonPink,
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "10px",
  };

  const siteCardStyle = {
    border: `2px solid ${watermelonGreen}`,
    borderRadius: "10px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
    transition: "transform 0.3s",
  };

  return (
    <div>
      <div className="listGovernor">   
        <Sidebar id={id} />
        <div className="listContainerGovernor">
          <Navbar />
          <div style={cardStyle}>
            <h2
              style={{
                textAlign: "center",
                marginBottom: "20px",
                color: watermelonGreen,
              }}
            >
              My Sites
            </h2>

            <div style={{ marginBottom: "20px" }}>
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={inputStyle}
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={inputStyle}
              >
                <option value="name">Sort by Name</option>
                <option value="location">Sort by Location</option>
                <option value="createdAt">Sort by Creation Date</option>
              </select>
              <button onClick={resetFilters} style={buttonStyle}>
                Reset Filters
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "20px",
                padding: "10px",
              }}
            >
              {filteredSites.map((site) => (
                <div
                  key={site._id}
                  onClick={() => handleSiteClick(site._id)}
                  style={{
                    ...siteCardStyle,
                    cursor: "pointer",
                  }}
                >
                  {site.pictures && (
                    <img
                      src={site.pictures}
                      alt={`Image of ${site.name}`}
                      style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
                    />
                  )}
                  <h4 style={{ color: watermelonGreen }}>{site.name}</h4>
                  <p style={{ fontSize: "0.9em", color: "#666" }}>{site._id}</p>
                  {site.location && (
                    <p style={{ fontWeight: "bold", color: watermelonPink }}>
                      <LocationOnIcon /> {site.location}
                    </p>
                  )}
                  <p style={{ fontWeight: "bold", color: watermelonGreen }}>
                    <EventIcon />{" "}
                    {new Date(site.createdAt).toLocaleDateString()}
                  </p>
                  <button
                    style={buttonStyle}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSite(site._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetMySites;
