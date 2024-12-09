const Seller = require("../Models/SellerModel");
const Product = require("../Models/ProductModel");
const Tourist = require("../Models/touristModel");
const bookedItinerary = require("../Models/touristItineraryModel");
const bookedActivity = require("../Models/activityBookingModel");
const mongoose = require("mongoose");
const { findById } = require("../Models/touristModel");

//for frontend
const frontendSellersTable = async (req, res) => {
  try {
    // Fetch only sellers with 'accepted' status from the database
    const sellers = await Seller.find(
      { status: "accepted" },
      "Name Email status"
    );

    // Format the data
    const formattedData = sellers.map((seller) => ({
      id: seller._id,
      name: seller.Name,
      email: seller.Email,
      status: seller.status,
    }));

    // Send the response
    res.status(200).json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching sellers" });
  }
};
const frontendPendingSellersTable = async (req, res) => {
  try {
    // Fetch only sellers with 'pending' status from the database
    const sellers = await Seller.find(
      { status: "pending" },
      "Name Email status"
    );

    // Format the data
    const formattedData = sellers.map((seller) => ({
      id: seller._id,
      name: seller.Name,
      email: seller.Email,
      status: seller.status,
    }));

    // Send the response
    res.status(200).json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching pending sellers" });
  }
};

// Get all products (unarchived)
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ archived: false }).sort({
      createdAt: -1,
    });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

//get all sellers
const getAllSellers = async (req, res) => {
  const seller = await Seller.find({}).sort({ createdAt: -1 });

  res.status(200).json(seller);
};

//get single seller
const getSeller = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such seller" });
  }

  const seller = await Seller.findById(id);

  if (!seller) {
    return res.status(400).json({ error: "No such seller" });
  }
  res.status(200).json(seller);
};

//create new seller
const createSeller = async (req, res) => {
  const { Name, Email, Password } = req.body;
  try {
    const seller = await Seller.create({ Name, Email, Password });
    seller.status = "pending";
    res.status(200).json(seller);
  } catch (error) {
    res.status(400).json({ error: error.mssg });
  }
};

//delete a seller
const deleteSeller = async (req, res) => {
  const { id } = req.params;

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such seller" });
  }

  try {
    // Find and delete the seller, and return the deleted document
    const seller = await Seller.findOneAndDelete({ _id: id });

    // Check if the seller exists
    if (!seller) {
      return res.status(400).json({ error: "No such seller" });
    }

    res.status(200).json({ message: "Seller deleted successfully", seller });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//uptade a seller
const updateSeller = async (req, res) => {
  const { id } = req.params;

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such seller" });
  }

  try {
    // Find and update the seller, returning the updated document
    const seller = await Seller.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true } // Returns the updated document
    );

    // Check if the seller exists
    if (!seller) {
      return res.status(400).json({ error: "No such seller" });
    }

    res.status(200).json({ message: "Seller updated successfully", seller });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSellerStatus = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Seller does not exist" });
  }

  try {
    const seller = await Seller.findById(id).select("status");
    if (!seller) {
      return res.status(400).json({ error: "No such seller" });
    }

    res.json({ status: seller });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving seller status" });
  }
};

//////////////// product ///////////////

//create a new product
// const createProduct = async (req, res) => {
//   const {
//     name,
//     price,
//     quantity,
//     picture,
//     description,
//     seller,
//     ratings,
//     sales,
//   } = req.body;
//   const{sellerId}=req.query;

//   try {
//     // Create a new product with the provided details
//     const product = await Product.create({
//       name,
//       price,
//       quantity,
//       description,
//       seller: "6729244f151b6c9e346dd732",
//       ratings: ratings || 0,
//       sales: sales || 0,
//       archived: false, // Explicitly set this as a default value
//     });
//     const seller = Seller.findById(sellerId);
//     seller.Products.add(product._id)

//     // Return the created product as JSON response
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const createProduct = async (req, res) => {
  const { name, price, quantity, picture, description, ratings, sales } =
    req.body;
  const { sellerId } = req.params;

  try {
    // Ensure the seller exists
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    // Create a new product with the provided details
    const product = await Product.create({
      name,
      price,
      quantity,
      description,
      seller: sellerId, // Use the provided sellerId
      ratings: ratings || 0,
      sales: sales || 0,
      archived: false, // Explicitly set this as a default value
    });

    // Add the product ID to the seller's Products array
    seller.Products.push(product._id);
    await seller.save();

    // Return the created product as JSON response
    res.status(200).json(product);
  } catch (error) {
    // Handle errors and send an appropriate response
    res.status(400).json({ error: error.message });
  }
};

