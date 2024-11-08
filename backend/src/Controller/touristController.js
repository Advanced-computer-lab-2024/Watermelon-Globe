const Tourist = require("../Models/touristModel");
const mongoose = require("mongoose");
const itineraryModel = require ("../Models/itineraryModel");
const ChildItinerary = require ("../Models/touristItineraryModel");
const Activity = require('../Models/activityModel');
const TourGuide = require('../Models/tourGuideModel'); // Adjust path if needed
const Complaint = require("../Models/Complaint");
const Product = require("../Models/productModel");

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

  // Check if title, body or date are missing
  if (!title || !body) {
    return res.status(400).json({ error: "Title and body are required" });
  }

  try {
    // Create a complaint
    const complaint = await Complaint.create({
      title,
      body,
      date: date || new Date(), // Default to current date if not provided
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
    if(!product){
      return res.status(400).json({ error: "Product not found" });

    }
    if(product.quantity>0){
    // Add the product ID to the tourist's products and save
    tourist.products.push(productId); 
    product.quantity--;
  
    }
    // Assuming `products` is an array field in your model
    await tourist.save();
    await product.save();


    res.status(200).json("Product was purchased successfully");
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
          return res.status(404).json({ message: 'Tourist not found' });
      }

      res.status(200).json({
          message: 'Deletion request updated successfully',
          data: advertiser
      });
  } catch (error) {
      console.error('Error updating deletion request:', error);
      res.status(500).json({ message: 'Server error' });
  }
};
// Method to refresh all 'completed' statuses and get completed itineraries for the current buyer
const getMyCompletedItineraries = async (buyerId) => {
  try {
    const currentDate = new Date();

    // Step 1: Refresh the 'completed' status for all ChildItineraries with status 'confirmed'
    await ChildItinerary.updateMany(
      { status: 'confirmed' }, // Only update 'completed' status if booking is confirmed
      [
        {
          $set: {
            completed: {
              $and: [
                { $ne: ['$chosenDates', []] }, // Ensure there are chosen dates
                { $not: { $gt: ['$chosenDates', currentDate] } } // All dates have passed
              ],
            },
          },
        },
      ]
    );

    // Step 2: Fetch all itineraries where 'completed' is true and buyer matches the current buyer ID
    const completedItineraries = await ChildItinerary.find({
      completed: true,
      buyer: buyerId, // Filter by the current buyer's ID
    });

    return completedItineraries;
  } catch (error) {
    console.error('Error fetching completed itineraries:', error);
    throw new Error('Failed to retrieve completed itineraries');
  }
};


// const rateItinerary = async (req, res) => {
//   const { itineraryId } = req.params;
//   const { rating } = req.body;
//   const Itinerary = itineraryModel.Itinerary; // Access the Itinerary model from the export object

//   try {
//     const itinerary = await Itinerary.findById(itineraryId);

//     if (!itinerary) {
//       return res.status(404).json({ error: 'Itinerary not found' });
//     }

//     // Update the total ratings sum and count
//     itinerary.ratingsSum = (itinerary.ratingsSum || 0) + rating;
//     itinerary.noOfRatings = (itinerary.noOfRatings || 0) + 1;
//     // Calculate the new average rating
//     itinerary.rating = itinerary.ratingsSum / itinerary.noOfRatings;

//     await itinerary.save();
//     res.status(200).json({ message: 'Rating added successfully', rating: itinerary.rating });
//   } catch (error) {
//     res.status(500).json({ error: 'Error adding rating to itinerary', details: error.message });
//   }
// };

const rateItinerary = async (req, res) => {
  const { itineraryId } = req.params;
  const { touristId, rating } = req.body;
  const Itinerary = itineraryModel.Itinerary; // Access the Itinerary model from the export object

  try {
    // Fetch the itinerary
    const itinerary = await Itinerary.findById(itineraryId);

    if (!itinerary) {
      return res.status(404).json({ error: "Itinerary not found" });
    }

    // Check if the tourist has already rated this itinerary
    const existingRating = itinerary.ratings.find(
      (ratingEntry) => ratingEntry.user.toString() === touristId
    );

    if (existingRating) {
      // If the tourist has rated before, update the existing rating
      const oldRating = existingRating.rating;
      existingRating.rating = rating;

      // Adjust ratingsSum
      itinerary.ratingsSum = itinerary.ratingsSum - oldRating + rating;
    } else {
      // If this is a new rating, add it to the ratings array
      itinerary.ratings.push({ user: touristId, rating });
      itinerary.noOfRatings += 1;
      itinerary.ratingsSum += rating;
    }

    // Recalculate the average rating
    itinerary.rating = itinerary.ratingsSum / itinerary.noOfRatings;

    // Save the updated itinerary
    await itinerary.save();

    res.status(200).json({ message: "Rating submitted successfully", itinerary });
  } catch (error) {
    console.error("Error adding rating to itinerary:", error);
    res.status(500).json({ error: "Error adding rating to itinerary", details: error.message });
  }
};


