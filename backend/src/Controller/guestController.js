// #Task route solution
const touristModel = require("../Models/touristModel");
const tourguideModel = require("../Models/tourGuideModel");
const sellerModel = require("../Models/SellerModel");
const advertiserModel = require("../Models/advertiserModel");
const itineraryModel = require("../Models/itineraryModel");
const activityModel = require("../Models/activityModel");

const { default: mongoose } = require("mongoose");

//Tourist
const createTourist = async (req, res) => {
  try {
    // Destructure the required fields from req.body
    const {
      username,
      email,
      password,
      mobileNumber,
      nationality,
      dob,
      status,
    } = req.body;

    // Create a new tourist instance and save to the database
    const newTourist = await touristModel.create({
      username,
      email,
      password,
      mobileNumber,
      nationality,
      dob,
      status,
      wallet: 0,
    });

    // Send the newly created tourist as a response
    res.status(200).json(newTourist);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: error.message });
  }
};
// update a tourist
const updateTourist = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  // Validate the ID format
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

  // Update the tourist and return the updated document
  const tourist = await touristModel.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true, runValidators: true } // 'new: true' returns the updated document
  );

  // Check if the tourist was found and updated
  if (!tourist) {
    return res.status(404).json({ error: "No such tourist" });
  }

  // Return the updated tourist data
  res.status(200).json(tourist);
};

//Tour Guide
const createTourguide = async (req, res) => {
  try {
    // Destructure the name, email, and age from req.body
    const { username, email, password } = req.body;

    // Validate if all fields are present
    // if (!Username||!Email||!Password) {
    //   return res.status(400).json({ message: 'All fields are required: name,email,password.' });
    // }

    // Create a new user instance and save to the database
    const NewTourguide = await tourguideModel.create({
      username,
      email,
      password,
    });

    //  await (await NewTourguide).save();
    // Send the newly created user as a response
    res.status(201).json(NewTourguide);
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors
  }
};
const getItineraryDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const itinerary = await itineraryModel.findById(id); // Await the Promise

    if (!itinerary) {
      // Check for null/undefined after awaiting
      return res.status(404).json({ message: "Itinerary not found" }); // Change to 404 for not found
    }

    res.status(200).json(itinerary); // Respond with the itinerary
  } catch (error) {
    console.error("Error fetching itinerary:", error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" }); // Handle any errors
  }
};

//sort
const filterItineraryRating = async (req, res) => {
  const { rating } = req.query;

  // Check if authorId is provided

  try {
    // Find all blogs that have the same authorId
    const Itineraries = await itineraryModel.find({ rating: rating });

    // If no blogs found, send a 404 response
    if (Itineraries.length === 0) {
      return res.status(404).json({ message: "No itineray has this rating ." });
    }

    // Send the blogs as a response
    return res.status(200).json(Itineraries);
  } catch (error) {
    // Handle any potential errors
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while filtering blogs." });
  }
};

//Advertiser
const createAdvertiser = async (req, res) => {
  try {
    // Destructure the name, email, and age from req.body
    const { Username, Email, Password } = req.body;

    // Validate if all fields are present
    if (!Username || !Email || !Password) {
      return res
        .status(400)
        .json({ message: "All fields are required: name, email,password." });
    }

    // Create a new user instance and save to the database
    const NewAdvertiser = advertiserModel.create({
      Username,
      Email,
      Password,
    });

    await (await NewAdvertiser).save();
    // Send the newly created user as a response
    res.status(201).json(NewAdvertiser);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.loge(error.message); // Handle any errors
  }
};

const getActivityDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const activity = await activityModel.findById(id); // Await the Promise

    if (!activity) {
      // Check for null/undefined after awaiting
      return res.status(404).json({ message: "Activity not found" }); // Change to 404 for not found
    }

    res.status(200).json(activity); // Respond with the itinerary
  } catch (error) {
    console.error("Error fetching activity:", error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" }); // Handle any errors
  }
};
const getActivities = async (req, res) => {
  try {
    const activities = await activityModel
      .find({})
      .populate("Tags") // Populate the tags field with actual Tag data
      .populate("Advertiser"); // Populate the Advertiser field with the corresponding CompanyProfile data

    res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({
      message: "Error fetching activities",
      error: error.message,
    });
  }
};

