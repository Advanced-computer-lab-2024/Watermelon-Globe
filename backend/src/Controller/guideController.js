const multer = require("multer");
const path = require("path");
const fs = require('fs');
const mongoose = require("mongoose");
const itineraryModel = require("../Models/itineraryModel.js");
const tourGuide = require("../Models/tourGuideModel.js");
const ChildItinerary = require("../Models/touristItineraryModel.js");
const Tourist = require('../Models/touristModel'); 


//for frontend
const frontendGuidesTable = async (req, res) => {
  try {
    // Fetch only sellers with 'accepted' status from the database
    const sellers = await tourGuide.find(
      { status: "accepted" },
      "username email status"
    );

    // Format the data
    const formattedData = sellers.map((seller) => ({
      id: seller._id,
      name: seller.username,
      email: seller.email,
      status: seller.status,
    }));

    // Send the response
    res.status(200).json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching sellers" });
  }
};
const frontendPendingGuidesTable = async (req, res) => {
  try {
    // Fetch only sellers with 'pending' status from the database
    const sellers = await tourGuide.find(
      { status: "pending" },
      "username email status"
    );

    // Format the data
    const formattedData = sellers.map((seller) => ({
      id: seller._id,
      name: seller.username,
      email: seller.email,
      status: seller.status,
    }));

    // Send the response
    res.status(200).json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching pending sellers" });
  }
};

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
    const retrievedTourGuide = await tourGuide
      .findById(id)
      .populate("itineraries");

    // Check if results are found
    if (retrievedTourGuide.length == 0) {
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

const updateTourGuideNew = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  console.log(id);
  console.log(updateData);

  try {
    const updatedGuide = await tourGuide.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules apply
    });

    if (!updatedGuide) {
      return res.status(404).send("Tour guide not found");
    }

    res.status(200).json(updatedGuide);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Error updating product");
  }
};

const createItinerary = async (req, res) => {
  const { id } = req.params;
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
  } = req.body;

  try {
    const tourguide = await TourGuide.findById(id);

    if (!tourguide) {
      return res.status(404).json({ error: "Tour guide not found" });
    }

    const itineraryData = {
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
      guide: id,
    };

    // If a file was uploaded, add the file path to the itinerary data
    if (req.file) {
      itineraryData.picture = req.file.path;
    }

    const itinerary = await Itinerary.create(itineraryData);
    
    tourguide.itineraries.push(itinerary._id);
    await tourguide.save();

    res.status(200).json(itinerary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//itinerary photo

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Error: File upload only supports the following filetypes - " + filetypes));
  },
  limits: {
    fileSize: 1024 * 1024 // 1MB
  }
});

const uploadMiddleware = upload.single('picture');

const uploadPicture = async (req, res) => {
  uploadMiddleware(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: "Multer error: " + err.message });
    } else if (err) {
      return res.status(500).json({ error: "Unknown error: " + err.message });
    }

    const { id } = req.query;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    try {
      const itinerary = await Itinerary.findById(id);

      if (!itinerary) {
        fs.unlinkSync(req.file.path);
        return res.status(404).json({ error: "No itinerary found with this ID" });
      }

      if (itinerary.picture) {
        const oldPicturePath = path.join(__dirname, '..', 'uploads', itinerary.picture);
        if (fs.existsSync(oldPicturePath)) {
          fs.unlinkSync(oldPicturePath);
        }
      }

      itinerary.picture = req.file.filename;
      await itinerary.save();

      res.status(200).json({ 
        message: "Itinerary picture updated successfully", 
        itinerary: {
          id: itinerary._id,
          name: itinerary.name,
          picture: itinerary.picture
        }
      });
    } catch (error) {
      console.error(error);
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      res.status(500).json({ error: "An error occurred while updating the itinerary picture" });
    }
  });
};

// // Controller to fetch itineraries for a specific tour guide
// const getMyItineraries = async (req, res) => {
//   // const { guideID } = req.params.id; // Extract guide ID from URL parameters

//   // // Check if the provided ID is a valid MongoDB ObjectId
//   // if (!mongoose.Types.ObjectId.isValid(guideID)) {
//   //   return res.status(400).json({ error: "Invalid guide ID" });
//   // }

