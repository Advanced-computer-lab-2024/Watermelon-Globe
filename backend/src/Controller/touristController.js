const Tourist = require("../Models/touristModel");
const mongoose = require("mongoose");
const itineraryModel = require("../Models/itineraryModel");

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

module.exports = {
  createTourist,
  getTourists,
  getTourist,
  deleteTourist,
  updateTourist,
  updateRating,
};
