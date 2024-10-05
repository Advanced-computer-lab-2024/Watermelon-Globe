const Tourist = require("../Models/touristModel");
const mongoose = require("mongoose");
const itineraryModel = require ("../Models/itinerary");
const Itinerary = require("../Models/itinerary");

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

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such tourist" });
  }

  // Define the fields that should not be updated
  const restrictedFields = ["username", "dob", "wallet"];

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

  const tourist = await Tourist.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!tourist) {
    return res.status(400).json({ error: "No such tourist" });
  }
  res.status(200).json(tourist);
};

// const updateRating = async (req, res) => {
//   try {
//       const { id } = req.params; 
//       const { rating } = req.query; // Ensure rating is parsed as a number
//       console.log(rating);
//       const numericRating = Number(rating);
      
//       // Find the itinerary by ID
//       const itinerary = await itineraryModel.findById(id);
      
//       if (!itinerary) {
//           return res.status(404).json({ message: 'Itinerary not found' });
//       }

//       // Ensure the rating is valid
//       if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
//           return res.status(400).json({ message: 'Invalid rating. Rating should be between 1 and 5.' });
//       }

//       // Update the rating attributes
//       itinerary.noOfRatings += 1; // Increment the number of ratings
//       itinerary.ratingsSum += numericRating; // Add the new rating to the sum

//       // Calculate the new average rating
//       itinerary.rating = itinerary.ratingsSum / itinerary.noOfRatings;

//       // Save the updated itinerary
//       await itinerary.save();

//       return res.status(200).json({ message: 'Rating updated successfully', averageRating: itinerary.averageRating });
//   } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Server error' });
//   }
// };


module.exports = {
  createTourist,
  getTourists,
  getTourist,
  deleteTourist,
  updateTourist,
  //updateRating
};