const getProductsBySeller = async (req, res) => {
  const { sellerId } = req.params; // Extract the seller ID from the query parameters

  try {
    // Validate that sellerId is provided
    if (!sellerId) {
      return res.status(400).json({ error: "Seller ID is required." });
    }

    // Fetch the products associated with the sellerId
    const products = await Product.find({ seller: sellerId });

    // Return the products as a JSON response
    res.status(200).json(products);
  } catch (error) {
    // Handle errors and send an appropriate response
    res.status(500).json({ error: error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });

  res.status(200).json(products);
};

// Get All Products' Names & IDs
const getAllProductIds = async (req, res) => {
  try {
    // Retrieve all products, selecting only the name and _id fields
    const products = await Product.find({}, "name _id");

    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving products" });
  }
};

//search a product by name
const searchProductbyName = async (req, res) => {
  try {
    // Access the product name from query parameters
    const productName = req.query.name;

    // Search for the product in the database using the name from query
    let product = await Product.find({ name: new RegExp(productName, "i") });

    if (!product || product.length === 0) {
      // Return a 404 status code if no product is found
      return res.status(404).json({ error: "No such product" });
    }

    // Return the found product(s) with a 200 status
    return res.status(200).json(product);
  } catch (error) {
    // Handle potential errors
    return res
      .status(500)
      .json({ error: "An error occurred while searching for the product" });
  }
};

//filter products based on price
const filterProduct = async (req, res) => {
  // Extract the Price from the URL parameters
  const { price } = req.params; // Assuming the param is named 'price'

  try {
    // Convert the price to a number for comparison
    const priceValue = parseFloat(price);

    if (isNaN(priceValue)) {
      return res.status(400).json({ error: "Invalid price format" });
    }

    // Find the product by price
    let product = await Product.findOne({ price: priceValue });

    if (!product) {
      return res.status(400).json({ error: "No such product" });
    }

    // Return the found product
    return res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the product" });
  }
};

//Update a product
// const updateProduct = async (req, res) => {
//   const { id } = req.query;
//   const { name, description, price } = req.body;

//   // Check if the ID is valid
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: "No such product" });
//   }

//   try {
//     // Update only the details and price fields
//     const product = await Product.findOneAndUpdate(
//       { _id: id },
//       { name, description, price },
//       { new: true } // Return the updated product
//     );

//     if (!product) {
//       return res.status(400).json({ error: "No such product" });
//     }

//     res.status(200).json(product);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
const updateProduct = async (req, res) => {
  const { id } = req.query;
  const updateData = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules apply
    });

    if (!updatedProduct) {
      return res.status(404).send("Product not found");
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Error updating product");
  }
};