//   // try {
//   //   // Fetch all itineraries that belong to the guide and populate 'activities' and 'guide'
//   //   const itineraries = await itineraryModel.Itinerary.find({ guide: guideID })
//   //     .populate("activities") // Populates activities linked to the itinerary
//   //     .populate("guide"); // Populates the guide details

//   //   // If no itineraries are found, return a 404 error
//   //   if (!itineraries || itineraries.length === 0) {
//   //     return res
//   //       .status(404)
//   //       .json({ message: "No itineraries found for this guide" });
//   //   }

//   //   // Return the itineraries as a response
//   //   res.status(200).json(itineraries);
//   // } catch (error) {
//   //   // Handle any server errors
//   //   console.error("Error fetching itineraries:", error.message);
//   //   res.status(500).json({ error: "Server error, please try again later." });
//   // }
//   try {
//     const guideId = req.params.id;

//     // Fetch the guide with their itineraries populated
//     const guide = await tourGuide
//       .findById(guideId)
//       .populate("itineraries") // Populate the itineraries array
//       .exec();

//     if (!guide) {
//       return res.status(404).json({ message: "Tour guide not found" });
//     }

//     // Return the itineraries
//     res.status(200).json({
//       success: true,
//       itineraries: guide.itineraries,
//     });
//   } catch (error) {
//     console.error("Error fetching itineraries:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

