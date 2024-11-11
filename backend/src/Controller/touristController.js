const Tourist = require("../Models/touristModel");
const mongoose = require("mongoose");
const itineraryModel = require("../Models/itineraryModel");
const Itinerary = require("../Models/itineraryModel");
const Complaint = require("../Models/Complaint");
const Product = require("../Models/productModel");
const Booking = require("../Models/FlightBooking");
const tourGuide = require("../Models/tourGuideModel.js");

//Tourist

//create a new tourist -- basically while signing up
const createTourist = async (req, res) => {
  const {
    email,
    username,
    password,
    mobileNumber,
    nationality,
    dob,
    status,
    wallet,
    points,
  } = req.body;
  // add tourist to db
  try {
    const tourist = await Tourist.create({
      email,
      username,
      password,
      mobileNumber,
      nationality,
      dob,
      status,
      wallet,
      points: points || 0,
    });
    res.status(200).json(tourist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all tourists -- might be used in admin
const getTourists = async (req, res) => {
  const tourist = await Tourist.find().sort({ createdAt: -1 });
  // can add argument inside find({username: '--'}) to filter
  // .sort to get them in order from the recent ones to oldest ones
  res.status(200).json(tourist);
};

// get a single tourist -- used to view profile
const getTourist = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such tourist" });
  }

  const tourist = await Tourist.findById(id);

  if (!tourist) {
    return res.status(404).json({ error: "No such tourist" });
  }
  res.status(200).json(tourist);
};

// delete a tourist -- in sprint 2 or 3
const deleteTourist = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such tourist" });
  }

  const tourist = await Tourist.findOneAndDelete({ _id: id });

  if (!tourist) {
    return res.status(400).json({ error: "No such tourist" });
  }
  res.status(200).json(tourist);
};

// update a tourist
const updateTourist = async (req, res) => {
  const { id } = req.params;
  const trimmedId = id.trim();
  console.log(trimmedId); // Log the trimmed ID

  // Check if the ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
    return res.status(404).json({ error: "No such tourist" });
  }

  // Define the fields that should not be updated
  const restrictedFields = ["username", "wallet", "dob"];

  // Check if any restricted fields are being updated
  const hasRestrictedField = restrictedFields.some(
    (field) => field in req.body
  );
  if (hasRestrictedField) {
    return res.status(403).json({
      error:
        "You cannot update restricted fields: username, date of birth, or wallet.",
    });
  }

  // Perform the update operation
  const tourist = await Tourist.findOneAndUpdate(
    { _id: trimmedId }, // Use _id here
    { ...req.body },
    { new: true, runValidators: true } // Get the updated document and validate
  );

  if (!tourist) {
    return res.status(400).json({ error: "No such tourist" });
  }
  console.log(tourist);

  // Send back the updated tourist
  res.status(200).json(tourist);
};