// filter by Budget
const filterActivityByBudget = async (req, res) => {
  const { priceRange } = req.query;

  // Validate query parameter
  if (!priceRange) {
    return res.status(400).json({ error: "Price range is required." });
  }

  // Parse the price range (assuming it's passed as a comma-separated string)
  const [minPrice, maxPrice] = priceRange.split(",").map(Number);

  // Validate min and max prices
  if (isNaN(minPrice) || isNaN(maxPrice)) {
    return res.status(400).json({ error: "Invalid price range." });
  }

  try {
    const activities = await Activity.find({
      "priceRange.min": { $gte: minPrice },
      "priceRange.max": { $lte: maxPrice },
    });

    return res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//Seller
const createSeller = async (req, res) => {
  try {
    // Destructure the name, email, and age from req.body
    const { Username, Email, Password } = req.body;

    // Validate if all fields are present
    if (!Username || !Email || !Password) {
      return res
        .status(400)
        .json({ message: "All fields are required: username,email,password." });
    }

    // Create a new user instance and save to the database
    const NewSeller = sellerModel.create({
      Username,
      Email,
      Password,
    });

    await (await NewSeller).save();
    // Send the newly created user as a response
    res.status(201).json(NewSeller);
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors
  }
};

const getTourists = async (req, res) => {
  try {
    // Assuming User is a Mongoose model
    const tourguids = await touristModel.find(); // This will retrieve all users
    res.status(200).json(tourguids); // Send the users data as JSON
  } catch (error) {
    res.status(500).json({ message: error.message });
    // Handle any errors
  }
};

const filterItineraryByBudget = async (req, res) => {
  const { minPrice, maxPrice } = req.query;

  try {
    // Validate that minPrice and maxPrice are provided
    if (!minPrice || !maxPrice) {
      return res
        .status(400)
        .json({ message: "Please provide both minPrice and maxPrice." });
    }

    // Query to find itineraries within the price range
    const itineraries = await itineraryModel.find({
      priceOfTour: { $gte: Number(minPrice), $lte: Number(maxPrice) },
    });

    if (itineraries.length === 0) {
      return res
        .status(404)
        .json({
          message: "No itineraries found within the given budget range.",
        });
    }

    res.status(200).json(itineraries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const filterItineraries = async (req, res) => {
  const { startDate, endDate, languageOfTour, minPrice, maxPrice } = req.query; // Expecting date strings, a language string, and price parameters
  console.lo;
  try {
    // Convert strings to Date objects if provided
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    // Parse minPrice and maxPrice to numbers, if provided
    const min = minPrice ? parseFloat(minPrice) : null;
    const max = maxPrice ? parseFloat(maxPrice) : null;

    // Find all itineraries
    const itineraries = await itineraryModel.find();

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

const filterByLanguage = async (req, res) => {
  try {
    const { languageOfTour } = req.query;

    // Ensure that languageOfTour is provided
    if (!languageOfTour) {
      return res
        .status(400)
        .json({ message: "Please provide a language to filter by." });
    }

    // Construct the query to check if the language is in the array
    const query = { languageOfTour: { $in: [languageOfTour] } };

    // Find itineraries where the language is present in the languageOfTour array
    const filteredItineraries = await itineraryModel.find();

    if (filteredItineraries.length === 0) {
      return res.status(404).json({
        message: `No itineraries found for language: ${languageOfTour}`,
      });
    }

    return res.status(200).json(filteredItineraries);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error filtering itineraries by language", error });
  }
};

const filterByDate = async (req, res) => {
  const { startDate, endDate } = req.query; // Expecting date strings in ISO format

  // Validate that both startDate and endDate are provided
  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ message: "Please provide both startDate and endDate." });
  }

  try {
    // Convert strings to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Find all itineraries
    const itineraries = await itineraryModel.find();

    // Filter itineraries based on availableDates
    const filteredItineraries = itineraries.filter((itinerary) =>
      itinerary.availableDates.some((date) => date >= start && date <= end)
    );

    if (filteredItineraries.length === 0) {
      return res.status(404).json({
        message: "No itineraries found within the specified date range.",
      });
    }

    return res.status(200).json(filteredItineraries);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error filtering itineraries by date.", error });
  }
};

//Get accessible/notAccessible itineraries
const getAccessibleItineraries = async (req, res) => {
  try {
    // Find itineraries where accessibility is true
    const accessibleItineraries = await itineraryModel.Itinerary.find({
      accessibility: true,
    });

    if (accessibleItineraries.length === 0) {
      return res
        .status(404)
        .json({ message: "No accessible itineraries found" });
    }

    res.status(200).json(accessibleItineraries);
  } catch (error) {
    res.status(500).json({
      error: "Error retrieving accessible itineraries: " + error.message,
    });
  }
};

const getNotAccessibleItineraries = async (req, res) => {
  try {
    // Find itineraries where accessibility is true
    const accessibleItineraries = await itineraryModel.Itinerary.find({
      accessibility: false,
    });

    if (accessibleItineraries.length === 0) {
      return res
        .status(404)
        .json({ message: "No accessible itineraries found" });
    }

    res.status(200).json(accessibleItineraries);
  } catch (error) {
    res.status(500).json({
      error: "Error retrieving accessible itineraries: " + error.message,
    });
  }
};

module.exports = {
  createSeller,
  createAdvertiser,
  createTourguide,
  createTourist,
  getTourists,
  getActivities,
  getItineraryDetails,
  getActivityDetails,
  getAccessibleItineraries,
  getNotAccessibleItineraries,
  filterItineraryRating,
  filterItineraryByBudget,
  filterActivityByBudget,
  filterItineraries,
  filterByLanguage,
  filterByDate,
  updateTourist,
};
