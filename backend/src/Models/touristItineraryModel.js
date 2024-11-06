const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const childItinerarySchema = new Schema({
  itinerary: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Itinerary',
    required: true
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tourist',
    required: true
  },
  chosenDates: {
    type: [Date],
    required: true,
    validate: {
      validator: function(dates) {
        return dates.length > 0;
      },
      message: 'You must select at least one valid date'
    }
  },
  chosenTimes: {
    type: [String],
    required: true,
    validate: {
      validator: function(times) {
        return times.length > 0;
      },
      message: 'You must select at least one valid time'
    }
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Pre-save hook to validate chosen dates and calculate total price
childItinerarySchema.pre('save', async function (next) {
  try {
    // Fetch the parent itinerary
    const parentItinerary = await mongoose.model('Itinerary').findById(this.itinerary);

    if (!parentItinerary) {
      throw new Error('Parent itinerary not found');
    }

    // Check if all chosen dates are within the available dates
    const availableDatesSet = new Set(parentItinerary.availableDates.map(date => date.toISOString()));
    const allDatesAvailable = this.chosenDates.every(date => availableDatesSet.has(date.toISOString()));

    if (!allDatesAvailable) {
      throw new Error('One or more chosen dates are not available in the itinerary');
    }

    // Calculate the total price based on the number of selected days and parent price
    this.totalPrice = parentItinerary.priceOfTour * this.chosenDates.length;

    // Check if all chosen dates have passed to set the 'completed' status
    if (this.status === 'confirmed') {
      const currentDate = new Date();
      this.completed = this.chosenDates.every(date => date < currentDate);
    }

    next();
  } catch (error) {
    next(error);
  }
});

const ChildItinerary = mongoose.model('ChildItinerary', childItinerarySchema);
module.exports = ChildItinerary;
