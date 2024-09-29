<<<<<<< Updated upstream
const tourGuide = require('../Models/tourGuide.js');
const { default: mongoose } = require('mongoose');

const createTourGuide = async (req, res) => {

    const { name, email, password, mobileNumber, nationality, yearsOfExperience, itineraries } = req.body;
    console.log(req.body);
    try {
        const newTourGuide = await tourGuide.create({name, email, password, mobileNumber, nationality, yearsOfExperience, itineraries})
        const savedTourGuide = await newTourGuide.save();
        res.status(201).json(savedTourGuide);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  };

  const getTourGuide = async (req, res) => {

    const { name, email, password, mobileNumber, nationality, yearsOfExperience, itineraries } = req.body;
    console.log(req.body);
    try {
        const retreivedTourGuide = await tourGuide.find({name, email, password, mobileNumber, nationality, yearsOfExperience, itineraries})
        res.status(200).json(retreivedTourGuide);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  };

  const updateTourGuide = async (req, res) => {
    const { name, email, password, mobileNumber, nationality, yearsOfExperience, itineraries } = req.body;
    console.log(req.body);
    try {
        const updatedTourGuide = await tourGuide.findOneAndUpdate(
            { email }, 
            { name, password, mobileNumber, nationality, yearsOfExperience, itineraries },
            { new: true }
        );
        
        if (!updatedTourGuide) {
            return res.status(404).json({ message: "Tour guide not found" });
        }

        res.status(200).json(updatedTourGuide); 
    } catch (error) {
        res.status(400).json({ message: error.message });
=======
const mongoose = require('mongoose');
const Itinerary = require('../Models/Itinerary');
const TourGuide = require('../Models/tourGuide');

// CREATE an itinerary

const addGuide = async (req, res) => {
    const {
        name,
        email,
        password,
        mobileNumber,
        nationality,
        yearsOfExperience
    } = req.body; // Extract the tour guide details from the request body

    try {
        // Check if a guide with the same email already exists
        const existingGuide = await TourGuide.findOne({ email });
        if (existingGuide) {
            return res.status(400).json({ message: 'Tour guide with this email already exists' });
        }

        // Create a new tour guide
        const newGuide = new TourGuide({
            name,
            email,
            password, // Make sure to hash passwords in real applications for security
            mobileNumber,
            nationality,
            yearsOfExperience,
            itineraries: [] // Initialize with an empty array of itineraries
        });

        // Save the tour guide to the database
        const savedGuide = await newGuide.save();

        res.status(201).json(savedGuide);
    } catch (error) {
        res.status(500).json({ message: 'Error creating tour guide', error });
    }
};

const createItinerary = async (req, res) => {
    const {
        name,
        activities,
        locations,
        timeline,
        languageOfTour,
        priceOfTour,
        availableDates,
        availableTimes,
        accessibility,
        pickupDropoffLocations,
        guideId
    } = req.body;

    try {
        // Validate if the provided guideId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(guideId)) {
            return res.status(400).json({ error: 'Invalid guide ID' });
        }

        // Check if the tour guide exists
        const guide = await TourGuide.findById(guideId);
        if (!guide) {
            return res.status(404).json({ error: 'Tour guide not found' });
        }

        // Create the new itinerary linked to the guide
        const itinerary = await Itinerary.create({
            name,
            activities,
            locations,
            timeline,
            languageOfTour,
            priceOfTour,
            availableDates,
            availableTimes,
            accessibility,
            pickupDropoffLocations,
            guide: guideId, // Link to tour guide
        });

        // Respond with the newly created itinerary
        res.status(201).json(itinerary);
    } catch (error) {
        // Catch and handle any errors
        res.status(500).json({ error: error.message });
    }
};

const getAllItineraries = async(req,res) => {
    try {
        // Fetch all itineraries, populating the 'guide' field to get tour guide details
        const itineraries = await Itinerary.find().populate('guide', 'name email');

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
        const itinerary = await Itinerary.findById(id).populate('guide', 'name email');

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
    const { id } = req.params; // Get the itinerary ID from the request parameters
    const { 
        name, 
        activities, 
        locationsToBeVisited, 
        timeline, 
        duration, 
        languageOfTour, 
        priceOfTour, 
        availableDates, 
        accessibility, 
        pickupDropoffLocations,
        tourGuideId 
    } = req.body; // Extract new data from the request body

    try {
        // Check if the itinerary ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid itinerary ID' });
        }

        // If a new tourGuideId is provided, validate it
        if (tourGuideId && !mongoose.Types.ObjectId.isValid(tourGuideId)) {
            return res.status(400).json({ error: 'Invalid tour guide ID' });
        }

        // Debugging log for request body
        console.log("Request Body:", req.body);

        // Logging for debugging
        console.log("Updating itinerary with ID:", id);
        console.log("New data:", { 
            name, 
            activities, 
            locationsToBeVisited, 
            timeline, 
            duration, 
            languageOfTour, 
            priceOfTour, 
            availableDates, 
            accessibility, 
            pickupDropoffLocations,
            tourGuideId 
        });

        // Update the itinerary with new data, including the tourGuideId if provided
        const updatedItinerary = await Itinerary.findByIdAndUpdate(
            id,
            {
                $set: {
                    name,
                    activities,
                    locationsToBeVisited,
                    timeline,
                    duration,
                    languageOfTour,
                    priceOfTour,
                    availableDates,
                    accessibility,
                    pickupDropoffLocations,
                    ...(tourGuideId && { tourGuideId }) // Only update tourGuideId if it's provided and valid
                }
            },
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        // If the itinerary is not found, return a 404 error
        if (!updatedItinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }

        // Log the updated itinerary
        console.log("Updated Itinerary:", updatedItinerary);

        // Return the updated itinerary in the response
        res.status(200).json(updatedItinerary);
    } catch (error) {
        // Handle any potential errors
        console.error("Error updating itinerary:", error);
        res.status(500).json({ error: 'Error updating itinerary: ' + error.message });
>>>>>>> Stashed changes
    }
};


<<<<<<< Updated upstream

  module.exports = { createTourGuide,getTourGuide,updateTourGuide};
=======
const deleteItineraryById = async (req, res) => {
    const { id } = req.params; // Extract itinerary ID from request parameters

    try {
        const deletedItinerary = await Itinerary.findByIdAndDelete(id);

        if (!deletedItinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }

        res.status(200).json({ message: 'Itinerary successfully deleted', deletedItinerary });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting itinerary', error });
    }
};


module.exports = {
    addGuide,
    createItinerary,
    getItineraryById,
    updateItinerary,
    deleteItineraryById,
    getAllItineraries,
    createTourGuide,getTourGuide,updateTourGuide
};
>>>>>>> Stashed changes
