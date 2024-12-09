import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Components/sidebar/Sidebar";
import Navbar from "../../Components/navbar/Navbar";
import "./actions.scss";
import Tooltip from "@mui/material/Tooltip";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions"; // Import CardActions
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import Rating from "@mui/material/Rating";
import NavTabs from "Admin++/components/navTabs/navTabsEvents";
import OutlinedFlagRoundedIcon from "@mui/icons-material/OutlinedFlagRounded";
import AssistantPhotoRoundedIcon from "@mui/icons-material/AssistantPhotoRounded";

const ViewItineraries = () => {
  const [itineraries, setItineraries] = useState([]); // Ensure default state is an array
  const [filteredItineraries, setFilteredItineraries] = useState([]); // Ensure default state is an array
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchItineraries = async () => {
    try {
      const response = await fetch(`/api/TourGuide/getAllItineraries`);
      const data = await response.json();
      console.log(data);

      // Ensure data is an array
      if (Array.isArray(data)) {
        setItineraries(data);
        setFilteredItineraries(data);
      } else {
        console.error("API response is not an array:", data);
        setItineraries([]);
        setFilteredItineraries([]);
      }
    } catch (error) {
      console.error("Error fetching itineraries:", error);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, [id]);

  const handleItineraryClick = (activityId) => {
    navigate(`/NewItineraryDetailsGeneral/${activityId}/`);
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
          <Navbar />

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
              All Itineraries
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
                gap: "20px",
                padding: "25px",
              }}
            >
              {filteredItineraries.map((itinerary) => (
                <Card
                  key={itinerary._id}
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
                      {itinerary.name}
                    </Typography>
                  </div>

                  <AspectRatio minHeight="260px" maxHeight="300px">
                    <img
                      src={
                        itineraries.picture ||
                        "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                      }
                      alt={`Image of ${itinerary.name}`}
                      loading="lazy"
                    />
                  </AspectRatio>
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
                        Price:
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "lg",
                          fontWeight: "lg",
                          color: "#d32e65", // Customize color for price
                          fontFamily: "'Poppins', sans-serif", // Change font for price
                        }}
                      >
                        ${itinerary.priceOfTour}
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column", // Stack the text and stars vertically
                          alignItems: "flex-start",
                          marginTop: "8px",
                        }}
                      >
                        {/* Rating stars */}
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Rating
                            name="itinerary-rating"
                            value={itinerary.rating || 0} // Use product.rating or default to 0
                            precision={0.5}
                            readOnly
                            size="small"
                            sx={{ marginRight: "8px" }}
                          />
                          {/* Optionally, display the number of ratings */}
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#757575", // Custom color for the reviews text
                              fontFamily: "'Poppins', sans-serif", // Change font for reviews
                            }}
                          >
                            {itinerary.noOfRatings > 0
                              ? `${itinerary.noOfRatings} reviews`
                              : "No reviews"}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => handleItineraryClick(itinerary._id)}
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

export default ViewItineraries;
