const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the child itinerary schema
const childItinerarySchema = new Schema({
  itinerary: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Itinerary', // Reference to the parent itinerary model
    required: true
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Buyer', // Reference to the Buyer model (assuming there's a Buyer model)
    required: true
  },
  chosenDates: {
    type: [Date], // Array of selected dates (from availableDates in parent itinerary)
    required: true,
    validate: {
      validator: function(dates) {
        // Ensure the chosen dates fall within the available dates of the parent itinerary
        return dates.length > 0;
      },
      message: 'You must select at least one valid date'
    }
  },
  chosenTimes: {
    type: [String], // Array of selected times (from availableTimes in parent itinerary)
    required: true,
    validate: {
      validator: function(times) {
        // Ensure the chosen times fall within the available times of the parent itinerary
        return times.length > 0;
      },
      message: 'You must select at least one valid time'
    }
  },
  totalPrice: {
    type: Number, // Calculate based on the price of the parent itinerary and number of days selected
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'], // Booking status
    default: 'pending'
  },
}, { timestamps: true });

// Pre-save hook to automatically calculate the total price
childItinerarySchema.pre('save', async function (next) {
  try {
    const parentItinerary = await mongoose.model('Itinerary').findById(this.itinerary);

    if (parentItinerary) {
      // Calculate the total price based on the number of selected days and parent price
      this.totalPrice = parentItinerary.priceOfTour * this.chosenDates.length;
    } else {
      throw new Error('Parent itinerary not found');
    }

    next();
  } catch (error) {
    next(error);
  }
});

const ChildItinerary = mongoose.model('ChildItinerary', childItinerarySchema);
module.exports = ChildItinerary;
