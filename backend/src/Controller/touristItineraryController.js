const ChildItinerary = require("../Models/touristItineraryModel.js");
const itineraryModel = require("../Models/itineraryModel.js");
const { default: mongoose } = require("mongoose");
const Itinerary = require('../Models/itineraryModel.js'); 
const ActivityBooking = require('../Models/activityBookingModel.js');
//const ActivityBooking = require('../Models/activityBookingModel');  
const Activity = require('../Models/activityModel.js');
const Tourist = require('../Models/touristModel.js');

// Create a new child itinerary (booking)
const createChildItinerary = async (req, res) => {
  const { itinerary, buyer, chosenDates, chosenTimes, totalPrice, status } =
    req.body;

  console.log(itinerary);
  try {
    // Validate if the provided itinerary ID is valid
    if (!mongoose.Types.ObjectId.isValid(itinerary)) {
      return res.status(400).json({ error: "Invalid itinerary ID" });
    }

    // Validate if the itinerary exists
    const parentItinerary = await itineraryModel.Itinerary.findById(itinerary);
    if (!parentItinerary) {
      return res.status(404).json({ error: "Parent itinerary not found" });
    }

    // Save the child itinerary (this will also calculate the total price)
    const savedChildItinerary = await ChildItinerary.create({
      itinerary,
      buyer,
      chosenDates,
      chosenTimes,
      totalPrice,
      status,
    });
    savedChildItinerary.totalPrice = parentItinerary.priceOfTour;

    // Add the booked itinerary to the tourist's document
    await Tourist.findByIdAndUpdate(buyer, {
      $push: { bookedItineraries: savedChildItinerary._id }
    });

    res.status(201).json(savedChildItinerary);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating child itinerary: " + error.message });
  }
};

// Get a child itinerary by ID
const getChildItineraryById = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the child itinerary ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid child itinerary ID" });
    }

    // Find the child itinerary by ID
    const childItinerary = await ChildItinerary.findById(id)
      .populate("itinerary")
      .populate("buyer");

    if (!childItinerary) {
      return res.status(404).json({ message: "Child itinerary not found" });
    }

    res.status(200).json(childItinerary);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving child itinerary: " + error.message });
  }
};

// Get all child itineraries (bookings)
const getAllChildItineraries = async (req, res) => {
  try {
    // Find all child itineraries and populate itinerary and buyer fields
    const childItineraries = await ChildItinerary.find()
      .populate("itinerary")
      .populate("buyer");

    if (childItineraries.length === 0) {
      return res.status(404).json({ message: "No child itineraries found" });
    }

    res.status(200).json(childItineraries);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving child itineraries: " + error.message });
  }
};

// Update a child itinerary by ID
const updateChildItineraryById = async (req, res) => {
  const { id } = req.params;
  const { chosenDates, chosenTimes, totalPrice, status } = req.body;

  try {
    // Check if the child itinerary ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid child itinerary ID" });
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
      return res.status(404).json({ message: "Child itinerary not found" });
    }

    res.status(200).json(updatedChildItinerary);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating child itinerary: " + error.message });
  }
};

// Delete a child itinerary by ID
const deleteChildItineraryById = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the child itinerary ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid child itinerary ID" });
    }

    // Find and delete the child itinerary
    const deletedChildItinerary = await ChildItinerary.findByIdAndDelete(id);

    if (!deletedChildItinerary) {
      return res.status(404).json({ message: "Child itinerary not found" });
    }

    res
      .status(200)
      .json({
        message: "Child itinerary deleted successfully",
        deletedChildItinerary,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting child itinerary: " + error.message });
  }
};
// Create a new activity booking
const createActivityBooking = async (req, res) => {
  const { activity, tourist, chosenDate, status, paymentStatus } = req.body;
  try {
    // Validate if the provided activity ID is valid
    if (!mongoose.Types.ObjectId.isValid(activity)) {
      return res.status(400).json({ error: 'Invalid activity ID' });
    }
    // Validate if the activity exists
    const foundActivity = await Activity.findById(activity);
    if (!foundActivity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    // Validate if the tourist ID is valid
    if (!mongoose.Types.ObjectId.isValid(tourist)) {
      return res.status(400).json({ error: 'Invalid tourist ID' });
    }
    // Validate if the tourist exists
    const foundTourist = await Tourist.findById(tourist);
    if (!foundTourist) {
      return res.status(404).json({ error: 'Tourist not found' });
    }
    // Create the activity booking (this will also set the status and payment status)
    const newActivityBooking = new ActivityBooking({
      activity,
      tourist,
      chosenDate,
      status,
      paymentStatus,
    });
    // Save the activity booking
    const savedActivityBooking = await newActivityBooking.save();
   
 // Add the booked activity to the tourist's document
    await Tourist.findByIdAndUpdate(tourist, {
      $push: { bookedActivities: savedActivityBooking._id }
    });



    res.status(201).json(savedActivityBooking);
  } catch (error) {
    res.status(500).json({ error: 'Error creating activity booking: ' + error.message });
  }
};
const cancelActivityBooking = async (req, res) => {
  const { id } = req.params;  // Use 'id' instead of 'bookingId'
  try {
    // Find the booking by ID
    const booking = await ActivityBooking.findById(id).populate('activity');
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    // Check if the booking status is 'pending' or 'confirmed', it can't be cancelled if it's already 'completed' or 'cancelled'
    if (booking.status !== 'pending' && booking.status !== 'confirmed') {
      return res.status(400).json({ error: 'Only pending or confirmed bookings can be cancelled' });
    }
    // Get the event/activity date
    const eventDate = new Date(booking.activity.Date); // Assuming `activity.Date` stores the event date
    const currentDate = new Date();
    // Check if the event date is more than 48 hours away
    const timeDifference = eventDate - currentDate;
    const hoursRemaining = timeDifference / (1000 * 60 * 60); // Convert milliseconds to hours
    if (hoursRemaining <= 48) {
      return res.status(400).json({ error: 'Booking can only be cancelled 48 hours before the event' });
    }
    // Cancel the booking
    booking.status = 'cancelled';  // Update the status to cancelled
    await booking.save();
    res.status(200).json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ error: 'Error canceling activity booking: ' + error.message });
  }
};
// Cancel a child itinerary by ID
const cancelChildItinerary = async (req, res) => {
  const { id } = req.params; // ID of the child itinerary (booking)
  try {
    // Check if the child itinerary ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid child itinerary ID' });
    }
    // Find the child itinerary by ID
    const childItinerary = await ChildItinerary.findById(id).populate('itinerary');
    if (!childItinerary) {
      return res.status(404).json({ error: 'Child itinerary not found' });
    }
    // Ensure the itinerary's chosen date is more than 48 hours away
    const currentDate = new Date();
    const chosenDate = new Date(childItinerary.chosenDates); // Assuming `chosenDates` has the itinerary's start date
    const timeDifference = chosenDate - currentDate;
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    if (hoursDifference <= 48) {
      return res.status(400).json({ error: 'Cancellation must be made at least 48 hours before the start date.' });
    }
    // Update status to 'cancelled'
    childItinerary.status = 'cancelled';
    await childItinerary.save();
    res.status(200).json({ message: 'Child itinerary cancelled successfully', childItinerary });
  } catch (error) {
    res.status(500).json({ error: 'Error cancelling child itinerary: ' + error.message });
  }
};

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
  deleteChildItineraryById,
  createActivityBooking,
  getMyCompletedItineraries,
  cancelActivityBooking,
  cancelChildItinerary
};
