const Tourist = require("../Models/touristModel");
const mongoose = require("mongoose");
const itineraryModel = require("../Models/itineraryModel");
const Complaint = require("../Models/Complaint");
const Product = require("../Models/productModel");
const Booking = require('../Models/FlightBooking');
const HotelBooking = require('../Models/HotelBooking');
const Hotel = require('../Models/Hotel.js');
const ChildItinerary = require ("../Models/touristItineraryModel");
const Activity = require('../Models/activityModel');
const TourGuide = require('../Models/tourGuideModel'); // Adjust path if needed
const ActivityBooking = require('../Models/activityBookingModel');
const Transportation = require('../Models/TransportationModel');




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
    if ( numericRating < 1 || numericRating > 5) {
      return res
        .status(400)
        .json({ message: "Invalid rating. Rating should be between 1 and 5." });
    }

    // Find the itinerary by ID
    const itinerary = await itineraryModel.Itinerary.findById(id);
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
// Method to refresh all 'completed' statuses and get completed itineraries for the current buyer
const getMyCompletedItineraries = async (req, res) => {
  try {
    const { buyerId } = req.params;
    const currentDate = new Date();

    // Step 1: Refresh the 'completed' status for all ChildItineraries with status 'confirmed'
    await ChildItinerary.updateMany(
      { status: 'confirmed' },
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
      buyer: buyerId,
    })
      .populate({
        path: 'itinerary', // Populate the itinerary field
        populate: { path: 'activities' } // Populate nested activities if needed
      });

    // Step 3: Send the populated itineraries to the client
    res.status(200).json(completedItineraries);
  } catch (error) {
    console.error('Error fetching completed itineraries:', error);
    res.status(500).json({ message: error.message });
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
  const { touristId, comment } = req.body;
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
      itinerary.comments[existingCommentIndex].comment = comment;
      itinerary.comments[existingCommentIndex].date = new Date(); // Update the date
    } else {
      // Add a new comment
      itinerary.comments.push({
        user: touristId,
        comment: comment,
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


// const rateTourGuide = async (req, res) => {
//   const { tourGuideId } = req.params;
//   const { touristId, rating } = req.body;

//   try {
//     const tourGuide = await TourGuide.findById(tourGuideId);
//     if (!tourGuide) {
//       return res.status(404).json({ error: 'Tour guide not found' });
//     }

//     const existingRating = tourGuide.ratings.find(r => r.user.toString() === touristId);
//     if (existingRating) {
//       existingRating.rating = rating;
//     } else {
//       tourGuide.ratings.push({ user: touristId, rating });
//     }

//     tourGuide.ratingsSum = tourGuide.ratings.reduce((sum, r) => sum + r.rating, 0);
//     tourGuide.noOfRatings = tourGuide.ratings.length;
//     tourGuide.rating = tourGuide.ratingsSum / tourGuide.noOfRatings;

//     await tourGuide.save();
//     res.status(200).json({ message: 'Rating added/updated successfully', rating: tourGuide.rating });
//   } catch (error) {
//     res.status(500).json({ error: 'Error rating tour guide', details: error.message });
//   }
// };

const rateTourGuide = async (req, res) => {
  const { tourGuideId } = req.params;
  const { touristId, rating } = req.body;

  try {
    const tourGuide = await TourGuide.findById(tourGuideId);
    if (!tourGuide) {
      return res.status(404).json({ error: 'Tour guide not found' });
    }

    // Update or add the rating
    const existingRating = tourGuide.ratings.find(r => r.user.toString() === touristId);
    if (existingRating) {
      existingRating.rating = rating;
    } else {
      tourGuide.ratings.push({ user: touristId, rating });
    }

    // Calculate the new average rating
    tourGuide.ratingsSum = tourGuide.ratings.reduce((sum, r) => sum + r.rating, 0);
    tourGuide.noOfRatings = tourGuide.ratings.length;
    tourGuide.rating = tourGuide.ratingsSum / tourGuide.noOfRatings;

    // Use the `.updateOne()` method to modify only the `ratings` field in the database.
    await TourGuide.updateOne(
      { _id: tourGuideId },
      {
        ratings: tourGuide.ratings,
        ratingsSum: tourGuide.ratingsSum,
        noOfRatings: tourGuide.noOfRatings,
        rating: tourGuide.rating,
      }
    );

    res.status(200).json({ message: 'Rating added/updated successfully', rating: tourGuide.rating });
  } catch (error) {
    res.status(500).json({ error: 'Error rating tour guide', details: error.message });
  }
};

// const commentOnTourGuide = async (req, res) => {
//   const { tourGuideId } = req.params;
//   const { touristId, comment } = req.body;

//   try {
//     const tourGuide = await TourGuide.findById(tourGuideId);
//     if (!tourGuide) {
//       return res.status(404).json({ error: 'Tour guide not found' });
//     }

//     const existingComment = tourGuide.comments.find(c => c.user.toString() === touristId);
//     if (existingComment) {
//       existingComment.text = comment;
//       existingComment.date = new Date();
//     } else {
//       tourGuide.comments.push({ user: touristId, comment, date: new Date() });
//     }

//     await tourGuide.save();
//     res.status(200).json({ message: 'Comment added/updated successfully', comments: tourGuide.comments });
//   } catch (error) {
//     res.status(500).json({ error: 'Error commenting on tour guide', details: error.message });
//   }
// };

const commentOnTourGuide = async (req, res) => {
  const { tourGuideId } = req.params;
  const { touristId, comment } = req.body;

  try {
    const tourGuide = await TourGuide.findById(tourGuideId);
    if (!tourGuide) {
      return res.status(404).json({ error: 'Tour guide not found' });
    }

    const existingComment = tourGuide.comments.find(c => c.user.toString() === touristId);
    if (existingComment) {
      existingComment.comment = comment; // Ensure the correct field name `comment`
      existingComment.date = new Date(); // Update the date
    } else {
      // Use the correct field names when pushing a new comment
      tourGuide.comments.push({ user: touristId, comment: comment, date: new Date() });
    }

    await tourGuide.save();
    res.status(200).json({ message: 'Comment added/updated successfully', comments: tourGuide.comments });
  } catch (error) {
    res.status(500).json({ error: 'Error commenting on tour guide', details: error.message });
  }
};


const createActivityBooking = async (req, res) => {
  const { activityId, touristId, chosenDate, status, paymentStatus } = req.body;

  try {
    // Check if the required fields are provided
    if (!activityId || !touristId || !chosenDate) {
      return res.status(400).json({ error: 'Activity ID, Tourist ID, and Chosen Date are required' });
    }

    // Create a new activity booking
    const newBooking = new ActivityBooking({
      activity: activityId,
      tourist: touristId,
      chosenDate: new Date(chosenDate), // Convert chosenDate to Date object if needed
      status: status || 'pending',
      paymentStatus: paymentStatus || 'unpaid'
    });

    // Save the booking to the database
    await newBooking.save();
    res.status(201).json({ message: 'Activity booking created successfully', booking: newBooking });
  } catch (error) {
    res.status(500).json({ error: 'Error creating activity booking', details: error.message });
  }
};

const getAllActivityBookings = async (req, res) => {
  try {
    // Fetch all activity bookings, populating related fields for activity and tourist details
    const bookings = await ActivityBooking.find()
      .populate('activity')
      .populate('tourist');

    res.status(200).json({ message: 'All activity bookings retrieved successfully', bookings });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving activity bookings', details: error.message });
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

    //await activity.save();

    await Activity.updateOne(
      { _id: activityId },
      {
        ratings: activity.ratings,
        ratingsSum: activity.ratingsSum,
        noOfRatings: activity.noOfRatings,
        rating: activity.rating,
      }
    );
    res.status(200).json({ message: 'Rating added successfully', rating: activity.rating });
  } catch (error) {
    res.status(500).json({ error: 'Error adding rating to activity', details: error.message });
  }
};

// const commentOnActivity = async (req, res) => {
//   const { activityId } = req.params;
//   const { touristId, comment } = req.body;

//   try {
//     const activity = await Activity.findById(activityId);

//     if (!activity) {
//       return res.status(404).json({ error: 'Activity not found' });
//     }

//     // Check if the user has already commented, if so, update the comment
//     const existingComment = activity.comments.find(c => c.user.toString() === touristId);

//     if (existingComment) {
//       existingComment.comment = comment;
//       existingComment.date = new Date(); // Update timestamp
//     } else {
//       // Add a new comment
//       activity.comments.push({
//         user: touristId,
//         comment,
//         date: new Date()
//       });
//     }

//     await activity.save();
//     res.status(200).json({ message: 'Comment added successfully', comments: activity.comments });
//   } catch (error) {
//     res.status(500).json({ error: 'Error adding comment to activity', details: error.message });
//   }
// };


const commentOnActivity = async (req, res) => {
  const { activityId } = req.params;
  const { touristId, comment } = req.body;

  try {
    const activity = await Activity.findById(activityId);

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    // Check if the user has already commented
    const existingComment = activity.comments.find(c => c.user.toString() === touristId);

    if (existingComment) {
      // Update the existing comment
      await Activity.updateOne(
        { _id: activityId, 'comments.user': touristId },
        {
          $set: {
            'comments.$.comment': comment,
            'comments.$.date': new Date(),
          },
        }
      );
    } else {
      // Add a new comment
      await Activity.updateOne(
        { _id: activityId },
        {
          $push: {
            comments: {
              user: touristId,
              comment,
              date: new Date(),
            },
          },
        }
      );
    }

    // Fetch the updated comments array to return in response
    const updatedActivity = await Activity.findById(activityId).populate('comments.user', 'name'); // Populate user name if needed

    res.status(200).json({ message: 'Comment added successfully', comments: updatedActivity.comments });
  } catch (error) {
    res.status(500).json({ error: 'Error adding comment to activity', details: error.message });
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
      const { airline, flightNumber1, departure1, arrival1, flightNumber2, departure2, arrival2, price, currency } = req.body;
  
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
        message: 'Flight successfully booked!',
        booking: savedBooking,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while booking the flight.', error: err.message });
    }
  };


const redeemPoints = async (req, res) => {
    const { id } = req.params;
    const { pointsToRedeem } = req.body;

    // Validate if pointsToRedeem is a number, at least 10,000, and in exact increments of 10,000
    if (!Number.isInteger(pointsToRedeem) || pointsToRedeem < 10000 || pointsToRedeem % 10000 !== 0) {
        return res.status(400).json({ 
            error: "Invalid amount of points. Points must be at least 10,000 and in exact increments of 10,000." 
        });
    }

    try {
        // Find the tourist by ID
        const tourist = await Tourist.findById(id);
        if (!tourist) {
            return res.status(404).json({ error: "Tourist not found." });
        }

        // Check if the tourist has enough points
        if (tourist.loyaltyPoints < pointsToRedeem) {
            return res.status(400).json({ error: "Insufficient points for redemption." });
        }

        // Deduct points from the tourist's balance
        tourist.loyaltyPoints -= pointsToRedeem;

        // Calculate the equivalent currency to add to the wallet
        const currencyToAdd = (pointsToRedeem / 10000) * 100;
        tourist.wallet += currencyToAdd;

        // Save the updated tourist
        await tourist.save();

        // Respond with the updated points and wallet balance
        res.status(200).json({
            message: "Points redeemed successfully",
            pointsRemaining: tourist.loyaltyPoints,
            walletBalance: tourist.walletBalance
        });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while redeeming points." });
    }
};

  const bookHotel = async (req, res) => {
    try {
      const { touristId } = req.params;
      const { hotelId, roomType, price, currency, checkInDate, checkOutDate } = req.body;
  
      // Check if tourist exists
      const tourist = await Tourist.findById(touristId);
      if (!tourist) {
        return res.status(404).json({ message: 'Tourist not found' });
      }
  
      // Create new hotel booking
      const newBooking = new HotelBooking({
        touristId: req.params.touristId, // Get the touristId from the URL parameter
        hotelId,
        roomType,
        price,
        currency,
        checkInDate,
        checkOutDate,
      });
  
      // Save the booking
      await newBooking.save();
  
      return res.status(201).json({
        message: 'Hotel booked successfully',
        booking: newBooking,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  const getHotelBookingsByTouristId = async (req, res) => {
    try {
      const { touristId } = req.params;
  
      // Find all hotel bookings by touristId
      const bookings = await HotelBooking.find({ touristId });
  
      if (!bookings.length) {
        return res.status(404).json({ message: 'No hotel bookings found for this tourist' });
      }
  
      return res.status(200).json({
        message: 'Hotel bookings fetched successfully',
        bookings,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  const getFlightBookingsByTouristId = async (req, res) => {
    try {
      const { touristId } = req.params;
  
      // Find all flight bookings by touristId
      const bookings = await Booking.find({ touristId });
  
      if (!bookings.length) {
        return res.status(404).json({ message: 'No flight bookings found for this tourist' });
      }
  
      return res.status(200).json({
        message: 'Flight bookings fetched successfully',
        bookings,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
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

const updateLoyaltyPoints = async (req, res) => {
  const { id } = req.params;
  const { amountPaid } = req.body;

  try {
    const tourist = await Tourist.findById(id);

    // Calculate points based on loyalty level
    let pointsToAdd;
    switch (tourist.loyaltyLevel) {
      case 1:
        pointsToAdd = amountPaid * 0.5;
        break;
      case 2:
        pointsToAdd = amountPaid * 1;
        break;
      case 3:
        pointsToAdd = amountPaid * 1.5;
        break;
      default:
        return res.status(400).json({ error: 'Invalid loyalty level' });
    }

    // Update loyalty points
    tourist.loyaltyPoints += pointsToAdd;

    // Update loyalty level based on points and assign badge
    if (tourist.loyaltyPoints <= 100000 ) {
      tourist.loyaltyLevel = 1;
      tourist.badge = 'Bronze';
    } else if (tourist.loyaltyPoints <= 500000) {
      tourist.loyaltyLevel = 2;
      tourist.badge = 'Silver';
    } else {
      tourist.loyaltyLevel = 3;
      tourist.badge = 'Gold';
    }

    await tourist.save();

    res.json({
      message: 'Loyalty points and badge updated successfully',
      loyaltyPoints: tourist.loyaltyPoints,
      loyaltyLevel: tourist.loyaltyLevel,
      badge: tourist.badge
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating loyalty points and badge' });
  }
};
const deleteItinerary = async (req, res) => {
  try {
    const { touristId, itineraryId } = req.params;

    // Find the tourist
    const tourist = await Tourist.findById(touristId);
    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }
    // Remove the itinerary from the tourist's bookedItineraries
    tourist.bookedItineraries = tourist.bookedItineraries.filter(
      (id) => id.toString() !== itineraryId
    );

    await tourist.save();

    // You may also want to delete the itinerary from your ChildItinerary collection
    // await ChildItinerary.findByIdAndDelete(itineraryId);

    res.status(200).json({ message: "Itinerary deleted successfully" });
  } catch (error) {
    console.error("Error deleting itinerary:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the itinerary" });
  }
};

const deleteActivity = async (req, res) => {
  try {
    const { touristId, activityId } = req.params;

    // Find the tourist
    const tourist = await Tourist.findById(touristId);
    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }

    // Remove the activity from the tourist's bookedActivities
    tourist.bookedActivities = tourist.bookedActivities.filter(
      (id) => id.toString() !== activityId
    );

    await tourist.save();

    // You may also want to delete the activity from your ActivityBooking collection
    // await ActivityBooking.findByIdAndDelete(activityId);

    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    console.error("Error deleting activity:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the activity" });
  }
};

// get all trips
const getAllTransportations = async (req, res) => {
  try {
    // Fetch all transportation records, sorted by creation date (latest first)
    const transportations = await Transportation.find({}).sort({ createdAt: -1 });
    
    res.status(200).json(transportations);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching transportation records.' });
  }
};

// get a single tourist -- used to view profile
const getTransportation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Transportation" });
  }

  const transportaion = await Transportation.findById(id);

  if (!transportaion) {
    return res.status(404).json({ error: "No such tourist" });
  }
  res.status(200).json(transportaion);
};

const bookTransportation = async (req, res) => {
  const { id } = req.params;

  try {
    const transportaion = await Transportation.findOneAndUpdate(
      { _id: id },
      { booked: true },
      { new: true } 
    );
    res
      .status(200)
      .json({ message: "Booked successfully", transportaion });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  bookHotel,
  BookedItineraries,
  BookedActivities,
  updateLoyaltyPoints,
  getHotelBookingsByTouristId,
  getFlightBookingsByTouristId,
  deleteActivity,
  deleteItinerary,
  getTransportation,
  bookTransportation
  getMyCompletedItineraries,
  rateItinerary,
  commentOnItinerary,
  rateTourGuide,
  commentOnTourGuide,
  createActivityBooking,
  getAllActivityBookings,
  getMyCompletedActivities,
  rateActivity,
  commentOnActivity,
  getAllTransportations
};
