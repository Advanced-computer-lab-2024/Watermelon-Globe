const mongoose = require("mongoose");
const itineraryModel = require("../Models/itineraryModel.js");
const tourGuide = require("../Models/tourGuideModel.js");

const createTourGuide = async (req, res) => {
  const {
    name,
    username,
    email,
    password,
    mobileNumber,
    nationality,
    yearsOfExperience,
    itineraries,
  } = req.body;
  console.log(req.body);
  try {
    const existingGuide = await tourGuide.findOne({ email });
    if (existingGuide) {
      return res
        .status(400)
        .json({ message: "Tour guide with this email already exists" });
    }
    const newTourGuide = await tourGuide.create({
      name,
      username,
      email,
      password,
      mobileNumber,
      nationality,
      yearsOfExperience,
      itineraries,
    });
    // const savedTourGuide = await newTourGuide.save();
    res.status(201).json(newTourGuide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTourGuide = async (req, res) => {
  try {
    const { id } = req.params;

    // Query the database based on search criteria
    const retrievedTourGuide = await tourGuide.findById(id);

    // Check if results are found
    if (retrievedTourGuide.length === 0) {
      return res
        .status(404)
        .json({ message: "No tour guide found matching the id" });
    }

    res.status(200).json(retrievedTourGuide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllGuides = async (req, res) => {
  try {
    // Fetch all itineraries, populating the 'guide' field to get tour guide details
    const guide = await tourGuide.find({}).sort({ createdAt: -1 });

    // If no itineraries found, return a message
    if (!guide.length) {
      return res.status(404).json({ message: "No guides found" });
    }

    // Send the itineraries as a response
    res.status(200).json(guide);
  } catch (error) {
    // Catch and handle any errors
    res.status(500).json({ error: error.message });
  }
};

const updateTourGuide = async (req, res) => {
  const { id } = req.params; // Extracting the site ID from request parameters
  const {
    name,
    username,
    email,
    password,
    mobileNumber,
    nationality,
    yearsOfExperience,
    itineraries,
  } = req.body;
  console.log(req.body);
  try {
    const updatedTourGuide = await tourGuide.findByIdAndUpdate(
      id,
      {
        name,
        username,
        email,
        password,
        mobileNumber,
        nationality,
        yearsOfExperience,
        itineraries,
      },
      { new: true, runValidators: true }
    );

    if (!updatedTourGuide) {
      return res.status(404).json({ message: "Tour guide not found" });
    }

    res.status(200).json(updatedTourGuide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createItinerary = async (req, res) => {
    const { name, activities,tag,locations, timeline, languageOfTour, priceOfTour, availableDates, availableTimes,
        accessibility, pickupDropoffLocations, bookings,rating, guide: guideId} = req.body;
        console.log(req.body)
        console.log(tag)
        try {
            const itinerary = await itineraryModel.Itinerary.create({ name, activities, tag, locations,
                timeline, languageOfTour, priceOfTour, availableDates, availableTimes, accessibility, 
                pickupDropoffLocations, bookings, guide: guideId});

    res.status(200).json(itinerary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getMyItineraries = async (req, res) => {
  const { guideID } = req.query; // Extract the Governor ID from the request parameters

  // Validate if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(guideID)) {
    return res.status(400).json({ error: "Invalid guide ID" });
  }

  try {
    // Find the tourism site by ID and populate the tourismGovernor field
    const site = await itineraryModel.Itinerary.find({ guide: guideID })
      .populate("activities")
      .populate("guide");

    // If no site is found, return a 404 error
    if (!site) {
      return res.status(404).json({ message: "Site not found" });
    }

    // Return the found site as a response
    res.status(200).json(site);
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ error: error.message });
  }
};

const getAllItineraries = async (req, res) => {
  try {
    // Fetch all itineraries, populating the 'guide' field to get tour guide details
    const itineraries = await itineraryModel.Itinerary.find({})
      .sort({ createdAt: -1 })
      .populate("activities")
      .populate("guide");

    // If no itineraries found, return a message
    if (!itineraries.length) {
      return res.status(404).json({ message: "No itineraries found" });
    }

    // Send the itineraries as a response
    res.status(200).json(itineraries);
  } catch (error) {
    // Catch and handle any errors
    res.status(500).json({ error: error.message });
  }
};

const getItineraryById = async (req, res) => {
  const { id } = req.params; // Get the itinerary ID from the request parameters

  try {
    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid itinerary ID" });
    }

    // Find the itinerary by ID and populate the guide details
    const itinerary = await itineraryModel.Itinerary.findById(id)
      .populate("activities")
      .populate("guide");

    // If the itinerary is not found, return a 404 error
    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    // Return the found itinerary
    res.status(200).json(itinerary);
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ error: error.message });
  }
};
const updateItinerary = async (req, res) => {
  const { id } = req.params; // Extracting the site ID from request parameters
  const {
    name,
    activities,
    tag,
    locations,
    timeline,
    languageOfTour,
    priceOfTour,
    availableDates,
    availableTimes,
    accessibility,
    pickupDropoffLocations,
    bookings,
    guide: guideId,
  } = req.body; // Extracting the updated fields from request body

  // Validate the site ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Itinerary ID" });
  }

  try {
    // Find the Itinerary by ID and update it with the new details
    const updatedItinerary = await itineraryModel.Itinerary.findByIdAndUpdate(
      id,
      {
        name,
        activities,
        tag,
        locations,
        timeline,
        languageOfTour,
        priceOfTour,
        availableDates,
        availableTimes,
        accessibility,
        pickupDropoffLocations,
        bookings,
        guide: guideId,
      }, // Updating the fields
      { new: true, runValidators: true } // Option to return the updated site and run validation
    );

    // If the Itinerary is not found, return a 404
    if (!updatedItinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    // Send the updated site as a response
    res.status(200).json(updatedItinerary);
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ error: error.message });
  }
};

const deleteItineraryById = async (req, res) => {
  const { id } = req.params; // Extract itinerary ID from request parameters

  try {
    const foundItinerary = await itineraryModel.Itinerary.findById(id);

    if (foundItinerary.bookings) {
      return res.status(400).json({
        error: "Booking have been made! You cannot delete this itinerary!",
      });
    }
    const deletedItinerary = await itineraryModel.Itinerary.findByIdAndDelete(
      id
    );

    if (!deletedItinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    res.status(200).json({ deletedItinerary });
  } catch (error) {
    res.status(500).json({ message: "Error deleting itinerary", error });
  }
};

const sortByRatings = async (req, res) => {
  try {
    // Fetch and sort itineraries by rating in descending order (highest to lowest)
    const sortedItineraries = await itineraryModel.Itinerary.find().sort({
      Rating: -1,
    });

    return res.status(200).json(sortedItineraries);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error sorting itineraries by rating", error });
  }
};

const sortByPrice = async (req, res) => {
  try {
    // Fetch and sort itineraries by price in ascending order (lowest to highest)
    const sortedItineraries = await itineraryModel.Itinerary.find().sort({
      priceOfTour: 1,
    });

    return res.status(200).json(sortedItineraries);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error sorting itineraries by price", error });
  }
};

const filterItineraries = async (req, res) => {
  const { startDate, endDate, languageOfTour, minPrice, maxPrice } = req.query; // Expecting date strings, a language string, and price parameters

  try {
    // Convert strings to Date objects if provided
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    // Parse minPrice and maxPrice to numbers, if provided
    const min = minPrice ? parseFloat(minPrice) : null;
    const max = maxPrice ? parseFloat(maxPrice) : null;

    // Find all itineraries
    const itineraries = await itineraryModel.Itinerary.find({});

    // Filter itineraries based on availableDates, languageOfTour, and price
    const filteredItineraries = itineraries.filter((itinerary) => {
      // Check if any date in availableDates is within the specified range, if startDate and endDate are provided
      const dateInRange =
        start && end
          ? itinerary.availableDates.some(
              (date) => date >= start && date <= end
            )
          : true; // If no date range is specified, consider all dates

      // Check if the specified language is included in the languageOfTour
      const languageMatch = languageOfTour
        ? itinerary.languageOfTour.includes(languageOfTour)
        : true;

      // Check if the price falls within the specified range
      const priceMatch =
        (min === null || itinerary.priceOfTour >= min) &&
        (max === null || itinerary.priceOfTour <= max);

      return dateInRange && languageMatch && priceMatch; // Return true if all conditions are satisfied
    });

    if (filteredItineraries.length === 0) {
      return res.status(404).json({
        message: "No itineraries found matching the specified criteria.",
      });
    }

    return res.status(200).json(filteredItineraries);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error filtering itineraries.", error });
  }
};

const filterByPreferenceItineraries = async (req, res) => {
  try {
    const { id } = req.params; // Get the tag from the request parameters
    console.log(id);

    // Find itineraries (or sites) that include the tag
    const filteredItineraries = await itineraryModel.Itinerary.find({
      tag: id, // Assuming 'Tags' is an array of ObjectId references to the 'Tag' model
    }).populate("tag"); // Optionally populate the tags with details
    // Send back the filtered itineraries
    // if (filteredSites.length === 0) {
    //   return res.status(404).json({ message: 'No sites found with the specified tag' });
    // }

    return res.status(200).json(filteredItineraries);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error filtering itineraries by tag", error });
  }
};

// activate / deactivate itinerary
const activateItineraryAccessibility = async (req, res) => {
  const { id } = req.params; // Get itinerary ID from request parameters

  try {
    // Update accessibility to true
    const updatedItinerary = await itineraryModel.Itinerary.findByIdAndUpdate(
      id,
      { accessibility: true },
      { new: true }
    );

    if (!updatedItinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    res.status(200).json(updatedItinerary);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error activating accessibility: " + error.message });
  }
};

const deactivateItineraryAccessibility = async (req, res) => {
  const { id } = req.params; // Get itinerary ID from request parameters

  try {
    // Update accessibility to false
    const updatedItinerary = await itineraryModel.Itinerary.findByIdAndUpdate(
      id,
      { accessibility: false },
      { new: true }
    );

    if (!updatedItinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    res.status(200).json(updatedItinerary);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deactivating accessibility: " + error.message });
  }
};

//accept terms and conditions

const acceptTermsAndConditions = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTourGuide = await tourGuide.findByIdAndUpdate(
      id,
      { termsAndConditions: true },
      { new: true }
    );

    if (!updatedTourGuide) {
      return res.status(404).json({ message: "Tour Guide not found" });
    }

    res.status(200).json(updatedTourGuide);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating terms and conditions: " + error.message });
  }
};

const changePasswordTourGuide = async (req, res) => {
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
    const tourguide = await TourGuide.findOne({ _id: id });

    if (!tourguide) {
      return res.status(404).json({ error: "tourguide not found" }); // Tourist not found
    }

    // Compare the old password directly
    if (tourguide.password !== oldPassword) {
      return res.status(401).json({ error: "Wrong old password" }); // Use 401 for unauthorized access
    }

    // Check if new passwords match
    if (newPassword !== newPasswordConfirmed) {
      return res
        .status(400)
        .json({ error: "New password and confirmed password do not match" });
    }

    // Update the password directly
    tourguide.password = newPassword;
    await tourguide.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const requestDeletionGuide = async (req, res) => {
  try {
      const { id } = req.params;

      // Find the guide by ID and update the deletionRequest to "Pending"
      const guide = await TourGuide.findByIdAndUpdate(
          id,
          { deletionRequest: "Pending" },
          { new: true } // Return the updated document
      );

      if (!guide) {
          return res.status(404).json({ message: 'Guide not found' });
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

module.exports = {
  createItinerary,
  getAllItineraries,
  getItineraryById,
  updateItinerary,
  deleteItineraryById,
  createTourGuide,
  getTourGuide,
  getAllGuides,
  updateTourGuide,
  getMyItineraries,
  sortByPrice,
  sortByRatings,
  filterItineraries,
  changePasswordTourGuide,
  filterByPreferenceItineraries,
  activateItineraryAccessibility,
  deactivateItineraryAccessibility,
  acceptTermsAndConditions,
  requestDeletionGuide
};
