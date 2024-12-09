const Tourist = require("../Models/touristModel");
const mongoose = require("mongoose");
const stripe = require('stripe')(process.env.SECRET_KEY); // Replace with your Stripe secret key
const itineraryModel = require("../Models/itineraryModel");
const Complaint = require("../Models/Complaint");
const Product = require("../Models/ProductModel.js");
const Booking = require('../Models/FlightBooking');
const HotelBooking = require('../Models/HotelBooking');
const Hotel = require('../Models/Hotel.js');
const ChildItinerary = require ("../Models/touristItineraryModel");
const Activity = require('../Models/activityModel');
const TourGuide = require('../Models/tourGuideModel'); // Adjust path if needed
const ActivityBooking = require('../Models/activityBookingModel');
const Transportation = require('../Models/TransportationModel');
const Admin = require("../Models/AdminModel.js");
const nodemailer = require("nodemailer");
const Itinerary = require('../Models/itineraryModel.js'); 

//Tourist


//for frontend
const frontendDataTable = async (req, res) => {
  try {
    const tourists = await Tourist.find({}, "username email status dob");
    const formattedData = tourists.map((tourist) => {
      // Calculate age based on date of birth
      const today = new Date();
      const birthDate = new Date(tourist.dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return {
        id: tourist._id,
        username: tourist.username,
        email: tourist.email,
        status: tourist.status,
        age,
      };
    });

    res.status(200).json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching tourists" });
  }
};

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
    if (numericRating < 1 || numericRating > 5) {
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

  try {
    const tourist = await Tourist.findById(touristId);
    if (!tourist) {
      return res.status(400).json({ error: "Tourist not found" });
    }

    const product = await Product.findById(productId)
    .populate("seller");
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }

    if (product.quantity > 0) {
      // Add the product ID to the tourist's products and update product
      tourist.products.push(productId);
      product.quantity--;
      product.sales++;
      
      await tourist.save();
      await product.save();
    } else {
      return res.status(400).json({ error: "Product is out of stock" });
    }

    if (product.quantity === 0) {
      const admin = await Admin.findById("674a3e827a6dcbe8e5bd8069");
      if (admin) {
        const notification = `Product ${product.name} is out of stock.`;
        admin.notifications.push(notification);

        await admin.save();

        const seller= product.seller;
        seller.notifications.push(notification);

        // Send email notification
        const emailResult = await sendEmail(
          'omarhseif04@gmail.com',
          'Low Stock Alert',
          notification,
          `<h1>Low Stock Alert</h1><p>${notification}</p>`
        );

        const emailResult2 = await sendEmail(
          'omarhseif04@gmail.com',
          'Low Stock Alert',
          notification,
          `<h1>Low Stock Alert</h1><p>${notification}</p>`
        );

        if (!emailResult2.success) {
          console.error('Failed to send email notification for product for seller:', product._id);
        }



        if (!emailResult.success) {
          console.error('Failed to send email notification for product:', product._id);
        }
      } else {
        console.error('Admin not found to send low stock notification');
      }
    }

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
    await ChildItinerary.updateMany({ status: "confirmed" }, [
      {
        $set: {
          completed: {
            $and: [
              { $ne: ["$chosenDates", []] }, // Ensure there are chosen dates
              { $not: { $gt: ["$chosenDates", currentDate] } }, // All dates have passed
            ],
          },
        },
      },
    ]);

    // Step 2: Fetch all itineraries where 'completed' is true and buyer matches the current buyer ID
    const completedItineraries = await ChildItinerary.find({
      completed: true,
      buyer: buyerId,
    }).populate({
      path: "itinerary", // Populate the itinerary field
      populate: { path: "activities" }, // Populate nested activities if needed
    });

    // Step 3: Send the populated itineraries to the client
    res.status(200).json(completedItineraries);
  } catch (error) {
    console.error("Error fetching completed itineraries:", error);
    res.status(500).json({ message: error.message });
    throw new Error("Failed to retrieve completed itineraries");
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

    res
      .status(200)
      .json({ message: "Rating submitted successfully", itinerary });
  } catch (error) {
    console.error("Error adding rating to itinerary:", error);
    res.status(500).json({
      error: "Error adding rating to itinerary",
      details: error.message,
    });
  }
};

