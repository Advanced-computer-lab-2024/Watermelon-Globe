import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Components/sidebar/Sidebar";
import NavbarGovernor from "Governor/Components/navbar/Navbar";
// import Navbar from "../../Components/navbar/Navbar";
import "./actions.scss";
import Tooltip from "@mui/material/Tooltip";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions"; // Import CardActions
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

import Typography from "@mui/joy/Typography";

const ImageCarousel = ({ site }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Check if site.picture is an array
    if (Array.isArray(site.pictures) && site.pictures.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % site.pictures.length
        );
      }, 3000); // Change image every 3 seconds (3000 ms)

      // Cleanup the interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [site.pictures]);
};

const ViewMySites = () => {
  const [sites, setSite] = useState([]); // Ensure default state is an array
  const [filteredSites, setFilteredSites] = useState([]); // Ensure default state is an array
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchItineraries = async () => {
    try {
      const response = await fetch(`/api/Governor/getMySites/${id}`);
      const data = await response.json();
      console.log(data);

      // Ensure data is an array
      if (Array.isArray(data)) {
        setSite(data);
        setFilteredSites(data);
      } else {
        console.error("API response is not an array:", data);
        setSite([]);
        setFilteredSites([]);
      }
    } catch (error) {
      console.error("Error fetching sites:", error);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, [id]);

  const handleItineraryClick = (activityId) => {
    navigate(`/ProductsDetailsGeneral/${activityId}/`);
  };

  const handleSiteDelete = (id) => {
    setSite(sites.filter((item) => item.id !== id));
    axios
      .delete(`/api/Governor/deleteSite/${id}`)
      .catch((err) => console.error(err));
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh", // Ensures it covers the full viewport
        width: "102%", // Full width of the viewport
        margin: 0, // Remove default margins
        padding: 0, // Remove default padding
        display: "flex", // Optional: for flexible alignment
        flexDirection: "column",
      }}
    >
      <div className="listAdminProduct">
        <Sidebar />
        <div className="listContainerAdminProduct">
          <NavbarGovernor />

          {/* Itineraries */}
          <div style={{ paddingTop: "20px" }}>
            <h2
              style={{
                color: "#d32e65",
                textAlign: "left",
                fontSize: "32px", // Increase the font size
              }}
              className="text-2xl font-bold text-800 mb-6"
            >
              My Sites
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
                gap: "20px",
                padding: "25px",
              }}
            >
              {filteredSites.map((site) => (
                <Card
                  key={site._id}
                  sx={{
                    width: 360, // Fixed width to keep the card size consistent
                    height: 500, // Set a fixed height (adjust as needed)
                    border: "3px solid #91c297", // Border thickness and color
                    borderRadius: "20px",
                    position: "relative", // To position the flag icon relative to the card
                    flexShrink: 0, // Prevent the card from shrinking
                  }}
                >
                  <div>
                    <Typography
                      level="title-lg"
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        color: "#555",
                        fontWeight: "lg",
                        padding: "5px",
                        display: "inline-flex", // Ensures the elements are inline and aligned
                        alignItems: "center", // Aligns the items vertically if needed
                      }}
                    >
                      {site.name}
                    </Typography>
                  </div>

                  <AspectRatio minHeight="260px" maxHeight="300px">
                    <img
                      src={
                        site.pictures ||
                        "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                      }
                      alt={`Image of ${site.name}`}
                      loading="lazy"
                    />
                  </AspectRatio>

                  {/* <ImageCarousel pictures={site.pictures} /> */}

                  <CardContent orientation="horizontal">
                    <div>
                      <Typography
                        level="body-xs"
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          color: "#91c297",
                          fontWeight: "lg",
                        }} // Change font and color for Price label
                      >
                        Ticket Price:
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "lg",
                          fontWeight: "lg",
                          color: "#d32e65", // Customize color for price
                          fontFamily: "'Poppins', sans-serif", // Change font for price
                        }}
                      >
                        ${site.ticketPrices}
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column", // Stack the text and stars vertically
                          alignItems: "flex-start",
                          marginTop: "8px",
                        }}
                      ></div>
                    </div>
                  </CardContent>

                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => handleItineraryClick(site._id)}
                      sx={{
                        width: "50%", // Set width to 100% of the container or define a fixed width
                        height: "40px", // Set a fixed height
                        backgroundColor: "#91c297", // Set the background color
                        color: "white", // Set text color
                        fontFamily: "Poppins, sans-serif", // Set the font family
                        fontSize: "14px", // Set the font size
                        fontWeight: "bold", // Set the font weight
                        borderRadius: "5px", // Set the border radius for rounded corners
                        "&:hover": {
                          backgroundColor: "#6b9b6d", // Set a different color on hover
                        },
                      }}
                    >
                      View Details
                    </Button>

                    <Button
                      size="small"
                      onClick={() => handleSiteDelete(site._id)}
                      startIcon={
                        <DeleteIcon sx={{ color: "#fff", fontSize: "4rem" }} />
                      }
                      sx={{
                        width: "50%", // Set width to 100% of the container or define a fixed width
                        height: "40px", // Set a fixed height
                        backgroundColor: "#d32e65", // Set the background color
                        color: "white", // Set text color
                        fontFamily: "Poppins, sans-serif", // Set the font family
                        fontSize: "14px", // Set the font size
                        fontWeight: "bold", // Set the font weight
                        borderRadius: "5px", // Set the border radius for rounded corners
                        "&:hover": {
                          backgroundColor: "#e91e63", // Set a different color on hover
                        },
                      }}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMySites;
