const mongoose = require('mongoose');
const itineraryModel = require('../Models/itinerary.js');
const tourGuide = require('../Models/tourGuide.js');

const createTourGuide = async (req, res) => {

    const { name, username, email, password, mobileNumber, nationality, yearsOfExperience, itineraries } = req.body;
    console.log(req.body);
    try {

        const existingGuide = await tourGuide.findOne({ email });
        if (existingGuide) {
            return res.status(400).json({ message: 'Tour guide with this email already exists' });
        }
        const newTourGuide = await tourGuide.create({ name, username, email, password, mobileNumber, nationality, yearsOfExperience, itineraries })
        const savedTourGuide = await newTourGuide.save();
        res.status(201).json(savedTourGuide);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getTourGuide = async (req, res) => {
    try {
        const searchCriteria = req.body;
        
        // Check if search criteria is provided
        if (!Object.keys(searchCriteria).length) {
            return res.status(400).json({ message: "Search criteria is required" });
        }

        console.log("Search criteria:", searchCriteria);

        // Query the database based on search criteria
        const retrievedTourGuide = await tourGuide.find(searchCriteria);

        // Check if results are found
        if (retrievedTourGuide.length === 0) {
            return res.status(404).json({ message: "No tour guide found matching the criteria" });
        }
        
        res.status(200).json(retrievedTourGuide);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateTourGuide = async (req, res) => {
    const { id } = req.params; // Extracting the site ID from request parameters
    const { name, username, email, password, mobileNumber, nationality, yearsOfExperience, itineraries } = req.body;
    console.log(req.body);
    try {
        const updatedTourGuide = await tourGuide.findByIdAndUpdate(
            id ,
            { name, username, email, password, mobileNumber, nationality, yearsOfExperience, itineraries },
            { new: true , runValidators: true}
        );

        if (!updatedTourGuide) {
            return res.status(404).json({ message: "Tour guide not found" });
        }

        res.status(200).json(updatedTourGuide);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


const createItinerary = async (req, res) => {
    const { name, activities, tag, locations, timeline, languageOfTour, priceOfTour, availableDates, availableTimes,
        accessibility, pickupDropoffLocations, bookings, guide: guideId} = req.body;
        try {
            const itinerary = await itineraryModel.Itinerary.create({ name, activities, tag, locations,
                timeline, languageOfTour, priceOfTour, availableDates, availableTimes, accessibility, 
                pickupDropoffLocations, bookings, guide: guideId});

            res.status(200).json(itinerary)
          } catch (error) {
            res.status(400).json({ error: error.message })
          }
};

const getMyItineraries = async (req, res) => {
    const { guideID } = req.query; // Extract the Governor ID from the request parameters

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(guideID)) {
        return res.status(400).json({ error: 'Invalid guide ID' });
    }

    try {
        // Find the tourism site by ID and populate the tourismGovernor field
        const site = await itineraryModel.Itinerary.find({ guide: guideID }).populate(
            'activities').populate('guide');

        // If no site is found, return a 404 error
        if (!site) {
            return res.status(404).json({ message: 'Site not found' });
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
        const itineraries = await itineraryModel.Itinerary.find({}).sort({ createdAt: -1 }).populate(
            'activities').populate('guide');

        // If no itineraries found, return a message
        if (!itineraries.length) {
            return res.status(404).json({ message: 'No itineraries found' });
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
            return res.status(400).json({ error: 'Invalid itinerary ID' });
        }

        // Find the itinerary by ID and populate the guide details
        const itinerary = await itineraryModel.Itinerary.findById(id).populate(
            'activities').populate('guide');

        // If the itinerary is not found, return a 404 error
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
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
    const { name, activities, tag, locations, timeline, languageOfTour, priceOfTour, availableDates,
            availableTimes, accessibility, pickupDropoffLocations, bookings,
            guide: guideId} = req.body; // Extracting the updated fields from request body
  
    // Validate the site ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Itinerary ID' });
    }
  
    try {
      // Find the Itinerary by ID and update it with the new details
      const updatedItinerary = await itineraryModel.Itinerary.findByIdAndUpdate(
        id,
        {  name, activities, tag, locations, timeline, languageOfTour, priceOfTour, availableDates, availableTimes,
           accessibility, pickupDropoffLocations, bookings, guide: guideId }, // Updating the fields
        { new: true, runValidators: true } // Option to return the updated site and run validation
      );
  
      // If the Itinerary is not found, return a 404
      if (!updatedItinerary) {
        return res.status(404).json({ message: 'Itinerary not found' });
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
            return res.status(400).json({ error: 'Booking have been made! You cannot delete this itinerary!' });
        }
        const deletedItinerary = await itineraryModel.Itinerary.findByIdAndDelete(id);

        if (!deletedItinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }

        res.status(200).json({ message: 'Itinerary successfully deleted', deletedItinerary });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting itinerary', error });
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
    updateTourGuide,
    getMyItineraries
};