const commentOnItinerary = async (req, res) => {
  const { itineraryId } = req.params;
  const { touristId, text } = req.body;
  const Itinerary = itineraryModel.Itinerary;

  try {
    const itinerary = await Itinerary.findById(itineraryId);

    if (!itinerary) {
      return res.status(404).json({ error: 'Itinerary not found' });
    }

    // Check if the tourist has already commented
    const existingCommentIndex = itinerary.comments.findIndex(
      (comment) => comment.user.toString() === touristId
    );

    if (existingCommentIndex !== -1) {
      // Update existing comment
      itinerary.comments[existingCommentIndex].text = text;
      itinerary.comments[existingCommentIndex].date = new Date(); // Update the date
    } else {
      // Add a new comment
      itinerary.comments.push({
        user: touristId,
        text: text,
        date: new Date(),
      });
    }

    // Save changes
    await itinerary.save();

    res.status(200).json({ message: 'Comment added/updated successfully', comments: itinerary.comments });
  } catch (error) {
    res.status(500).json({ error: 'Error adding/updating comment to itinerary', details: error.message });
  }
};


const rateTourGuide = async (req, res) => {
  const { tourGuideId } = req.params;
  const { touristId, rating } = req.body;

  try {
    const tourGuide = await TourGuide.findById(tourGuideId);
    if (!tourGuide) {
      return res.status(404).json({ error: 'Tour guide not found' });
    }

    const existingRating = tourGuide.ratings.find(r => r.user.toString() === touristId);
    if (existingRating) {
      existingRating.rating = rating;
    } else {
      tourGuide.ratings.push({ user: touristId, rating });
    }

    tourGuide.ratingsSum = tourGuide.ratings.reduce((sum, r) => sum + r.rating, 0);
    tourGuide.noOfRatings = tourGuide.ratings.length;
    tourGuide.rating = tourGuide.ratingsSum / tourGuide.noOfRatings;

    await tourGuide.save();
    res.status(200).json({ message: 'Rating added/updated successfully', rating: tourGuide.rating });
  } catch (error) {
    res.status(500).json({ error: 'Error rating tour guide', details: error.message });
  }
};

const commentOnTourGuide = async (req, res) => {
  const { tourGuideId } = req.params;
  const { touristId, text } = req.body;

  try {
    const tourGuide = await TourGuide.findById(tourGuideId);
    if (!tourGuide) {
      return res.status(404).json({ error: 'Tour guide not found' });
    }

    const existingComment = tourGuide.comments.find(c => c.user.toString() === touristId);
    if (existingComment) {
      existingComment.text = text;
      existingComment.date = new Date();
    } else {
      tourGuide.comments.push({ user: touristId, text, date: new Date() });
    }

    await tourGuide.save();
    res.status(200).json({ message: 'Comment added/updated successfully', comments: tourGuide.comments });
  } catch (error) {
    res.status(500).json({ error: 'Error commenting on tour guide', details: error.message });
  }
};


const getMyCompletedActivities = async (req, res) => {
  const { touristId } = req.params;

  try {
    const completedActivities = await ActivityBooking.find({
      tourist: touristId,
      completed: true
    }).populate('activity');

    res.status(200).json({ message: 'Completed activities retrieved successfully', completedActivities });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving completed activities', details: error.message });
  }
};


const rateActivity = async (req, res) => {
  const { activityId } = req.params;
  const { touristId, rating } = req.body;

  try {
    const activity = await Activity.findById(activityId);

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    // Check if the user has already rated, if so, update the rating
    const existingRating = activity.ratings.find(r => r.user.toString() === touristId);

    if (existingRating) {
      // Update the existing rating
      activity.ratingsSum = activity.ratingsSum - existingRating.rating + rating;
      existingRating.rating = rating;
    } else {
      // Add a new rating
      activity.ratings.push({ user: touristId, rating });
      activity.ratingsSum = (activity.ratingsSum || 0) + rating;
      activity.noOfRatings = (activity.noOfRatings || 0) + 1;
    }

    // Update average rating
    activity.rating = activity.noOfRatings > 0 ? activity.ratingsSum / activity.noOfRatings : 0;

    await activity.save();
    res.status(200).json({ message: 'Rating added successfully', rating: activity.rating });
  } catch (error) {
    res.status(500).json({ error: 'Error adding rating to activity', details: error.message });
  }
};

const commentOnActivity = async (req, res) => {
  const { activityId } = req.params;
  const { touristId, text } = req.body;

  try {
    const activity = await Activity.findById(activityId);

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    // Check if the user has already commented, if so, update the comment
    const existingComment = activity.comments.find(c => c.user.toString() === touristId);

    if (existingComment) {
      existingComment.text = text;
      existingComment.date = new Date(); // Update timestamp
    } else {
      // Add a new comment
      activity.comments.push({
        user: touristId,
        text,
        date: new Date()
      });
    }

    await activity.save();
    res.status(200).json({ message: 'Comment added successfully', comments: activity.comments });
  } catch (error) {
    res.status(500).json({ error: 'Error adding comment to activity', details: error.message });
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
  getMyCompletedItineraries,
  rateItinerary,
  commentOnItinerary,
  rateTourGuide,
  commentOnTourGuide,
  getMyCompletedActivities,
  rateActivity,
  commentOnActivity
};
