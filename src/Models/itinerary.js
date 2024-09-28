const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itinerarySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  activities: [
    {
      type: String,
      required: true, // Each itinerary must have a list of activities
    }
  ],
  locationsToBeVisited: {
    type: [String],
    required: true, // List of locations to visit
  },
  timeline: {
    type: String, // E.g., a timeline description or format like "Day 1, Day 2"
    required: true,
  },
  durationOfEachActivity: {
    type: [Number], // Array of numbers representing the duration of each activity in hours
    required: true,
  },
  languageOfTour: {
    type: String,
    required: true,
  },
  priceOfTour: {
    type: Number,
    required: true,
  },
  availableDatesAndTimes: [
    {
      date: {
        type: Date,
        required: true,
      },
      time: {
        type: String, // E.g., "10:00 AM"
        required: true,
      }
    }
  ],
  accessibility: {
    type: Boolean, // Indicates whether the tour is accessible (for people with disabilities)
    default: false,
  },
  pickupDropoffLocations: {
    type: [String], // List of pickup/dropoff locations
    required: true,
  },
  tourGuide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TourGuide', // References the TourGuide model
    required: true,
  }
}, { timestamps: true });

const Itinerary = mongoose.model('Itinerary', itinerarySchema);
module.exports = Itinerary;