// Sort products by ratings
const sortProducts = async (req, res) => {
  try {
    // Fetch all products and sort them by ratings in descending order
    const products = await Product.find({}).sort({ ratings: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//accept terms and conditions

const acceptTermsAndConditions = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedSeller = await Seller.findByIdAndUpdate(
      id,
      { termsAndConditions: true },
      { new: true }
    );

    if (!updatedSeller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    res.status(200).json(updatedSeller);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating terms and conditions: " + error.message });
  }
};

const updateRatingProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.query;

    // Parse rating as a number
    const numericRating = Number(rating);
    console.log("Received rating:", numericRating);

    // Check if the rating is a valid number between 1 and 5
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return res
        .status(400)
        .json({ message: "Invalid rating. Rating should be between 1 and 5." });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Initialize the values if not already set
    product.noOfRatings = product.noOfRatings || 0;
    product.ratingsSum = product.ratingsSum || 0;
    product.rating = product.rating || 0;

    // Increment noOfRatings and ratingsSum with the new rating
    product.noOfRatings += 1;
    product.ratingsSum += numericRating;

    // Calculate the new average rating
    product.rating = product.ratingsSum / product.noOfRatings;

    await product.save();

    return res.status(200).json({
      message: "Rating updated successfully",
      averageRating: product.rating,
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const changePasswordSeller = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword, newPasswordConfirmed } = req.query; // Changed to req.body

  console.log(id, oldPassword, newPassword);

  // Validate inputs
  if (!oldPassword) {
    return res.status(400).json({ error: "Old password is required" }); // Use 400 for bad requests
  }
  if (!newPassword) {
    return res.status(400).json({ error: "New password is required" });
  }
  if (!newPasswordConfirmed) {
    return res
      .status(400)
      .json({ error: "New password confirmation is required" });
  }

  try {
    const seller = await Seller.findOne({ _id: id });

    if (!seller) {
      return res.status(404).json({ error: "seller not found" }); // Tourist not found
    }

    // Compare the old password directly
    if (seller.Password !== oldPassword) {
      return res.status(401).json({ error: "Wrong old password" }); // Use 401 for unauthorized access
    }

    // Check if new passwords match
    if (newPassword !== newPasswordConfirmed) {
      return res
        .status(400)
        .json({ error: "New password and confirmed password do not match" });
    }

    // Update the password directly
    seller.Password = newPassword;
    await seller.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const reviewProduct = async (req, res) => {
  const { ReviewerId, ProductId } = req.params;
  const { Review } = req.query;

  const product = await Product.findById(ProductId);
  if (!product) {
    res.status(400).json({ message: "Product cannot be found" });
  } else {
    try {
      product.reviews.push({
        reviewer: ReviewerId, // Use correct field name as per schema
        review: Review, // Use correct field name as per schema
      });
      await product.save();
      res.status(200).json({ message: "Review was added successfully" });
    } catch {
      console.error("Error updating reviews:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
};

const getProductById = async (req, res) => {
  const { id } = req.body;

  try {
    const product = await Product.findById(id);

    if (!product) {
      // Respond with a descriptive error message if product not found
      return res.status(404).json({ error: "Product not found" });
    }

    // Return the product data directly, without wrapping in an object
    return res.status(200).json(product);
  } catch (error) {
    // Log the error (optional, useful for debugging)
    console.error("Error finding product:", error);

    // Respond with a 500 status and include the error message
    return res.status(500).json({ error: error.message || "Server error" });
  }
};
// const getProductById = async (req, res) => {
//   const { id } = req.params; // Use `req.params` for route parameters (not `req.body`)

//   try {
//     const product = await Product.findById(id);

//     if (!product) {
//       // Respond with a descriptive error message if the product is not found
//       return res.status(404).json({ error: "Product not found" });
//     }

//     // Return the product data directly, without wrapping it in an object
//     return res.status(200).json(product);
//   } catch (error) {
//     // Log the error (optional, useful for debugging)
//     console.error("Error finding product:", error);

//     // Respond with a 500 status and include the error message
//     return res.status(500).json({ error: error.message || "Server error" });
//   }
// };

const requestDeletionSeller = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the seller by ID and update the deletionRequest to "Pending"
    const seller = await Seller.findByIdAndUpdate(
      id,
      { deletionRequest: "Pending" },
      { new: true } // Return the updated document
    );

    if (!seller) {
      return res.status(404).json({ message: "seller not found" });
    }

    res.status(200).json({
      message: "Deletion request updated successfully",
    });
  } catch (error) {
    console.error("Error updating deletion request:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// const getProductReviews = async (req, res) => {
//     const { productId } = req.params;

//     try {
//       const product = await Product.findById(productId);

//       if (!product) {
//         return res.status(404).json({ message: 'Product not found' });
//       }

//       // Return the reviews array
//       return res.status(200).json(product.reviews);
//     } catch (error) {
//       console.error('Error fetching product reviews:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   };

const getProductReviews = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId).populate(
      "reviews.reviewer",
      "username"
    ); // Populate reviewer with 'name'

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Return the reviews array
    return res.status(200).json(product.reviews);
  } catch (error) {
    console.error("Error fetching product reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getPassword = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  try {
    const seller = await Seller.findById(id);
    console.log(seller);
    if (!seller) {
      res.status(400).json({ message: "Seller is not found" });
    } else {
      res.status(200).json(seller.Password);
    }
  } catch {
    console.error("Error getting password:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// view the sales & the available quantity of all products
// const getQuantity = async (req, res) => {
//   const{id}=req.params;
//   try {
//     const products = await Product.find({}, "name quantity sales").sort({
//       createdAt: -1,
//     });
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({
//       error: "An error occurred while retrieving product quantities.",
//     });
//   }
// };
const getQuantity = async (req, res) => {
  const { id } = req.params; // Get the seller's ID from the URL parameter
  try {
    // Find products where the seller's ID matches the provided seller ID
    const products = await Product.find(
      { seller: id },
      "name quantity sales"
    ).sort({ createdAt: -1 });

    // Check if any products were found
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this seller." });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      error: "An error occurred while retrieving product quantities.",
    });
  }
};

// archive a product
const archiveProduct = async (req, res) => {
  const { id } = req.params;

  // Check if the name is provided
  if (!id) {
    return res.status(400).json({ error: "Product id is required" });
  }

  try {
    // Set the archived field to true based on the product name
    const product = await Product.findOneAndUpdate(
      { _id: id },
      { archived: true },
      { new: true } // Return the updated product
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product archived successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while archiving the product" });
  }
};

// unarchive a product
const unarchiveProduct = async (req, res) => {
  const { id } = req.params;

  // Check if the name is provided
  if (!id) {
    return res.status(400).json({ error: "Product name is required" });
  }

  try {
    // Set the archived field to false based on the product name
    const product = await Product.findOneAndUpdate(
      { _id: id },
      { archived: false },
      { new: true } // Return the updated product
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product unarchived successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while unarchiving the product" });
  }
};

// upload a product picture
const uploadPicture = async (req, res) => {
  const { id } = req.query; // Get the product ID from the route parameters
  const { picture } = req.body; // Get the picture URL from the request body
  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    // Update the product's picture field
    const product = await Product.findOneAndUpdate(
      { _id: id }, // Find the product by ID
      { picture }, // Update the picture field
      { new: true } // Return the updated product
    );

    if (!product) {
      return res.status(404).json({ error: "No product found with this ID" });
    }

    res
      .status(200)
      .json({ message: "Product picture updated successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the product picture" });
  }
};

// Delete product by ID
const deleteProductById = async (req, res) => {
  const { id } = req.params; // Extract the ID from the URL params

  try {
    // Find the product by ID and delete it
    const product = await Product.findByIdAndDelete(id);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // If deletion is successful
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
};

const loginSeller = async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).json({ error: "Email and Password are required" });
  }

  try {
    // Find the seller by email
    const seller = await Seller.findOne({ Email });

    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    // Check if the password matches
    if (seller.Password !== Password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Return the seller's ID if login is successful
    res.status(200).json({ id: seller._id });
  } catch (error) {
    console.error("Error during seller login:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const totalProductRevenueForSeller = async (req, res) => {
  try {
    const sellerId = req.params.sellerId; // Assuming the seller ID is passed as a route parameter

    if (!sellerId) {
      return res.status(400).json({ message: "Seller ID is required" });
    }

    const result = await Tourist.aggregate([
      { $unwind: '$orders' },
      { $unwind: '$orders.items' },
      {
        $lookup: {
          from: 'products',
          localField: 'orders.items.productId',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $match: {
          'product.seller': new mongoose.Types.ObjectId(sellerId)
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: {
              $multiply: ['$orders.items.quantity', '$product.price']
            }
          }
        }
      }
    ]);

    if (result.length === 0) {
      return res.status(200).json({
        message: "No completed orders found for this seller",
        totalRevenue: 0
      });
    }

    const totalRevenue = result[0].totalRevenue;

    res.status(200).json({
      message: "Total product revenue calculated successfully for the seller",
      totalRevenue: totalRevenue.toFixed(2)
    });

  } catch (error) {
    console.error("Error calculating total product revenue:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const SellerMonthlyRevenue = async (req, res) => {
  try {
    const sellerId = req.params.sellerId; // Assuming sellerId is passed as a route parameter
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 0, 1); // January 1st of the current year
    const endDate = new Date(currentYear, 11, 31); // December 31st of the current year

    if (!sellerId) {
      return res.status(400).json({ message: "Seller ID is required" });
    }

    // Aggregate product revenue for the current year
    const productRevenue = await Tourist.aggregate([
      { $unwind: '$orders' }, // Unwind the orders array
      { $unwind: '$orders.items' }, // Unwind the items within each order
      {
        $lookup: {
          from: 'products',
          localField: 'orders.items.productId',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' }, // Unwind the product after the lookup
      {
        $match: {
          'product.seller': new mongoose.Types.ObjectId(sellerId), // Match the sellerId
          'orders.orderDate': { $gte: startDate, $lte: endDate } // Filter by current year
        }
      },
      {
        $group: {
          _id: { month: { $month: '$orders.orderDate' } }, // Group by month
          totalRevenue: {
            $sum: { $multiply: ['$orders.items.quantity', '$product.price'] } // Calculate total revenue
          }
        }
      },
      { $sort: { '_id.month': 1 } } // Sort by month
    ]);

    // Initialize an array for all 12 months with zero revenue
    const monthlyRevenue = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      productRevenue: 0,
      totalRevenue: 0
    }));

    // Populate the monthly revenue with the actual data from aggregation
    productRevenue.forEach(entry => {
      const monthIndex = entry._id.month - 1; // Month is 1-based, array is 0-based
      monthlyRevenue[monthIndex].productRevenue = entry.totalRevenue;
      monthlyRevenue[monthIndex].totalRevenue = entry.totalRevenue;
    });

    // Add month names and format numbers
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const formattedRevenue = monthlyRevenue.map(item => ({
      ...item,
      monthName: monthNames[item.month - 1],
      productRevenue: Number(item.productRevenue.toFixed(2)),
      totalRevenue: Number(item.totalRevenue.toFixed(2))
    }));

    // Return the response with the formatted revenue data
    res.status(200).json({
      message: "Yearly product revenue calculated successfully",
      year: currentYear,
      data: formattedRevenue
    });

  } catch (error) {
    console.error("Error calculating monthly product revenue:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const filterRevenueByDateSeller = async (req, res) => {
  try {
    const { date } = req.query;
    const { sellerId } = req.params; // sellerId passed as a route parameter

    if (!date) {
      return res.status(400).json({ message: "Date parameter is required" });
    }

    if (!sellerId) {
      return res.status(400).json({ message: "Seller ID is required" });
    }

    const selectedDate = new Date(date);
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);

    const productRevenue = await Tourist.aggregate([
      { $unwind: "$orders" }, // Unwind the orders array
      { $unwind: "$orders.items" }, // Unwind the items within each order
      {
        $lookup: {
          from: "products", // Lookup products collection
          localField: "orders.items.productId", // Match by productId from the orders
          foreignField: "_id", // Match to product's _id
          as: "product", // Store matched product data
        },
      },
      { $unwind: "$product" }, // Unwind the product data after lookup
      {
        $match: {
          "product.seller": new mongoose.Types.ObjectId(sellerId), // Filter by sellerId
          "orders.orderDate": { $gte: selectedDate, $lt: nextDate }, // Filter by the selected date
        },
      },
      {
        $group: {
          _id: null, // Grouping to calculate total revenue
          totalRevenue: { $sum: { $multiply: ['$orders.items.quantity', '$product.price'] } }, // Sum up the total price for orders
        },
      },
    ]);

    const totalProductRevenue =
      productRevenue.length > 0 ? productRevenue[0].totalRevenue : 0;

    const totalRevenue = totalProductRevenue;

    res.status(200).json({
      message: "Revenue filtered by date successfully",
      date: selectedDate.toISOString().split("T")[0],
      productRevenue: Number(totalProductRevenue.toFixed(2)),
      totalRevenue: Number(totalRevenue.toFixed(2)),
    });
  } catch (error) {
    console.error("Error filtering revenue by date:", error);
    res.status(500).json({ message: "Server error" });
  }
};





module.exports = {
  createSeller,
  getAllSellers,
  getSeller,
  deleteSeller,
  updateSeller,
  getSellerStatus,
  createProduct,
  getAllProducts,
  getAllProductIds,
  searchProductbyName,
  filterProduct,
  updateProduct,
  sortProducts,
  updateRatingProduct,
  changePasswordSeller,
  reviewProduct,
  requestDeletionSeller,
  acceptTermsAndConditions,
  getProductById,
  getProductReviews,
  getPassword,
  getQuantity,
  archiveProduct,
  unarchiveProduct,
  //getProductImageByName,
  uploadPicture,
  getProductsBySeller,
  frontendSellersTable,
  frontendPendingSellersTable,
  getProducts,
  deleteProductById,
  loginSeller,
  totalProductRevenueForSeller,
  SellerMonthlyRevenue,
  filterRevenueByDateSeller
};
