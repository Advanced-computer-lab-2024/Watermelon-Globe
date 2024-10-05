const mongoose = require('mongoose');
const Itinerary = require('../Models/itinerary');
const tourGuide = require('../Models/tourguideModel');

const createTourGuide = async (req, res) => {

    const { name, email, password, mobileNumber, nationality, yearsOfExperience, itineraries } = req.body;
    console.log(req.body);
    try {

        const existingGuide = await tourGuide.findOne({ email });
        if (existingGuide) {
            return res.status(400).json({ message: 'Tour guide with this email already exists' });
        }
        const newTourGuide = await tourGuide.create({ name, email, password, mobileNumber, nationality, yearsOfExperience, itineraries })
        const savedTourGuide = await newTourGuide.save();
        res.status(201).json(savedTourGuide);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getTourGuide = async (req, res) => {

    const { name } = req.body;
    console.log(req.body);
    try {
        const retreivedTourGuide = await tourGuide.find({ name })
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
    }
}


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
        bookings,
        guideId
    } = req.body;

    try {
        // Validate if the provided guideId is a valid MongoDB ObjectId
        console.log('guideId:', guideId);
        if (!mongoose.Types.ObjectId.isValid(guideId)) {
            return res.status(400).json({ error: 'Invalid guide ID' });
        }

        // Check if the tour guide exists
        const guide = await tourGuide.findById(guideId);
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
            bookings,
            guide: guideId, // Link to tour guide
        });

        // Respond with the newly created itinerary
        res.status(201).json(itinerary);
    } catch (error) {
        // Catch and handle any errors
        res.status(500).json({ error: error.message });
    }
};

const getMyItineraries = async (req, res) => {
    const { governorID } = req.query; // Extract the Governor ID from the request parameters

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(governorID)) {
        return res.status(400).json({ error: 'Invalid governor ID' });
    }

    try {
        // Find the tourism site by ID and populate the tourismGovernor field
        const site = await siteModel.find({ tourismGovernor: governorID });

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
        bookings,
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

        if (bookings) {
            return res.status(400).json({ error: 'Booking have been made!' });
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
            bookings,
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
                    bookings,
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
    }

};


const deleteItineraryById = async (req, res) => {
    const {id} = req.params; // Extract itinerary ID from request parameters

    try {

        if (bookings) {
            return res.status(400).json({ error: 'Booking have been made!' });
        }
        const deletedItinerary = await Itinerary.findByIdAndDelete(id);

        if (!deletedItinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }

        res.status(200).json({ message: 'Itinerary successfully deleted', deletedItinerary });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting itinerary', error });
    }
};

const getItenerariesShahd = async (req, res) => {
    try {
       // Assuming User is a Mongoose model
       const tourguids = await Itinerary.find(); 
       res.status(200).json(tourguids); 
     } catch (error) {
       res.status(500).json({ message: error.message });
        // Handle any errors
     }  }
    
     const createTourguideShahd = async (req, res) => {
    
        try {
          // Destructure the name, email, and age from req.body
          const {Username,Email,Password} = req.body;
      
          // Validate if all fields are present
          if (!Username||!Email||!Password) {
            return res.status(400).json({ message: 'All fields are required: name,email,password.' });
          }
      
          // Create a new user instance and save to the database
          const NewTourguide = await tourGuide.create({
            Username,
            Email,
            Password
          
          });
      
           await (await NewTourguide).save();
          // Send the newly created user as a response
          res.status(201).json(NewTourguide);
        } catch (error) {
          res.status(500).json({ message: error.message }); // Handle any errors
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
    getMyItineraries,
    getItenerariesShahd,
    createTourguideShahd

};
