// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from "react-router-dom";
// import Sidebar from "../Components/sidebar/Sidebar";
// import Navbar from "../Components/navbar/Navbar";
// import "./actions.scss";
// import ArchiveIcon from '@mui/icons-material/Archive';
// import UnarchiveIcon from '@mui/icons-material/Unarchive';
// import Tooltip from "@mui/material/Tooltip";

// const GetAllProducts = () => {
//   const [products, setProducts] = useState([]); // Ensure default state is an array
//   const [filteredProducts, setFilteredProducts] = useState([]); // Ensure default state is an array
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('name');
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const watermelonGreen = '#4CAF50';
//   const watermelonPink = '#FF4081';

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch(`/api/Seller/getProductsBySeller/${id}`);
//       const data = await response.json();
//       console.log(data);

//       // Ensure data is an array
//       if (Array.isArray(data)) {
//         setProducts(data);
//         setFilteredProducts(data);
//       } else {
//         console.error('API response is not an array:', data);
//         setProducts([]);
//         setFilteredProducts([]);
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   // Fetch products of a specific seller
//   useEffect(() => {

//     fetchProducts();
//   }, [id]);

//   // Filter and sort products when filters or products change
//   useEffect(() => {
//     const filtered = products.filter(product => {
//       const price = parseFloat(formatPrice(product.price));
//       return (
//         product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//         price >= minPrice &&
//         price <= maxPrice
//       );
//     });

//     const sorted = filtered.sort((a, b) => {
//       if (sortBy === 'name') {
//         return a.name.localeCompare(b.name);
//       } else if (sortBy === 'price') {
//         return parseFloat(formatPrice(a.price)) - parseFloat(formatPrice(b.price));
//       } else if (sortBy === 'rating') {
//         return b.rating - a.rating;
//       }
//       return 0;
//     });

//     setFilteredProducts(sorted);
//   }, [searchTerm, sortBy, minPrice, maxPrice, products]);

//   const formatPrice = (price) => {
//     if (price && price.$numberDecimal) {
//       return parseFloat(price.$numberDecimal).toFixed(2);
//     }
//     return price;
//   };

//   const handleProductClick = (productId) => {
//     navigate(`/ProductDetails/${productId}/`);
//   };

//   const resetFilters = () => {
//     setSearchTerm('');
//     setSortBy('name');
//     setMinPrice(0);
//     setMaxPrice(1000);
//   };

//   const cardStyle = {
//     backgroundColor: 'white',
//     borderRadius: '15px',
//     padding: '20px',
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//   };

//   const inputStyle = {
//     width: '100%',
//     padding: '10px',
//     marginBottom: '15px',
//     borderRadius: '5px',
//     border: `1px solid ${watermelonGreen}`,
//   };

//   const buttonStyle = {
//     backgroundColor: watermelonPink,
//     width:"25%",
//     color: 'white',
//     padding: '10px 15px',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s',
//   };

//   const productCardStyle = {
//     border: `2px solid ${watermelonGreen}`,
//     borderRadius: '10px',
//     padding: '15px',
//     textAlign: 'center',
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//     backgroundColor: 'white',
//     transition: 'transform 0.3s',
//   };
//   const handleArchive = (productId) => {
//     try {
//       // Use fetch with method and headers
//       fetch(`/api/Seller/archiveProduct/${productId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//         .then((response) => {
//           if (response.ok) {
//             alert('Product was archived!');
//             fetchProducts();
//           } else {
//             alert('Failed to archive product. Please try again.');
//           }
//         })
//         .catch((error) => {
//           console.error('Error archiving product:', error);
//           alert('Failed to archive product. Please try again.');
//         });
//     } catch (error) {
//       console.error('Error archiving product:', error);
//       alert('Failed to archive product. Please try again.');
//     }
//   };

//   const handleUnArchive =(productId)=>{
//     try {
//       // Use fetch with method and headers
//       fetch(`/api/Seller/unarchiveProduct/${productId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//         .then((response) => {
//           if (response.ok) {
//             alert('Product was unarchived!');
//             fetchProducts();
//           } else {
//             alert('Failed to unarchive product. Please try again.');
//           }
//         })
//         .catch((error) => {
//           console.error('Error unarchiving product:', error);
//           alert('Failed to unarchive product. Please try again.');
//         });
//     } catch (error) {
//       console.error('Error unarchiving product:', error);
//       alert('Failed to unarchive product. Please try again.');
//     }
//   }

//   return (
//     <div>
//       <div className="listSeller">
//         <Sidebar />
//         <div className="listContainerSeller">
//           <Navbar />
//           <div style={cardStyle}>
//           <h2 style={{ color: '#2E8B57' }} className="text-2xl font-bold text-800 text-center mb-6">My Products</h2>

