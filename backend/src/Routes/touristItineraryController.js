const ChildItinerary = require('../Models/touristItinerary.js');
const itineraryModel = require('../Models/itinerary.js');
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

module.exports = {
  createChildItinerary,
  getChildItineraryById,
  getAllChildItineraries,
  updateChildItineraryById,
  deleteChildItineraryById
};