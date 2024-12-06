import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./actions.scss";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
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

const GetAllProductsGeneral = () => {
  const [products, setProducts] = useState([]); // Ensure default state is an array
  const [filteredProducts, setFilteredProducts] = useState([]); // Ensure default state is an array
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const navigate = useNavigate();
  const { id } = useParams();

  const watermelonGreen = "#91c297";
  const watermelonPink = "#d32e65";

  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/Seller/GetAllProducts`);
      const data = await response.json();
      console.log(data);

      // Ensure data is an array
      if (Array.isArray(data)) {
        setProducts(data);
        setFilteredProducts(data);
      } else {
        console.error("API response is not an array:", data);
        setProducts([]);
        setFilteredProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products of a specific seller
  useEffect(() => {
    fetchProducts();
  }, [id]);

  // Filter and sort products when filters or products change
  useEffect(() => {
    const filtered = products.filter((product) => {
      const price = parseFloat(formatPrice(product.price));
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        price >= minPrice &&
        price <= maxPrice
      );
    });

    const sorted = filtered.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "price") {
        return (
          parseFloat(formatPrice(a.price)) - parseFloat(formatPrice(b.price))
        );
      } else if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });

    setFilteredProducts(sorted);
  }, [searchTerm, sortBy, minPrice, maxPrice, products]);

  const formatPrice = (price) => {
    if (price && price.$numberDecimal) {
      return parseFloat(price.$numberDecimal).toFixed(2);
    }
    return price;
  };

  const handleProductClick = (productId) => {
    navigate(`/ProductsDetailsGeneral/${productId}/`);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSortBy("name");
    setMinPrice(0);
    setMaxPrice(1000);
  };

  const handleArchive = (productId) => {
    try {
      fetch(`/api/Seller/archiveProduct/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            alert("Product was archived!");
            fetchProducts();
          } else {
            alert("Failed to archive product. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error archiving product:", error);
          alert("Failed to archive product. Please try again.");
        });
    } catch (error) {
      console.error("Error archiving product:", error);
      alert("Failed to archive product. Please try again.");
    }
  };

  const handleUnArchive = (productId) => {
    try {
      fetch(`/api/Seller/unarchiveProduct/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            alert("Product was unarchived!");
            fetchProducts();
          } else {
            alert("Failed to unarchive product. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error unarchiving product:", error);
          alert("Failed to unarchive product. Please try again.");
        });
    } catch (error) {
      console.error("Error unarchiving product:", error);
      alert("Failed to unarchive product. Please try again.");
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
              style={{ color: "#91c297" }}
              className="text-2xl font-bold text-800 text-center mb-6"
            >
              All Products
            </h2>

            <div style={{ marginBottom: "20px" }}>
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "15px",
                  borderRadius: "5px",
                  border: `1px solid ${watermelonGreen}`,
                }}
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "15px",
                  borderRadius: "5px",
                  border: `1px solid ${watermelonGreen}`,
                }}
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="rating">Sort by Rating</option>
              </select>
              <div style={{ display: "flex", marginBottom: "15px" }}>
                <div>
                  <label>Min Price: </label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    style={{
                      padding: "10px",
                      width: "80px",
                      borderRadius: "5px",
                      border: `1px solid ${watermelonGreen}`,
                    }}
                  />
                </div>
                <div>
                  <label>Max Price: </label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    style={{
                      padding: "10px",
                      width: "80px",
                      borderRadius: "5px",
                      border: `1px solid ${watermelonGreen}`,
                    }}
                  />
                </div>
              </div>
              <button
                onClick={resetFilters}
                style={{
                  backgroundColor: watermelonPink,
                  color: "white",
                  padding: "10px 15px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                  width: "25%",
                }}
              >
                Reset Filters
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
                gap: "20px",
                padding: "25px",
              }}
            >
              {filteredProducts.map((product) => (
                <Card
                  sx={{
                    width: 360,
                    border: "3px solid #91c297", // Border thickness and color
                    borderRadius: "20px",
                  }}
                  key={product._id}
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
                      {product.name}
                    </Typography>
                  </div>
                  <AspectRatio minHeight="260px" maxHeight="300px">
                    <img
                      src={product.picture || "https://via.placeholder.com/150"}
                      alt={`Image of ${product.name}`}
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
                        ${product.price}
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
                            name="product-rating"
                            value={product.rating || 0} // Use product.rating or default to 0
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
                            {product.noOfRatings > 0
                              ? `${product.noOfRatings} reviews`
                              : "No reviews"}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => handleProductClick(product._id)}
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

export default GetAllProductsGeneral;