//             <div style={{ marginBottom: '20px' }}>
//               <input
//                 type="text"
//                 placeholder="Search by name..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 style={inputStyle}
//               />
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 style={inputStyle}
//               >
//                 <option value="name">Sort by Name</option>
//                 <option value="price">Sort by Price</option>
//                 <option value="rating">Sort by Rating</option>
//               </select>
//               <div style={{ display: 'flex', marginBottom: '15px' }}>
//                 <div>
//                   <label>Min Price: </label>
//                   <input
//                     type="number"
//                     value={minPrice}
//                     onChange={(e) => setMinPrice(Number(e.target.value))}
//                     style={{ ...inputStyle, width: '80px' }}
//                   />
//                 </div>
//                 <div>
//                   <label>Max Price: </label>
//                   <input
//                     type="number"
//                     value={maxPrice}
//                     onChange={(e) => setMaxPrice(Number(e.target.value))}
//                     style={{ ...inputStyle, width: '80px' }}
//                   />
//                 </div>
//               </div>
//               <button onClick={resetFilters} style={buttonStyle}>
//                 Reset Filters
//               </button>
//             </div>

//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
//                 gap: '20px',
//                 padding: '10px',
//               }}
//             >
//               {filteredProducts.map((product) => (
//                 <div
//                   key={product._id}
//                   onClick={() => handleProductClick(product._id)}
//                   style={{
//                     ...productCardStyle,
//                     cursor:"pointer",
//                     ':hover': {
//                       transform: 'scale(1.05)',

//                     },
//                   }}
//                 >
//                   {product.picture && (
//                     <img
//                       src={product.picture}
//                       alt={`Image of ${product.name}`}
//                       style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
//                     />
//                   )}
//                   <h4 style={{ color: watermelonGreen }}>{product.name}</h4>
//                   <p style={{ fontSize: '0.9em', color: '#666' }}>{product._id}</p>
//                  { product.description &&<p style={{ fontSize: '0.9em', color: '#666' }}>{product.description}</p>}
//                  { <p style={{ fontWeight: 'bold', color: watermelonPink }}>${formatPrice(product.price)}</p>}
//                  {product.quantity && <p>Quantity: {product.quantity}</p>}
//                  <p style={{ fontWeight: 'bold', color: watermelonGreen }}>
//                       Archived: {product.archived ? 'Yes' : 'No'}
//                     </p>

//                   <p>Rating: {product.rating ? product.rating.toFixed(1) : 'N/A'}</p>

//                             <Tooltip title="Archive" arrow>
//                               <ArchiveIcon
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   handleArchive(product._id);
//                                 }}
//                                 style={{ color: watermelonGreen ,cursor:"pointer" }}
//                               />
//                             </Tooltip>
//                             <Tooltip title="Unarchive" arrow>
//                   <UnarchiveIcon onClick={(e)=>{e.stopPropagation();handleUnArchive(product._id)}}  style={{ color: watermelonGreen, cursor:"pointer"}} /> </Tooltip>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GetAllProducts;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Components/sidebar/Sidebar";
import Navbar from "../Components/navbar/Navbar";
import "./actions.scss";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import Tooltip from "@mui/material/Tooltip";
import AspectRatio from "@mui/joy/AspectRatio";
//import Button from "@mui/joy/Button";
import { Button } from "@mui/material";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions"; // Import CardActions
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import Rating from "@mui/material/Rating";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

const GetAllProducts = () => {
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
      const response = await fetch(`/api/Seller/getProductsBySeller/${id}`);
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
    navigate(`/ProductDetails/${productId}/`);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSortBy("name");
    setMinPrice(0);
    setMaxPrice(1000);
  };

  const handleProductDelete = (id) => {
    setProducts(products.filter((item) => item.id !== id));
    axios
      .delete(`/api/Seller/deleteProductById/${id}`)
      .catch((err) => console.error(err));
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
              My Products
            </h2>

            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex" }}>
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: "40%",
                    padding: "10px",
                    marginBottom: "15px",
                    borderRadius: "5px",
                    border: `1px solid ${watermelonGreen}`,
                    display: "flex",
                    marginRight: 30,
                  }}
                />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    width: "30%",
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
              </div>
              <div style={{ display: "flex", marginBottom: "15px" }}>
                <div style={{ marginRight: 10 }}>
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
                      marginRight: 100,
                    }}
                  />
                </div>

                <button
                  onClick={resetFilters}
                  style={{
                    backgroundColor: watermelonPink,
                    color: "white",
                    padding: "2px 2px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                    width: "12%",
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
                gap: "10px",
                padding: "25px",
              }}
            >
              {filteredProducts.map((product) => (
                <Card
                  sx={{
                    width: 300,
                    border: "3px solid #91c297", // Border thickness and color
                    borderRadius: "20px",
                    backgroundColor: "#fff",
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
                  <AspectRatio ratio={16 / 9}>
                    <img
                      src={product.picture ? (product.picture.startsWith('http') ? product.picture : `/uploads/${product.picture}`) : "https://via.placeholder.com/150"}
                      alt={`Image of ${product.name}`}
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
                          // justifyContent: "flex-end",
                          gap: "10px",
                        }}
                      >
                        <Tooltip title="Archive" arrow>
                          <ArchiveIcon
                            onClick={(e) => {
                              e.stopPropagation();
                              handleArchive(product._id);
                            }}
                            style={{
                              color: watermelonGreen,
                              cursor: "pointer",
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="Unarchive" arrow>
                          <UnarchiveIcon
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUnArchive(product._id);
                            }}
                            style={{
                              color: watermelonGreen,
                              cursor: "pointer",
                            }}
                          />{" "}
                        </Tooltip>
                      </div>

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

                    <Button
                      size="small"
                      onClick={() => handleProductDelete(product._id)}
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

export default GetAllProducts;