const commentOnItinerary = async (req, res) => {
  const { itineraryId } = req.params;
  const { touristId, comment } = req.body;
  const Itinerary = itineraryModel.Itinerary;

  try {
    const itinerary = await Itinerary.findById(itineraryId);

    if (!itinerary) {
      return res.status(404).json({ error: "Itinerary not found" });
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

    res.status(200).json({
      message: "Comment added/updated successfully",
      comments: itinerary.comments,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error adding/updating comment to itinerary",
      details: error.message,
    });
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
      return res.status(404).json({ error: "Tour guide not found" });
    }

    // Update or add the rating
    const existingRating = tourGuide.ratings.find(
      (r) => r.user.toString() === touristId
    );
    if (existingRating) {
      existingRating.rating = rating;
    } else {
      tourGuide.ratings.push({ user: touristId, rating });
    }

    // Calculate the new average rating
    tourGuide.ratingsSum = tourGuide.ratings.reduce(
      (sum, r) => sum + r.rating,
      0
    );
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

    res.status(200).json({
      message: "Rating added/updated successfully",
      rating: tourGuide.rating,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error rating tour guide", details: error.message });
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
      return res.status(404).json({ error: "Tour guide not found" });
    }

    const existingComment = tourGuide.comments.find(
      (c) => c.user.toString() === touristId
    );
    if (existingComment) {
      existingComment.comment = comment; // Ensure the correct field name `comment`
      existingComment.date = new Date(); // Update the date
    } else {
      // Use the correct field names when pushing a new comment
      tourGuide.comments.push({
        user: touristId,
        comment: comment,
        date: new Date(),
      });
    }

    await tourGuide.save();
    res.status(200).json({
      message: "Comment added/updated successfully",
      comments: tourGuide.comments,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error commenting on tour guide",
      details: error.message,
    });
  }
};

const createActivityBooking = async (req, res) => {
  const { activityId, touristId, chosenDate, status, paymentStatus } = req.body;

  try {
    // Check if the required fields are provided
    if (!activityId || !touristId || !chosenDate) {
      return res.status(400).json({
        error: "Activity ID, Tourist ID, and Chosen Date are required",
      });
    }

    // Create a new activity booking
    const newBooking = new ActivityBooking({
      activity: activityId,
      tourist: touristId,
      chosenDate: new Date(chosenDate), // Convert chosenDate to Date object if needed
      status: status || "pending",
      paymentStatus: paymentStatus || "unpaid",
    });

    // Save the booking to the database
    await newBooking.save();
    res.status(201).json({
      message: "Activity booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error creating activity booking",
      details: error.message,
    });
  }
};

const getAllActivityBookings = async (req, res) => {
  try {
    // Fetch all activity bookings, populating related fields for activity and tourist details
    const bookings = await ActivityBooking.find()
      .populate("activity")
      .populate("tourist");

    res.status(200).json({
      message: "All activity bookings retrieved successfully",
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error retrieving activity bookings",
      details: error.message,
    });
  }
};

const getMyCompletedActivities = async (req, res) => {
  const { touristId } = req.params;

  try {
    const completedActivities = await ActivityBooking.find({
      tourist: touristId,
      completed: true,
    }).populate("activity");

    res.status(200).json({
      message: "Completed activities retrieved successfully",
      completedActivities,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error retrieving completed activities",
      details: error.message,
    });
  }
};

const rateActivity = async (req, res) => {
  const { activityId } = req.params;
  const { touristId, rating } = req.body;

  try {
    const activity = await Activity.findById(activityId);

    if (!activity) {
      return res.status(404).json({ error: "Activity not found" });
    }

    // Check if the user has already rated, if so, update the rating
    const existingRating = activity.ratings.find(
      (r) => r.user.toString() === touristId
    );

    if (existingRating) {
      // Update the existing rating
      activity.ratingsSum =
        activity.ratingsSum - existingRating.rating + rating;
      existingRating.rating = rating;
    } else {
      // Add a new rating
      activity.ratings.push({ user: touristId, rating });
      activity.ratingsSum = (activity.ratingsSum || 0) + rating;
      activity.noOfRatings = (activity.noOfRatings || 0) + 1;
    }

    // Update average rating
    activity.rating =
      activity.noOfRatings > 0 ? activity.ratingsSum / activity.noOfRatings : 0;

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
    res
      .status(200)
      .json({ message: "Rating added successfully", rating: activity.rating });
  } catch (error) {
    res.status(500).json({
      error: "Error adding rating to activity",
      details: error.message,
    });
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
      return res.status(404).json({ error: "Activity not found" });
    }

    // Check if the user has already commented
    const existingComment = activity.comments.find(
      (c) => c.user.toString() === touristId
    );

    if (existingComment) {
      // Update the existing comment
      await Activity.updateOne(
        { _id: activityId, "comments.user": touristId },
        {
          $set: {
            "comments.$.comment": comment,
            "comments.$.date": new Date(),
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
    const updatedActivity = await Activity.findById(activityId).populate(
      "comments.user",
      "name"
    ); // Populate user name if needed

    res.status(200).json({
      message: "Comment added successfully",
      comments: updatedActivity.comments,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error adding comment to activity",
      details: error.message,
    });
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
    res.status(500).json({
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
    if (tourist.loyaltyPoints < pointsToRedeem) {
      return res
        .status(400)
        .json({ error: "Insufficient points for redemption." });
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
      walletBalance: tourist.walletBalance,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while redeeming points." });
  }
};

const bookHotel = async (req, res) => {
  try {
    const { touristId } = req.params;
    const { hotelId, roomType, price, currency, checkInDate, checkOutDate } =
      req.body;

    // Check if tourist exists
    const tourist = await Tourist.findById(touristId);
    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
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
      message: "Hotel booked successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getHotelBookingsByTouristId = async (req, res) => {
  try {
    const { touristId } = req.params;

    // Find all hotel bookings by touristId
    const bookings = await HotelBooking.find({ touristId });

    if (!bookings.length) {
      return res
        .status(404)
        .json({ message: "No hotel bookings found for this tourist" });
    }

    return res.status(200).json({
      message: "Hotel bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getFlightBookingsByTouristId = async (req, res) => {
  try {
    const { touristId } = req.params;

    // Find all flight bookings by touristId
    const bookings = await Booking.find({ touristId });

    if (!bookings.length) {
      return res
        .status(404)
        .json({ message: "No flight bookings found for this tourist" });
    }

    return res.status(200).json({
      message: "Flight bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
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
    const tourist = await Tourist.findById(id)
      .populate({
        path: 'bookedItineraries',
        populate: {
          path: 'itinerary',  // Populate the actual itinerary details
          model: 'Itinerary', // Ensure the model is correct for your Itinerary
        }
      });

    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }

    res.status(200).json(tourist.bookedItineraries); // Send populated itinerary details
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching booked itineraries" });
  }
};

const BookedActivities = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid tourist ID" });
  }

  try {
    const tourist = await Tourist.findById(id)
      .populate({
        path: 'bookedActivities',
        populate: {
          path: 'activity',  // Populate the actual activity details
          model: 'Activity', // Ensure the model is correct for your Activity
        }
      });

    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }

    res.status(200).json(tourist.bookedActivities); // Send populated activity details
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching booked activities" });
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
        return res.status(400).json({ error: "Invalid loyalty level" });
    }

    // Update loyalty points
    tourist.loyaltyPoints += pointsToAdd;

    // Update loyalty level based on points and assign badge
    if (tourist.loyaltyPoints <= 100000) {
      tourist.loyaltyLevel = 1;
      tourist.badge = "Bronze";
    } else if (tourist.loyaltyPoints <= 500000) {
      tourist.loyaltyLevel = 2;
      tourist.badge = "Silver";
    } else {
      tourist.loyaltyLevel = 3;
      tourist.badge = "Gold";
    }

    await tourist.save();

    res.json({
      message: "Loyalty points and badge updated successfully",
      loyaltyPoints: tourist.loyaltyPoints,
      loyaltyLevel: tourist.loyaltyLevel,
      badge: tourist.badge,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while updating loyalty points and badge",
    });
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
    const transportations = await Transportation.find({}).sort({
      createdAt: -1,
    });

    res.status(200).json(transportations);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching transportation records.",
    });
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
    res.status(200).json({ message: "Booked successfully", transportaion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//sprint 3 Hatem

// Add itinerary bookmark
const bookmarkItinerary = async (req, res) => {
  const { touristId, itineraryId } = req.params;

  try {
    const tourist = await Tourist.findById(touristId);
    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }

    // Check if already bookmarked
    if (tourist.bookmarkedItineraries.includes(itineraryId)) {
      return res.status(400).json({ error: "Itinerary already bookmarked" });
    }

    tourist.bookmarkedItineraries.push(itineraryId);
    await tourist.save();

    res.status(200).json({ message: "Itinerary bookmarked successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error bookmarking itinerary", details: error.message });
  }
};

// Add activity bookmark
const bookmarkActivity = async (req, res) => {
  const { touristId, activityId } = req.params;

  try {
    const tourist = await Tourist.findById(touristId);
    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }

    // Check if already bookmarked
    if (tourist.bookmarkedActivities.includes(activityId)) {
      return res.status(400).json({ error: "Activity already bookmarked" });
    }

    tourist.bookmarkedActivities.push(activityId);
    await tourist.save();

    res.status(200).json({ message: "Activity bookmarked successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error bookmarking activity", details: error.message });
  }
};


// Remove itinerary bookmark
const removeItineraryBookmark = async (req, res) => {
  const { touristId, itineraryId } = req.params;

  try {
    const tourist = await Tourist.findById(touristId);
    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }

    const bookmarkIndex = tourist.bookmarkedItineraries.indexOf(itineraryId);
    if (bookmarkIndex === -1) {
      return res.status(400).json({ error: "Itinerary not bookmarked" });
    }

    tourist.bookmarkedItineraries.splice(bookmarkIndex, 1);
    await tourist.save();

    res.status(200).json({ message: "Itinerary bookmark removed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove activity bookmark
const removeActivityBookmark = async (req, res) => {
  const { touristId, activityId } = req.params;

  try {
    const tourist = await Tourist.findById(touristId);
    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }

    const bookmarkIndex = tourist.bookmarkedActivities.indexOf(activityId);
    if (bookmarkIndex === -1) {
      return res.status(400).json({ error: "Activity not bookmarked" });
    }

    tourist.bookmarkedActivities.splice(bookmarkIndex, 1);
    await tourist.save();

    res.status(200).json({ message: "Activity bookmark removed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all bookmarks
const getBookmarks = async (req, res) => {
  const { touristId } = req.params;

  try {
    const tourist = await Tourist.findById(touristId)
      .populate('bookmarkedItineraries')
      .populate('bookmarkedActivities');

    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }

    res.status(200).json({
      bookmarkedItineraries: tourist.bookmarkedItineraries,
      bookmarkedActivities: tourist.bookmarkedActivities
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Check if an itinerary is bookmarked
const checkBookmarkItinerary = async (req, res) => {
  const { touristId, itineraryId } = req.params;

  try {
    const tourist = await Tourist.findById(touristId);
    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }

    const isBookmarked = tourist.bookmarkedItineraries.includes(itineraryId);
    res.status(200).json({ isBookmarked });
  } catch (error) {
    res.status(500).json({ error: "Error checking itinerary bookmark status", details: error.message });
  }
};

// Check if an activity is bookmarked
const checkBookmarkActivity = async (req, res) => {
  const { touristId, activityId } = req.params;

  try {
    const tourist = await Tourist.findById(touristId);
    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }

    const isBookmarked = tourist.bookmarkedActivities.includes(activityId);
    res.status(200).json({ isBookmarked });
  } catch (error) {
    res.status(500).json({ error: "Error checking activity bookmark status", details: error.message });
  }
};

const addProductToCart = async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body;

  try {
    const tourist = await Tourist.findById(id);
    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }

    const existingItem = tourist.cart.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      tourist.cart.push({ product: productId, quantity });
    }

    await tourist.save();
    res.status(200).json({ message: "Product added to cart", cart: tourist.cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeProductFromCart = async (req, res) => {
  const { id } = req.params;
  const { productId } = req.body;

  try {
    const tourist = await Tourist.findById(id);
    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }

    tourist.cart = tourist.cart.filter(
      (item) => item.product.toString() !== productId
    );

    await tourist.save();
    res.status(200).json({ message: "Product removed from cart", cart: tourist.cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const changeCartItemQuantity = async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body;

  try {
    const tourist = await Tourist.findById(id);
    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }

    const cartItem = tourist.cart.find(
      (item) => item.product.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    if (quantity <= 0) {
      // Remove the item if quantity is zero or less
      tourist.cart = tourist.cart.filter(
        (item) => item.product.toString() !== productId
      );
    } else {
      cartItem.quantity = quantity;
    }

    await tourist.save();
    res.status(200).json({ message: "Cart item quantity updated", cart: tourist.cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const viewCart = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the tourist and populate the product details in the cart
    const tourist = await Tourist.findById(id).populate('cart.product');
    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }

    res.status(200).json({ cart: tourist.cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buyCart = async (req, res) => {
  const { touristId } = req.params;

  try {
    // Find the tourist by ID
    const tourist = await Tourist.findById(touristId).populate('cart.product');

    if (!tourist) {
      return res.status(404).json({ message: 'Tourist not found' });
    }

    // Ensure that the tourist has a cart with items
    if (!tourist.cart || tourist.cart.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    let totalPrice = 0;
    const orderItems = [];
    const productsToAdd = [];

    // Process each product in the cart
    for (const item of tourist.cart) {
      const productId = item.product._id;
      const quantityToDecrement = item.quantity;

      // Find the product by ID
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(400).json({ message: `Product with ID ${productId} not found` });
      }

      // Ensure the product has enough quantity available
      if (product.quantity < quantityToDecrement) {
        return res.status(400).json({ message: `Not enough quantity for product: ${product.name}` });
      }

      // Decrement the product quantity
      product.quantity -= quantityToDecrement;
      product.sales++;
      await product.save();

      // Add product to the list of products for the tourist
      productsToAdd.push(productId);

      // Add item details to the order
      orderItems.push({
        productId: productId,
        quantity: quantityToDecrement,
      });

      // Calculate the total price
      totalPrice += product.price * quantityToDecrement;
    }

    // Add the products to the `products` array in the tourist's profile
    tourist.products.push(...productsToAdd);

    // Create a new order
    const newOrder = {
      items: orderItems,
      totalPrice,
      status: 'Confirmed',
      orderDate: new Date(),
    };

    // Add the new order to the tourist's orders array
    tourist.orders.push(newOrder);

    // Clear the cart after the purchase
    tourist.cart = [];

    // Save the updated tourist document
    await tourist.save();

    return res.status(200).json({
      message: 'Cart successfully purchased. Products added to profile and orders, and cart cleared.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong during the purchase process.' });
  }
};


const getAddresses = async (req, res) => {

  const { touristId } = req.params;
  try {
    
    const tourist = await Tourist.findById(touristId).select('addresses');

    if (!tourist) {
      return res.status(404).json({ message: 'Tourist not found' });
    }

    // Return the addresses
    res.status(200).json(tourist.addresses);
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ message: 'Failed to fetch addresses' });
  }

}

// Add a new address
const addAddress = async (req, res) => {
  const { id } = req.params;
  const { address } = req.body;

  try {
    // Find the tourist by ID
    const tourist = await Tourist.findById(id);
    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }

    // Validate the address object to ensure it's complete
    const { street, city, state, zip, country } = address;
    if (!street || !city || !state || !zip || !country) {
      return res.status(400).json({ error: "Incomplete address details" });
    }

    delete address._id;

    // Add the new address to the addresses array
    tourist.addresses.push(address);

    // Save the updated tourist document
    await tourist.save();

    // Return the updated addresses list
    res.status(200).json({ message: "Address added successfully", addresses: tourist.addresses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Update an existing address
const updateAddress = async (req, res) => {
  const { id } = req.params;
  const { index, address } = req.body;

  try {
    // Find the tourist by ID
    const tourist = await Tourist.findById(id);
    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }

    // Validate the address object to ensure it's complete
    const { street, city, state, zip, country } = address;
    if (!street || !city || !state || !zip || !country) {
      return res.status(400).json({ error: "Incomplete address details" });
    }

    // If index is provided and is valid, update the existing address
    if (index !== undefined && tourist.addresses[index]) {
      tourist.addresses[index] = address; // Update the address at the specified index
    } else {
      return res.status(400).json({ error: "Invalid address index" });
    }

    // Save the updated tourist document
    await tourist.save();

    // Return the updated addresses list
    res.status(200).json({ message: "Address updated successfully", addresses: tourist.addresses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const selectAddress = async (req, res) => {
  try {
    const { touristId } = req.params; // Tourist ID from the URL params
    const { index } = req.body; // Index of the address to select

    if (index === undefined) {
      return res.status(400).json({ message: 'Address index is required' });
    }

    // Find the tourist by ID
    const tourist = await Tourist.findById(touristId);

    if (!tourist) {
      return res.status(404).json({ message: 'Tourist not found' });
    }

    // Check if the index is valid
    if (index < 0 || index >= tourist.addresses.length) {
      return res.status(400).json({ message: 'Invalid address index' });
    }

    // Update all addresses to set `isSelected` to false
    tourist.addresses.forEach(address => {
      address.isSelected = false;
    });

    // Set the address at the given index to `isSelected: true`
    tourist.addresses[index].isSelected = true;

    // Save the tourist document with updated addresses
    await tourist.save();

    // Respond with the updated tourist document
    res.status(200).json(tourist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const unselectAddress = async (req, res) => {
  try {
    const { touristId } = req.params; // Tourist ID from the URL params
    const { index } = req.body; // Index of the address to unselect

    if (index === undefined) {
      return res.status(400).json({ message: 'Address index is required' });
    }

    // Find the tourist by ID
    const tourist = await Tourist.findById(touristId);

    if (!tourist) {
      return res.status(404).json({ message: 'Tourist not found' });
    }

    // Check if the index is valid
    if (index < 0 || index >= tourist.addresses.length) {
      return res.status(400).json({ message: 'Invalid address index' });
    }

    // Unselect the address at the given index
    tourist.addresses[index].isSelected = false;

    // Save the tourist document with updated addresses
    await tourist.save();

    // Respond with the updated tourist document
    res.status(200).json(tourist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteAddress = async (req, res) => {
  const { id } = req.params; // Tourist ID
  const { index } = req.body; // Index of the address to delete

  try {
    const tourist = await Tourist.findById(id);
    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }

    // Check if the index is valid
    if (index === undefined || index < 0 || index >= tourist.addresses.length) {
      return res.status(400).json({ error: "Invalid index" });
    }

    // Remove the address at the specified index
    tourist.addresses.splice(index, 1); // Removes 1 address at the index

    // Save the updated tourist document
    await tourist.save();

    res.status(200).json({ message: "Address deleted successfully", addresses: tourist.addresses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteAllAddresses = async (req, res) => {
  const { id } = req.params; // Tourist ID

  try {
    const tourist = await Tourist.findById(id);
    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }

    // Clear all addresses
    tourist.addresses = [];

    // Save the updated tourist document
    await tourist.save();

    res.status(200).json({ message: "All addresses deleted successfully", addresses: tourist.addresses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};



const viewAllOrders = async (req, res) => {
  const { id } = req.params;

  try {
    const tourist = await Tourist.findById(id).populate('orders.items.productId');
    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }

    res.status(200).json({ orders: tourist.orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const viewOrderDetails = async (req, res) => {
  const { touristId } = req.params;
  const { orderId } = req.query

  try {
    const tourist = await Tourist.findById(touristId).populate('orders.items.productId');
    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }

    const order = tourist.orders.id(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cancelOrder = async (req, res) => {
  const { touristId } = req.params;
  const { orderId, reason } = req.body;

  try {
    const tourist = await Tourist.findById(touristId);
    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }

    const order = tourist.orders.id(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.status === 'Cancelled') {
      return res.status(400).json({ error: "Order is already cancelled" });
    }

    order.status = 'Cancelled';
    order.cancellationReason = reason;

    await tourist.save();

    res.status(200).json({ message: "Order cancelled successfully", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateWallet = async (req, res) => {
  const { touristId } = req.params;
  const { amount } = req.body; // Expecting amount to be in the request body

  if (typeof amount !== 'number' || isNaN(amount)) {
    return res.status(400).json({ message: "Invalid amount." });
  }

  try {
    // Find the tourist by ID and update the wallet
    const tourist = await Tourist.findById(touristId);

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found." });
    }

    // Update wallet
    tourist.wallet += amount; // Add the amount to the current wallet balance

    // Save the updated tourist document
    await tourist.save();

    // Respond with updated tourist data
    res.status(200).json({
      message: "Wallet updated successfully.",
      wallet: tourist.wallet,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating wallet." });
  }
}

// Create Payment Intent For Flights
const stripePayIntentFlight = async (req, res) => {
  try {
    const { bookingId } = req.body; // Receive the booking ID in the request

    // Find the booking in the database
    const booking = await Booking.findById(bookingId);

    console.log(booking);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Extract price and currency from the booking
    const amount = booking.price * 100; // Convert to cents (e.g., $10.00 -> 1000 cents)
    const currency = booking.currency;

    // Create the payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      metadata: { bookingId: booking._id.toString() }, // Optionally add metadata
    });

    // Respond with the client secret
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).json({ error: error.message });
  }
};



// Create Payment Intent For Hotels
const stripePayIntentHotel = async (req, res) => {
  try {
    const { bookingId } = req.body; // Receive the booking ID in the request

    // Find the hotel booking in the database
    const booking = await HotelBooking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ error: 'Hotel booking not found' });
    }

    // Extract price and currency from the booking
    const amount = booking.price * 100; // Convert to cents (e.g., $10.00 -> 1000 cents)
    const currency = booking.currency;

    // Create the payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      metadata: { bookingId: booking._id.toString() }, // Optionally add metadata
    });

    // Respond with the client secret
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const stripePayIntentActivity = async (req, res) => {
  try {
    const { activityId } = req.body; // Receive the activity ID in the request

    // Find the activity in the database
    const activity = await Activity.findById(activityId);

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    if (!activity.bookingOpen) {
      return res.status(400).json({ error: 'Booking for this activity is closed.' });
    }

    // Calculate the amount considering discounts (if any)
    const basePrice = activity.Price;
    const discount = activity.Discount;
    const finalPrice = basePrice - (basePrice * (discount / 100));

    const amount = Math.round(finalPrice * 100); // Convert to cents (e.g., $10.00 -> 1000 cents)
    const currency = 'usd'; // Set a default or configurable currency

    // Create the payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      metadata: { activityId: activity._id.toString() }, // Optionally add metadata
    });

    // Respond with the client secret
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const stripePayIntentItinerary = async (req, res) => {
  try {
    const { itineraryId } = req.body; // Receive itinerary ID in the request
    // Fetch the itinerary from the database
    const itinerary = await Itinerary.Itinerary.findById(itineraryId);
    if (!itinerary) {
      return res.status(404).json({ error: 'Itinerary not found' });
    }

    // Check if the itinerary is available for booking
    // if (itinerary.bookings) {
    //   return res.status(400).json({ error: 'This itinerary is already booked and cannot be paid for.' });
    // }

    // // Validate the chosen dates against the itinerary's available dates
    // const availableDatesSet = new Set(itinerary.availableDates.map(date => date.toISOString()));
    // const allDatesAvailable = req.body.chosenDates.every(date => availableDatesSet.has(date.toISOString()));

    // if (!allDatesAvailable) {
    //   return res.status(400).json({ error: 'One or more chosen dates are not available in the itinerary.' });
    // }

    // Calculate the payment amount
    const amount = Math.round(itinerary.priceOfTour * 100); // Convert to cents
    const currency = 'usd'; // Default currency

    // Create the payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      metadata: {
        itineraryId: itinerary._id.toString(),
      },
    });

    // Respond with the client secret
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).json({ error: error.message });
  }
};


const stripePayIntentProduct = async (req, res) => {
  try {
    const { totalAmount } = req.body; // Receive product ID and quantity in the request

    const currency = 'usd'; // Default currency

    // Ensure amount is in the smallest unit (cents for USD)
    const amountInCents = totalAmount * 100;

    // Create the payment intent with the calculated amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents, 
      currency: currency,
    });

    // Respond with the client secret for the frontend to complete the payment
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).json({ message: 'Failed to create payment intent.' });
  }
};


const getNotificationsTourist = async (req, res) => {
  const { id } = req.params;
  try {
    const tourist = await Tourist.findById(id);
    if (!tourist) {
      res.status(404).json({ message: "Tourist not found" });
    } else {
      res.status(200).json(tourist.notifications);
    }
  } catch (error) {
    console.error("Error getting notifications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const sendEmail = async (to, subject, text, html) => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "watermelonglobe@gmail.com", // Replace with your Gmail address
        pass: "tzve vdjr usit evdu", // Use your generated Gmail app password here
      },
    });

    // Email options
    const mailOptions = {
      from: '"Watermelon Globe" <watermelonglobe@gmail.com>',
      to, // Recipient's email address
      subject, // Subject of the email
      text, // Plain text content
      html, // HTML content (optional)
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response);
    return { success: true, message: 'Email sent successfully!' };
  } catch (error) {
    console.error('Error sending email: ', error);
    return { success: false, message: 'Failed to send email.', error };
  }
};

const checkUpcomingEvents = async (req, res) => {
  try {
    const now = new Date();
    const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

    const tourists = await Tourist.find()
      .populate({
        path: 'bookedItineraries',
        populate: {
          path: 'itinerary',
          select: 'name'
        }
      })
      .populate({
        path: 'bookedActivities',
        populate: {
          path: 'activity',
          select: 'name'
        }
      });

    for (const tourist of tourists) {
      let notificationsAdded = false;

      // Check itineraries
      for (const booking of tourist.bookedItineraries) {
        if (booking.chosenDates && booking.chosenDates[0]) {
          const eventDate = new Date(booking.chosenDates[0]);
          if (eventDate > now && eventDate <= threeDaysFromNow) {
            const daysUntilEvent = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));
            const notification = {
              message: `Upcoming itinerary "${booking.itinerary.name}" in ${daysUntilEvent} day(s) on ${eventDate.toLocaleDateString()}`,
              date: now,
              read: false
            };
            tourist.notifications.push(notification);
            notificationsAdded = true;

            // Send email notification
            const emailSubject = 'Upcoming Itinerary Reminder';
            const emailText = `Dear ${tourist.username},\n\nThis is a reminder that your itinerary "${booking.itinerary.name}" is coming up in ${daysUntilEvent} day(s) on ${eventDate.toLocaleDateString()}.\n\nEnjoy your trip!`;
            const emailHtml = `<h1>Upcoming Itinerary Reminder</h1><p>Dear ${tourist.username},</p><p>This is a reminder that your itinerary <strong>"${booking.itinerary.name}"</strong> is coming up in <strong>${daysUntilEvent} day(s)</strong> on <strong>${eventDate.toLocaleDateString()}</strong>.</p><p>Enjoy your trip!</p>`;

            await sendEmail(tourist.email, emailSubject, emailText, emailHtml);
          }
        }
      }

      // Check activities
      for (const booking of tourist.bookedActivities) {
        if (booking.chosenDate) {
          const eventDate = new Date(booking.chosenDate);
          if (eventDate > now && eventDate <= threeDaysFromNow) {
            const daysUntilEvent = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));
            const notification = {
              message: `Upcoming activity "${booking.activity.name}" in ${daysUntilEvent} day(s) on ${eventDate.toLocaleDateString()}`,
              date: now,
              read: false
            };
            tourist.notifications.push(notification);
            notificationsAdded = true;

            // Send email notification
            const emailSubject = 'Upcoming Activity Reminder';
            const emailText = `Dear ${tourist.username},\n\nThis is a reminder that your activity "${booking.activity.name}" is coming up in ${daysUntilEvent} day(s) on ${eventDate.toLocaleDateString()}.\n\nEnjoy your activity!`;
            const emailHtml = `<h1>Upcoming Activity Reminder</h1><p>Dear ${tourist.username},</p><p>This is a reminder that your activity <strong>"${booking.activity.name}"</strong> is coming up in <strong>${daysUntilEvent} day(s)</strong> on <strong>${eventDate.toLocaleDateString()}</strong>.</p><p>Enjoy your activity!</p>`;

            await sendEmail(tourist.email, emailSubject, emailText, emailHtml);
          }
        }
      }

      // Save if notifications were added
      if (notificationsAdded) {
        await tourist.save();
      }
    }

    res.status(200).json({ message: "Upcoming events checked and notifications added." });
  } catch (error) {
    console.error("Error checking upcoming events:", error);
    res.status(500).json({ message: "Server error while checking upcoming events.", error: error.message });
  }
};

const loginTourist = async (req, res) => {
  const { username, password } = req.body;

  // Check if both username and password are provided
  if (!username || !password) {
    return res.status(400).json({ error: "Username and Password are required" });
  }

  try {
    // Find the tourist by username
    const tourist = await Tourist.findOne({ username });

    // Check if the tourist exists
    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }

    // Validate the password
    if (tourist.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Login successful, return the tourist's ID
    res.status(200).json({ id: tourist._id });
  } catch (error) {
    console.error("Error during tourist login:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const requestNotifyActivity = async (req, res) => {
  const { touristId, activityId } = req.params;

  try {
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    if (activity.notifyRequests.includes(touristId)) {
      return res.status(400).json({ error: 'Tourist already in notify list for this activity' });
    }

    activity.notifyRequests.push(touristId);
    await activity.save();

    res.status(200).json({ message: 'Notification request added successfully for activity' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding notification request for activity', details: error.message });
  }
};

const requestNotifyItinerary = async (req, res) => {
  const { touristId, itineraryId } = req.params;
  const Itinerary = itineraryModel.Itinerary;

  try {
    const itinerary = await Itinerary.findById(itineraryId);
    if (!itinerary) {
      return res.status(404).json({ error: 'Itinerary not found' });
    }

    if (itinerary.notifyRequests.includes(touristId)) {
      return res.status(400).json({ error: 'Tourist already in notify list for this itinerary' });
    }

    itinerary.notifyRequests.push(touristId);
    await itinerary.save();

    res.status(200).json({ message: 'Notification request added successfully for itinerary' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding notification request for itinerary', details: error.message });
  }
};


// Fetch all notifications for a tourist
const getNotifications = async (req, res) => {
  const { id } = req.params;

  try {
    const tourist = await Tourist.findById(id);
    if (!tourist) {
      return res.status(404).json({ error: 'Tourist not found' });
    }

    res.status(200).json({ notifications: tourist.notifications });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching notifications', details: error.message });
  }
};

// Get the count of unread notifications for a tourist
const getNotificationCount = async (req, res) => {
  const { id } = req.params;

  try {
    const tourist = await Tourist.findById(id);
    if (!tourist) {
      return res.status(404).json({ error: 'Tourist not found' });
    }

    const unreadCount = tourist.notifications.filter(notification => !notification.read).length;
    res.status(200).json({ count: unreadCount });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching notification count', details: error.message });
  }
};

// Mark a notification as read
const markNotificationAsRead = async (req, res) => {
  const { touristId, notificationId } = req.params;

  try {
    const tourist = await Tourist.findById(touristId);
    if (!tourist) {
      return res.status(404).json({ error: 'Tourist not found' });
    }

    const notification = tourist.notifications.id(notificationId);
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    notification.read = true;
    await tourist.save();

    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ error: 'Error marking notification as read', details: error.message });
  }
};

const addToWishList= async(req,res) => {
  const{touristId,productId}=req.params;
  try{
    const tourist = await Tourist.findById(touristId);
    tourist.WishList.push(productId);
    await tourist.save();
  
  res.status(200).json({ message: 'Product added to wish list' });
  }
  catch(error){
    res.status(500).json({ error: 'Error adding product to wish list', details: error.message });
  }

}

const getWishList = async (req, res) => {
  const { id } = req.params;
  try {
    const tourist = await Tourist.findById(id); // Correct method for fetching a document by ID
    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }
    res.status(200).json({ wishList: tourist.WishList }); // Correctly referencing wishList
  } catch (error) {
    res.status(500).json({ error: "Error getting wish list", details: error.message });
  }
};

const deleteFromWishlist = async (req, res) => {
  const{touristId,productId}=req.params;

  try {
    // Find the tourist
    const tourist = await Tourist.findById(touristId);
    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found" });
    }

    // Check if the wishlist item exists
    const wishlistItemIndex = tourist.WishList.findIndex(item => item._id.toString() === productId);
    if (wishlistItemIndex === -1) {
      return res.status(404).json({ error: "Wishlist item not found" });
    }

    // Remove the item from the wishlist
    tourist.WishList.splice(wishlistItemIndex, 1); // Remove the item by its index
    await tourist.save();

    res.status(200).json({ message: "Item successfully removed from wishlist" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting item from wishlist", details: error.message });
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
  getAllTransportations,
  getTransportation,
  bookTransportation,
  addProductToCart,
  removeProductFromCart,
  changeCartItemQuantity,
  viewCart,
  buyCart,
  getAddresses,
  addAddress,
  updateAddress,
  selectAddress,
  unselectAddress,
  deleteAddress,
  deleteAllAddresses,
  viewAllOrders,
  viewOrderDetails,
  cancelOrder,
  updateWallet,
  stripePayIntentFlight,
  stripePayIntentHotel,
  stripePayIntentItinerary,
  stripePayIntentActivity,
  stripePayIntentProduct,
  checkBookmarkActivity,
  checkBookmarkItinerary,
  getBookmarks,
  removeActivityBookmark,
  removeItineraryBookmark,
  bookmarkActivity,
  bookmarkItinerary,
  frontendDataTable,
  getNotificationsTourist,
  checkUpcomingEvents,
  sendEmail,
  loginTourist,
  bookmarkItinerary,
  bookmarkActivity,
  removeItineraryBookmark,
  removeActivityBookmark,
  getBookmarks,
  checkBookmarkItinerary,
  checkBookmarkActivity,
  requestNotifyActivity,
  requestNotifyItinerary,
  getNotifications,
  getNotificationCount,
  markNotificationAsRead,
  addToWishList,
  getWishList,
  deleteFromWishlist,

};
