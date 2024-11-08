const ChildItinerary = require('../Models/touristItineraryModel.js');
const itineraryModel = require('../Models/itineraryModel.js');
const TourGuide = require('../Models/tourGuideModel.js');
const { default: mongoose } = require('mongoose');

// Create a new child itinerary (booking)
const createChildItinerary = async (req, res) => {
  const { itinerary, buyer, chosenDates, chosenTimes, totalPrice, status } = req.body;

  console.log(itinerary);
  try {
    // Validate if the provided itinerary ID is valid
    if (!mongoose.Types.ObjectId.isValid(itinerary)) {
      return res.status(400).json({ error: 'Invalid itinerary ID' });
    }

    // Validate if the itinerary exists
    const parentItinerary = await itineraryModel.Itinerary.findById(itinerary);
    if (!parentItinerary) {
      return res.status(404).json({ error: 'Parent itinerary not found' });
    }

    // Save the child itinerary (this will also calculate the total price)
    const savedChildItinerary = await ChildItinerary.create({itinerary, buyer, chosenDates, chosenTimes, totalPrice, status});
    savedChildItinerary.totalPrice = parentItinerary.priceOfTour;

    res.status(201).json(savedChildItinerary);
  } catch (error) {
    res.status(500).json({ error: 'Error creating child itinerary: ' + error.message });
  }
};

// Get a child itinerary by ID
const getChildItineraryById = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the child itinerary ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid child itinerary ID' });
    }

    // Find the child itinerary by ID
    const childItinerary = await ChildItinerary.findById(id).populate('itinerary').populate('buyer');

    if (!childItinerary) {
      return res.status(404).json({ message: 'Child itinerary not found' });
    }

    res.status(200).json(childItinerary);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving child itinerary: ' + error.message });
  }
};

// Get all child itineraries (bookings)
const getAllChildItineraries = async (req, res) => {
  try {
    // Find all child itineraries and populate itinerary and buyer fields
    const childItineraries = await ChildItinerary.find().populate('itinerary').populate('buyer');

    if (childItineraries.length === 0) {
      return res.status(404).json({ message: 'No child itineraries found' });
    }

    res.status(200).json(childItineraries);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving child itineraries: ' + error.message });
  }
};

// Update a child itinerary by ID
const updateChildItineraryById = async (req, res) => {
  const { id } = req.params;
  const { chosenDates, chosenTimes, totalPrice, status } = req.body;

  try {
    // Check if the child itinerary ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid child itinerary ID' });
    }

    // Update the child itinerary with the new data
    const updatedChildItinerary = await ChildItinerary.findByIdAndUpdate(
      id,
      {
        chosenDates,
        chosenTimes,
        totalPrice,
        status, // Optional status update
      },
      { new: true, runValidators: true }
    );

    if (!updatedChildItinerary) {
      return res.status(404).json({ message: 'Child itinerary not found' });
    }

    res.status(200).json(updatedChildItinerary);
  } catch (error) {
    res.status(500).json({ error: 'Error updating child itinerary: ' + error.message });
  }
};

// Delete a child itinerary by ID
const deleteChildItineraryById = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the child itinerary ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid child itinerary ID' });
    }

    // Find and delete the child itinerary
    const deletedChildItinerary = await ChildItinerary.findByIdAndDelete(id);

    if (!deletedChildItinerary) {
      return res.status(404).json({ message: 'Child itinerary not found' });
    }

    res.status(200).json({ message: 'Child itinerary deleted successfully', deletedChildItinerary });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting child itinerary: ' + error.message });
  }
};


//new Sprint 2 Backend 


// Method to refresh all 'completed' statuses and get completed itineraries for the current buyer
const getMyCompletedItineraries = async (buyerId) => {
  try {
    const currentDate = new Date();

    // Step 1: Refresh the 'completed' status for all ChildItineraries with status 'confirmed'
    await ChildItinerary.updateMany(
      { status: 'confirmed' }, // Only update 'completed' status if booking is confirmed
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
      buyer: buyerId, // Filter by the current buyer's ID
    });

    return completedItineraries;
  } catch (error) {
    console.error('Error fetching completed itineraries:', error);
    throw new Error('Failed to retrieve completed itineraries');
  }
};



module.exports = {
  createChildItinerary,
  getChildItineraryById,
  getAllChildItineraries,
  updateChildItineraryById,
  deleteChildItineraryById
};
