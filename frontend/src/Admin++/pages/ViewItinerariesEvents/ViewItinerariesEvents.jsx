import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
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

const ViewItinerariesEvents = () => {
  const [activities, setActivities] = useState([]); // Ensure default state is an array
  const [filteredActivities, setFilteredActivities] = useState([]); // Ensure default state is an array
  const [itineraries, setItineraries] = useState([]); // Ensure default state is an array
  const [filteredItineraries, setFilteredItineraries] = useState([]); // Ensure default state is an array
  const navigate = useNavigate();
  const { id } = useParams();
  const [flaggedActivities, setFlaggedActivities] = useState({}); // Tracks flagged states
  const [flaggedItineraries, setFlaggedItineraries] = useState({}); // Tracks flagged states

  const fetchActivities = async () => {
    try {
      const response = await fetch(`/api/Activities/activities`);
      const data = await response.json();
      console.log(data);

      // Ensure data is an array
      if (Array.isArray(data)) {
        setActivities(data);
        setFilteredActivities(data);
      } else {
        console.error("API response is not an array:", data);
        setActivities([]);
        setFilteredActivities([]);
      }
    } catch (error) {
      console.error("Error fetching itineraries:", error);
    }
  };

  const fetchItineraries = async () => {
    try {
      const response = await fetch(`/api/TourGuide/getAllItineraries`);
      const data = await response.json();
      console.log(data);

      // Ensure data is an array
      if (Array.isArray(data)) {
        setActivities(data);
        setFilteredItineraries(data);
      } else {
        console.error("API response is not an array:", data);
        setActivities([]);
        setFilteredItineraries([]);
      }
    } catch (error) {
      console.error("Error fetching itineraries:", error);
    }
  };

  // Fetch products of a specific seller
  useEffect(() => {
    fetchActivities();
  }, [id]);

  useEffect(() => {
    fetchItineraries();
  }, [id]);

  const handleActivityClick = (activityId) => {
    navigate(`/ProductsDetailsGeneral/${activityId}/`);
  };
  const handleItineraryClick = (activityId) => {
    navigate(`/ProductsDetailsGeneral/${activityId}/`);
  };

  const handleToggleFlagClick = async (activityId) => {
    const isCurrentlyFlagged = flaggedActivities[activityId];

    try {
      const response = await fetch(
        isCurrentlyFlagged
          ? `/api/Admin/markActivityAppropriate/${activityId}`
          : `/api/Admin/markActivityInappropriate/${activityId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        // alert(
        //   isCurrentlyFlagged
        //     ? "Activity was unflagged successfully!"
        //     : "Activity was flagged successfully!"
        // );

        // Toggle the flag status for the specific activity
        setFlaggedActivities((prevState) => ({
          ...prevState,
          [activityId]: !isCurrentlyFlagged, // Toggle the current flag status
        }));
      } else {
        // alert(
        //   isCurrentlyFlagged
        //     ? "Failed to unflag activity. Please try again."
        //     : "Failed to flag activity. Please try again."
        // );
      }
    } catch (error) {
      console.error(
        isCurrentlyFlagged
          ? "Error unflagging activity:"
          : "Error flagging activity:",
        error
      );
      // alert(
      //   isCurrentlyFlagged
      //     ? "Failed to unflag activity."
      //     : "Failed to flag activity."
      // );
    }
  };

  const handleToggleFlagClickItinerary = async (itineraryId) => {
    const isCurrentlyFlaggedItinerary = flaggedItineraries[itineraryId];

    try {
      const response = await fetch(
        isCurrentlyFlaggedItinerary
          ? `/api/Admin/markItineraryAppropriate/${itineraryId}`
          : `/api/Admin/markItineraryInappropriate/${itineraryId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        // alert(
        //   isCurrentlyFlagged
        //     ? "Activity was unflagged successfully!"
        //     : "Activity was flagged successfully!"
        // );

        // Toggle the flag status for the specific activity
        setFlaggedItineraries((prevState) => ({
          ...prevState,
          [itineraryId]: !isCurrentlyFlaggedItinerary, // Toggle the current flag status
        }));
      } else {
        // alert(
        //   isCurrentlyFlagged
        //     ? "Failed to unflag activity. Please try again."
        //     : "Failed to flag activity. Please try again."
        // );
      }
    } catch (error) {
      console.error(
        isCurrentlyFlaggedItinerary
          ? "Error unflagging itinerary:"
          : "Error flagging itinerary:",
        error
      );
      // alert(
      //   isCurrentlyFlagged
      //     ? "Failed to unflag activity."
      //     : "Failed to flag activity."
      // );
    }
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
          <div style={{ padding: "20px" }}>
            <h2
              style={{
                color: "#d32e65",
                textAlign: "left",
                fontSize: "32px", // Increase the font size
              }}
              className="text-2xl font-bold text-800 mb-6"
            >
              Activities
            </h2>

            <div
              style={{
                display: "flex", // Use flexbox to arrange the items horizontally
                overflowX: "auto", // Allow horizontal scrolling
                gap: "20px", // Space between cards
                padding: "10px",
              }}
            >
              {filteredActivities.map((activity) => (
                <Card
                  key={activity._id}
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
                      {activity.Name}
                    </Typography>

                    {/* Flag Icon Logic */}
                    {flaggedActivities[activity._id] ? (
                      <Tooltip title="Unflag" arrow>
                        <AssistantPhotoRoundedIcon
                          sx={{
                            position: "absolute",
                            top: "20px",
                            right: "10px",
                            color: "#d32e65",
                          }}
                          onClick={() => handleToggleFlagClick(activity._id)}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Flag Inappropriate" arrow>
                        <OutlinedFlagRoundedIcon
                          sx={{
                            position: "absolute",
                            top: "20px",
                            right: "10px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleToggleFlagClick(activity._id)} // Pass activity ID properly
                        />
                      </Tooltip>
                    )}
                  </div>

                  <AspectRatio minHeight="260px" maxHeight="300px">
                    <img
                      src={
                        activities.picture ||
                        "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                      }
                      alt={`Image of ${activity.Name}`}
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
                        ${activity.Price}
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column", // Stack the text and stars vertically
                          alignItems: "flex-start",
                          marginTop: "8px",
                        }}
                      >
                        {/* Rating label
                        <Typography
                          level="body-xs"
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            color: "#91c297",
                            fontWeight: "lg",
                          }} // Change font and color for Price label
                        >
                          Rating:
                        </Typography> */}

                        {/* Rating stars */}
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Rating
                            name="activity-rating"
                            value={activity.ratings || 0} // Use product.rating or default to 0
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
                            {activity.noOfRatings > 0
                              ? `${activity.noOfRatings} reviews`
                              : "No reviews"}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => handleActivityClick(activity._id)}
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

            {/* Itineraries */}
            <div style={{ paddingTop: "40px" }}>
              <h2
                style={{
                  color: "#d32e65",
                  textAlign: "left",
                  fontSize: "32px", // Increase the font size
                }}
                className="text-2xl font-bold text-800 mb-6"
              >
                Itineraries
              </h2>

              <div
                style={{
                  display: "flex", // Use flexbox to arrange the items horizontally
                  overflowX: "auto", // Allow horizontal scrolling
                  gap: "20px", // Space between cards
                  padding: "10px",
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

                      {/* Flag Icon Logic */}
                      {flaggedItineraries[itinerary._id] ? (
                        <Tooltip title="Unflag" arrow>
                          <AssistantPhotoRoundedIcon
                            sx={{
                              position: "absolute",
                              top: "20px",
                              right: "10px",
                              color: "#d32e65",
                            }}
                            onClick={() =>
                              handleToggleFlagClickItinerary(itinerary._id)
                            }
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Flag Inappropriate" arrow>
                          <OutlinedFlagRoundedIcon
                            sx={{
                              position: "absolute",
                              top: "20px",
                              right: "10px",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleToggleFlagClickItinerary(itinerary._id)
                            } // Pass activity ID properly
                          />
                        </Tooltip>
                      )}
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
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
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
    </div>
  );
};

export default ViewItinerariesEvents;