const updateRating = async (req, res) => {
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

    // Find the itinerary by ID
    const itinerary = await itineraryModel.findById(id);
    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    // Initialize the values if not already set
    itinerary.noOfRatings = itinerary.noOfRatings || 0;
    itinerary.ratingsSum = itinerary.ratingsSum || 0;
    itinerary.rating = itinerary.rating || 0;

    // Increment noOfRatings and ratingsSum with the new rating
    itinerary.noOfRatings += 1;
    itinerary.ratingsSum += numericRating;

    // Calculate the new average rating
    itinerary.rating = itinerary.ratingsSum / itinerary.noOfRatings;

    // Save the updated itinerary
    await itinerary.save();

    return res.status(200).json({
      message: "Rating updated successfully",
      averageRating: itinerary.rating,
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const changePasswordTourist = async (req, res) => {
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
    const tourist = await Tourist.findOne({ _id: id });

    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" }); // Tourist not found
    }

    // Compare the old password directly
    if (tourist.password !== oldPassword) {
      return res.status(401).json({ error: "Wrong old password" }); // Use 401 for unauthorized access
    }

    // Check if new passwords match
    if (newPassword !== newPasswordConfirmed) {
      return res
        .status(400)
        .json({ error: "New password and confirmed password do not match" });
    }

    // Update the password directly
    tourist.password = newPassword;
    await tourist.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });

  res.status(200).json(products);
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
const updateProduct = async (req, res) => {
  const { id } = req.query;
  const { name, description, price } = req.body;

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such product" });
  }

  try {
    // Update only the details and price fields
    const product = await Product.findOneAndUpdate(
      { _id: id },
      { name, description, price },
      { new: true } // Return the updated product
    );

    if (!product) {
      return res.status(400).json({ error: "No such product" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

const fileComplaint = async (req, res) => {
  const { title, body, date } = req.body;
  const { touristId } = req.params;
  // Check if title, body or touristId are missing
  if (!title || !body || !touristId) {
    return res
      .status(400)
      .json({ error: "Title, body, and tourist ID are required" });
  }

  try {
    // Create a complaint
    const complaint = await Complaint.create({
      title,
      body,
      date: date || new Date(), // Default to current date if not provided
      tourist: touristId,
    });
    res.status(200).json(complaint);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const buyProduct = async (req, res) => {
  const { touristId, productId } = req.params;

  console.log(touristId);
  try {
    const tourist = await Tourist.findById(touristId);
    if (!tourist) {
      return res.status(400).json({ error: "Tourist not found" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }
    if (product.quantity > 0) {
      // Add the product ID to the tourist's products and save
      tourist.products.push(productId);
      product.quantity--;
      product.sales++;
    }
    // Assuming `products` is an array field in your model
    await tourist.save();
    await product.save();
    res.status(200).json("Product was purchased successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTouristComplaints = async (req, res) => {
  try {
    const { touristId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(touristId)) {
      return res.status(400).json({ error: "Invalid tourist ID" });
    }

    const complaints = await Complaint.find({ tourist: touristId }).sort({
      createdAt: -1,
    });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPurchasedProducts = async (req, res) => {
  const { touristId } = req.params;

  try {
    // Find the tourist by ID
    const tourist = await Tourist.findById(touristId);
    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }

    // Return the list of purchased product IDs
    res.status(200).json(tourist.products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const requestDeletionTourist = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the tourist by ID and update the deletionRequest to "Pending"
    const tourist = await Tourist.findByIdAndUpdate(
      id,
      { deletionRequest: "Pending" },
      { new: true } // Return the updated document
    );

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    res.status(200).json({
      message: "Deletion request updated successfully",
      data: advertiser,
    });
  } catch (error) {
    console.error("Error updating deletion request:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getPassword = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  try {
    const tourist = await Tourist.findById(id);
    console.log(tourist);
    if (!tourist) {
      res.status(400).json({ message: "Tourist is not found" });
    } else {
      res.status(200).json(tourist.password);
    }
  } catch {
    console.error("Error getting password:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const bookFlight = async (req, res) => {
  try {
    const {
      airline,
      flightNumber1,
      departure1,
      arrival1,
      flightNumber2,
      departure2,
      arrival2,
      price,
      currency,
    } = req.body;

    // Create the booking
    const newBooking = new Booking({
      touristId: req.params.touristId, // Get the touristId from the URL parameter
      airline,
      flightNumber1,
      departure1,
      arrival1,
      flightNumber2,
      departure2,
      arrival2,
      price,
      currency,
    });

    // Save the booking
    const savedBooking = await newBooking.save();

    // Send a success response
    res.status(201).json({
      message: "Flight successfully booked!",
      booking: savedBooking,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        message: "An error occurred while booking the flight.",
        error: err.message,
      });
  }
};

const redeemPoints = async (req, res) => {
  const { id } = req.params;
  const { pointsToRedeem } = req.body;

  // Validate if pointsToRedeem is a number, at least 10,000, and in exact increments of 10,000
  if (
    !Number.isInteger(pointsToRedeem) ||
    pointsToRedeem < 10000 ||
    pointsToRedeem % 10000 !== 0
  ) {
    return res.status(400).json({
      error:
        "Invalid amount of points. Points must be at least 10,000 and in exact increments of 10,000.",
    });
  }

  try {
    // Find the tourist by ID
    const tourist = await Tourist.findById(id);
    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found." });
    }

    // Check if the tourist has enough points
    if (tourist.points < pointsToRedeem) {
      return res
        .status(400)
        .json({ error: "Insufficient points for redemption." });
    }

    // Deduct points from the tourist's balance
    tourist.points -= pointsToRedeem;

    // Calculate the equivalent currency to add to the wallet
    const currencyToAdd = (pointsToRedeem / 10000) * 100;
    tourist.walletBalance += currencyToAdd;

    // Save the updated tourist
    await tourist.save();

    // Respond with the updated points and wallet balance
    res.status(200).json({
      message: "Points redeemed successfully",
      pointsRemaining: tourist.points,
      walletBalance: tourist.walletBalance,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while redeeming points." });
  }
};

const addPoints = async (req, res) => {
  const { id } = req.params;
  const { pointsToAdd } = req.body;
  // Check if pointsToAdd is a valid number
  if (!pointsToAdd || pointsToAdd <= 0) {
    return res.status(400).json({ error: "Invalid points amount to add." });
  }
  // Find the tourist by ID
  const tourist = await Tourist.findById(id);
  if (!tourist) {
    return res.status(404).json({ error: "Tourist not found." });
  }
  // Add points to the tourist's balance
  tourist.points += pointsToAdd;
  // Save the updated tourist
  await tourist.save();
  res.status(200).json({
    message: "Points added successfully",
    currentPoints: tourist.points,
  });
};

//   const BookedItinerariesAndActivities = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "Invalid tourist ID" });
//   }

//   try {
//     const tourist = await Tourist.findById(id)
//       .populate('bookedItineraries')
//       .populate('bookedActivities');

//     if (!tourist) {
//       return res.status(404).json({ error: "Tourist not found" });
//     }

//     res.status(200).json({
//       bookedItineraries: tourist.bookedItineraries,
//       bookedActivities: tourist.bookedActivities
//     });
//   } catch (error) {
//     res.status(500).json({ error: "An error occurred while fetching booked itineraries and activities" });
//   }
// };

const BookedItineraries = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid tourist ID" });
  }

  try {
    const tourist = await Tourist.findById(id).populate("bookedItineraries");

    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }

    res.status(200).json(tourist.bookedItineraries);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching booked itineraries" });
  }
};

const BookedActivities = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid tourist ID" });
  }

  try {
    const tourist = await Tourist.findById(id).populate("bookedActivities");

    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }

    res.status(200).json(tourist.bookedActivities);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching booked activities" });
  }
};

module.exports = {
  createTourist,
  getTourists,
  getTourist,
  deleteTourist,
  updateTourist,
  updateRating,
  changePasswordTourist,
  fileComplaint,
  getAllProducts,
  searchProductbyName,
  filterProduct,
  sortProducts,
  buyProduct,
  getPurchasedProducts,
  requestDeletionTourist,
  getPassword,
  getTouristComplaints,
  bookFlight,
  redeemPoints,
  addPoints,
  BookedItineraries,
  BookedActivities,
};
