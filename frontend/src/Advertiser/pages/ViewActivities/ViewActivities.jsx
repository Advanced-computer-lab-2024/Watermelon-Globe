import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Components/sidebar/Sidebar";
import Navbar from "../../Components/AdvertiserNavbar";
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

const ViewActitvities = () => {
  const [activities, setActivities] = useState([]); // Ensure default state is an array
  const [filteredActivities, setFilteredActivities] = useState([]); // Ensure default state is an array
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const navigate = useNavigate();
  const { id } = useParams();

  const watermelonGreen = "#91c297";
  const watermelonPink = "#d32e65";

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

  // Fetch products of a specific seller
  useEffect(() => {
    fetchActivities();
  }, [id]);

  // Filter and sort products when filters or products change
  useEffect(() => {
    const filtered = activities.filter((activity) => {
      const price = parseFloat(formatPrice(activity.Price));
      return (
        // activities.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        price >= minPrice && price <= maxPrice
      );
    });

    const sorted = filtered.sort((a, b) => {
      if (sortBy === "name") {
        //return a.name.localeCompare(b.name);
      } else if (sortBy === "price") {
        return (
          parseFloat(formatPrice(a.price)) - parseFloat(formatPrice(b.price))
        );
      } else if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });

    setFilteredActivities(sorted);
  }, [searchTerm, sortBy, minPrice, maxPrice, activities]);

  const formatPrice = (price) => {
    if (price && price.$numberDecimal) {
      return parseFloat(price.$numberDecimal).toFixed(2);
    }
    return price;
  };

  const handleProductClick = (productId) => {
    navigate(`/ProductsDetailsGeneral/${productId}/`);
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
              All Activities
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
                gap: "20px",
                padding: "25px",
              }}
            >
              {filteredActivities.map((activity) => (
                <Card
                  sx={{
                    width: 360,
                    border: "3px solid #91c297", // Border thickness and color
                    borderRadius: "20px",
                  }}
                  key={activity._id}
                >
                  <div>
                    <Typography
                      level="title-lg"
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        color: "#555",
                        fontWeight: "lg",
                        padding: "5px",
                      }}
                    >
                      {activity.Name}
                    </Typography>
                  </div>
                  <AspectRatio minHeight="260px" maxHeight="300px">
                    <img
                      src={
                        activities.picture ||
                        "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                      }
                      alt={`Image of ${activity.name}`}
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
                      onClick={() => handleProductClick(activity._id)}
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

export default ViewActitvities;