const getAllItineraries = async (req, res) => {
  try {
    // Fetch all itineraries, populating the 'guide' field to get tour guide details
    const itineraries = await itineraryModel.Itinerary.find({})
      .sort({ createdAt: -1 })
      .populate("activities")
      .populate("guide");
    // Populate 'tag' with 'name' and 'description'

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

// API to fetch itineraries by guide id
const getMyItineraries = async (req, res) => {
  const { guideId } = req.params; // Extract the guideId from route parameters

  try {
    // Fetch itineraries where guide matches guideId
    const itineraries = await itineraryModel.Itinerary.find({
      Advertiser: guideId,
    })
      .populate("activities") // Optionally populate activities
      .populate("tag") // Optionally populate tags
      .populate("pickupDropoffLocations"); // Optionally populate pickup/dropoff details

    // If no itineraries found
    if (!itineraries || itineraries.length === 0) {
      return res
        .status(404)
        .json({ message: "No itineraries found for this guide" });
    }

    // Return the itineraries as a JSON response
    res.status(200).json(itineraries);
  } catch (error) {
    console.error("Error fetching itineraries:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
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

const deleteItinerary2 = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid itinerary ID" });
    }

    // Find the itinerary
    const itinerary = await itineraryModel.Itinerary.findById(id);

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    // Check if the itinerary has any bookings
    if (itinerary.bookings && itinerary.bookings.length > 0) {
      return res
        .status(400)
        .json({ message: "Cannot delete itinerary with active bookings" });
    }

    // Remove the itinerary from the tour guide's itineraries array
    await tourGuide.findByIdAndUpdate(itinerary.guide, {
      $pull: { itineraries: id },
    });

    // Delete the itinerary
    await itineraryModel.Itinerary.findByIdAndDelete(id);

    res.status(200).json({ message: "Itinerary deleted successfully" });
  } catch (error) {
    console.error("Error deleting itinerary:", error);
    res.status(500).json({ error: "Server error" });
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
    ).populate("notifyRequests");

    if (!updatedItinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    // Add notification to all tourists who requested to be notified
    const notificationMessage = `The itinerary "${updatedItinerary.name}" is now available for booking.`;
    const notificationPromises = updatedItinerary.notifyRequests.map(
      (touristId) =>
        Tourist.findByIdAndUpdate(
          touristId,
          { $push: { notifications: notificationMessage } },
          { new: true }
        )
    );

    await Promise.all(notificationPromises);

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
    const tourguide = await tourGuide.findOne({ _id: id });

    if (!tourguide) {
      return res.status(404).json({ error: "tour guide not found" }); // Tourist not found
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
    const guide = await tourGuide.findByIdAndUpdate(
      id,
      { deletionRequest: "Pending" },
      { new: true } // Return the updated document
    );

    if (!guide) {
      return res.status(404).json({ message: "Guide not found" });
    }

    res.status(200).json({
      message: "Deletion request updated successfully",
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
    const tourguide = await tourGuide.findById(id);
    console.log(tourguide);
    if (!tourguide) {
      res.status(400).json({ message: "tourguide is not found" });
    } else {
      res.status(200).json(tourguide.password);
    }
  } catch {
    console.error("Error getting password:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const filterSalesReport = async (req, res) => {
  const { guideId, activity, itinerary, startDate, endDate, month } = req.query;

  try {
    const guide = await tourGuide.findById(guideId).populate("sales.itinerary");
    if (!guide) {
      return res.status(404).json({ message: "Tour guide not found" });
    }

    let filteredSales = guide.sales;

    if (activity) {
      filteredSales = filteredSales.filter(
        (sale) => sale.activity === activity
      );
    }

    if (itinerary) {
      filteredSales = filteredSales.filter(
        (sale) => sale.itinerary && sale.itinerary._id.toString() === itinerary
      );
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filteredSales = filteredSales.filter(
        (sale) => sale.date >= start && sale.date <= end
      );
    } else if (month) {
      const [year, monthIndex] = month.split("-");
      filteredSales = filteredSales.filter((sale) => {
        const saleDate = new Date(sale.date);
        return (
          saleDate.getFullYear() === parseInt(year) &&
          saleDate.getMonth() === parseInt(monthIndex) - 1
        );
      });
    }

    const totalSales = filteredSales.reduce(
      (sum, sale) => sum + sale.amount,
      0
    );

    res.status(200).json({ filteredSales, totalSales });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error filtering sales report", error: error.message });
  }
};

const filterTouristNumbers = async (req, res) => {
  const { guideId, activity, itinerary, startDate, endDate, month } = req.query;

  try {
    const guide = await tourGuide
      .findById(guideId)
      .populate("touristCounts.itinerary");
    if (!guide) {
      return res.status(404).json({ message: "Tour guide not found" });
    }

    let filteredCounts = guide.touristCounts;

    if (activity) {
      filteredCounts = filteredCounts.filter(
        (count) => count.activity === activity
      );
    }

    if (itinerary) {
      filteredCounts = filteredCounts.filter(
        (count) =>
          count.itinerary && count.itinerary._id.toString() === itinerary
      );
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filteredCounts = filteredCounts.filter(
        (count) => count.date >= start && count.date <= end
      );
    } else if (month) {
      const [year, monthIndex] = month.split("-");
      filteredCounts = filteredCounts.filter((count) => {
        const countDate = new Date(count.date);
        return (
          countDate.getFullYear() === parseInt(year) &&
          countDate.getMonth() === parseInt(monthIndex) - 1
        );
      });
    }

    const totalTourists = filteredCounts.reduce(
      (sum, count) => sum + count.count,
      0
    );

    res.status(200).json({ filteredCounts, totalTourists });
  } catch (error) {
    res.status(500).json({
      message: "Error filtering tourist numbers",
      error: error.message,
    });
  }
};

// const deleteTourGuide = async (req, res) => {
//   const { id } = req.params;

//   try {
//     // Find the tour guide
//     const guide = await tourGuide.findById(id);

//     if (!guide) {
//       return res.status(404).json({ message: "Tour guide not found" });
//     }

//     // Check if the guide has any active itineraries or bookings
//     const activeItineraries = await itineraryModel.Itinerary.find({
//       guide: id,
//       bookings: { $exists: true, $not: { $size: 0 } },
//     });

//     if (activeItineraries.length > 0) {
//       return res.status(400).json({
//         message: "Cannot delete account with active itineraries or bookings",
//       });
//     }

//     // Delete all itineraries associated with this guide
//     await itineraryModel.Itinerary.deleteMany({ guide: id });

//     // Delete the tour guide
//     await tourGuide.findByIdAndDelete(id);

//     res
//       .status(200)
//       .json({ message: "Tour guide account deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting tour guide account:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

//delete a guide
const deleteTourGuide = async (req, res) => {
  const { id } = req.params;

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such guide" });
  }

  try {
    // Find and delete the seller, and return the deleted document
    const seller = await tourGuide.findOneAndDelete({ _id: id });

    // Check if the seller exists
    if (!seller) {
      return res.status(400).json({ error: "No such guide" });
    }

    res.status(200).json({ message: "Guide deleted successfully", seller });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getNotificationsGuide = async (req, res) => {
  const { id } = req.params;
  try {
    const tourguide = await tourGuide.findById(id);
    if (!tourguide) {
      res.status(400).json({ message: "tourguide is not found" });
    } else {
      res.status(200).json(tourguide.notifications);
    }
  } catch {
    console.error("Error getting notifications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllItinerariesByGuide = async (req, res) => {
  try {
    const { guideId } = req.params; // Assuming the guideId is passed as a parameter

    // Fetch all itineraries that have the matching guideId
    const itineraries = await itineraryModel.Itinerary.find({ guide: guideId }).populate('guide').populate('activities'); // Optionally, populate related data

    // Check if any itineraries are found
    if (!itineraries || itineraries.length === 0) {
      return res.status(404).json({
        message: "No itineraries found for this guide",
      });
    }

    // Return the list of itineraries
    res.status(200).json({
      message: "Itineraries retrieved successfully",
      itineraries,
    });
  } catch (error) {
    console.error("Error retrieving itineraries for guide:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// Function to calculate total revenue from booked itineraries filtered by guide ID (10% of their price)
const ItineraryRevenue = async (req, res) => {
  try {
    const { guideId } = req.params; // Assuming the guideId is passed as a parameter

    // Step 1: Retrieve all child itineraries (booked itineraries)
    const childItineraries = await ChildItinerary.find({});

    // Step 2: Initialize total revenue
    let totalRevenue = 0;

    // Step 3: Loop through all child itineraries and check if the associated itinerary has the guideId
    for (const childItinerary of childItineraries) {
      // Fetch the parent itinerary (itinerary model)
      const itinerary = await itineraryModel.Itinerary.findById(childItinerary.itinerary);

      // Check if the guide of the itinerary matches the provided guideId
      if (itinerary && itinerary.guide.toString() === guideId) {
        if (childItinerary.totalPrice) {
          // Add 10% of the total price for this child itinerary to the total revenue
          totalRevenue += childItinerary.totalPrice * 0.1;
        }
      }
    }

    // Step 4: Send the total revenue as a response
    res.status(200).json({
      message: "Total revenue calculated successfully for the tour guide",
      totalRevenue: totalRevenue.toFixed(2), // Round to 2 decimal places
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      message: "Error calculating total revenue for the tour guide",
      error: error.message,
    });
  }
};


// Function to calculate total revenue from booked itineraries filtered by itinerary ID (10% of their price)
const RevenuefilterItinerary = async (req, res) => {
  try {
    const { itineraryId } = req.params; // Assuming the itineraryId is passed as a parameter

    // Step 1: Retrieve all child itineraries (booked itineraries) for the specific itinerary
    const childItineraries = await ChildItinerary.find({ itinerary: itineraryId });

    // Step 2: Initialize total revenue
    let totalRevenue = 0;

    // Step 3: Loop through all child itineraries and calculate the revenue
    for (const childItinerary of childItineraries) {
      if (childItinerary.totalPrice) {
        // Add 10% of the total price for this child itinerary to the total revenue
        totalRevenue += childItinerary.totalPrice * 0.1;
      }
    }

    // Step 4: Fetch the parent itinerary to include its name in the response
    const parentItinerary = await Itinerary.findById(itineraryId);
    const itineraryName = parentItinerary ? parentItinerary.name : 'Unknown Itinerary';

    // Step 5: Send the total revenue as a response
    res.status(200).json({
      message: "Total revenue calculated successfully for the itinerary",
      itineraryId,
      itineraryName,
      totalRevenue: totalRevenue.toFixed(2), // Round to 2 decimal places
      bookingsCount: childItineraries.length
    });
  } catch (error) {
    // Handle any errors
    console.error('Error calculating itinerary revenue:', error);
    res.status(500).json({
      message: "Error calculating total revenue for the itinerary",
      error: error.message,
    });
  }
};


const guideMonthlyRevenue = async (req, res) => {
  try {
    const { guideId } = req.params; // Assuming guideId is passed as a route parameter
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 0, 1); // January 1st of the current year
    const endDate = new Date(currentYear, 11, 31); // December 31st of the current year

    if (!guideId) {
      return res.status(400).json({ message: "Guide ID is required" });
    }

    // Aggregate itinerary revenue for the current year
    const itineraryRevenue = await ChildItinerary.aggregate([
      {
        $lookup: {
          from: 'itineraries',
          localField: 'itinerary',
          foreignField: '_id',
          as: 'parentItinerary'
        }
      },
      { $unwind: '$parentItinerary' },
      {
        $match: {
          'parentItinerary.guide': new mongoose.Types.ObjectId(guideId),
          'createdAt': { $gte: startDate, $lte: endDate },
        }
      },
      {
        $group: {
          _id: { month: { $month: '$createdAt' } },
          totalRevenue: {
            $sum: { $multiply: ['$totalPrice', 0.1] } // Calculate 10% of the total price
          },
          bookingsCount: { $sum: 1 }
        }
      },
      { $sort: { '_id.month': 1 } }
    ]);

    // Initialize an array for all 12 months with zero revenue
    const monthlyRevenue = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      itineraryRevenue: 0,
      bookingsCount: 0,
      totalRevenue: 0
    }));

    // Populate the monthly revenue with the actual data from aggregation
    itineraryRevenue.forEach(entry => {
      const monthIndex = entry._id.month - 1; // Month is 1-based, array is 0-based
      monthlyRevenue[monthIndex].itineraryRevenue = entry.totalRevenue;
      monthlyRevenue[monthIndex].bookingsCount = entry.bookingsCount;
      monthlyRevenue[monthIndex].totalRevenue = entry.totalRevenue;
    });

    // Add month names and format numbers
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const formattedRevenue = monthlyRevenue.map(item => ({
      ...item,
      monthName: monthNames[item.month - 1],
      itineraryRevenue: Number(item.itineraryRevenue.toFixed(2)),
      totalRevenue: Number(item.totalRevenue.toFixed(2))
    }));

    // Calculate total yearly revenue and bookings
    const yearlyTotals = formattedRevenue.reduce((acc, month) => {
      acc.totalRevenue += month.totalRevenue;
      acc.totalBookings += month.bookingsCount;
      return acc;
    }, { totalRevenue: 0, totalBookings: 0 });

    // Return the response with the formatted revenue data
    res.status(200).json({
      message: "Yearly itinerary revenue calculated successfully for the tour guide",
      year: currentYear,
      guideId,
      data: formattedRevenue,
      yearlyTotals: {
        totalRevenue: Number(yearlyTotals.totalRevenue.toFixed(2)),
        totalBookings: yearlyTotals.totalBookings
      }
    });

  } catch (error) {
    console.error("Error calculating monthly itinerary revenue:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const filterRevenueByDateGuide = async (req, res) => {
  try {
    const { date } = req.query;
    const { guideId } = req.params; // guideId passed as a route parameter

    if (!date) {
      return res.status(400).json({ message: "Date parameter is required" });
    }

    if (!guideId) {
      return res.status(400).json({ message: "Guide ID is required" });
    }

    const selectedDate = new Date(date);
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);

    const itineraryRevenue = await ChildItinerary.aggregate([
      {
        $lookup: {
          from: "itineraries",
          localField: "itinerary",
          foreignField: "_id",
          as: "parentItinerary"
        }
      },
      { $unwind: "$parentItinerary" },
      {
        $match: {
          "parentItinerary.guide": new mongoose.Types.ObjectId(guideId),
          "createdAt": { $gte: selectedDate, $lt: nextDate },
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: { $multiply: ["$totalPrice", 0.1] } }, // Calculate 10% of the total price
          bookingsCount: { $sum: 1 }
        }
      }
    ]);

    const totalItineraryRevenue = itineraryRevenue.length > 0 ? itineraryRevenue[0].totalRevenue : 0;
    const bookingsCount = itineraryRevenue.length > 0 ? itineraryRevenue[0].bookingsCount : 0;

    res.status(200).json({
      message: "Revenue filtered by date successfully for the tour guide",
      date: selectedDate.toISOString().split("T")[0],
      itineraryRevenue: Number(totalItineraryRevenue.toFixed(2)),
      bookingsCount: bookingsCount,
      totalRevenue: Number(totalItineraryRevenue.toFixed(2))
    });
  } catch (error) {
    console.error("Error filtering revenue by date for guide:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




module.exports = {
  deleteTourGuide,
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
  requestDeletionGuide,
  getPassword,
  filterSalesReport,
  filterTouristNumbers,
  updateTourGuideNew,
  deleteTourGuide,
  deleteItinerary2,
  getNotificationsGuide,
  frontendGuidesTable,
  frontendPendingGuidesTable,
  getAllItinerariesByGuide,
  ItineraryRevenue,
  guideMonthlyRevenue,
  filterRevenueByDateGuide,
  uploadPicture
};
