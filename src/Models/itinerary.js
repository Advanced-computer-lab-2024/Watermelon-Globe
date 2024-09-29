const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    activityName: { type: String, required: true },
    duration: { type: String, required: true }
});

const pickupDropoffSchema = new Schema({
    pickup: { type: String, required: true },
    dropoff: { type: String, required: true }
});

const itinerarySchema = new Schema({
    name: { type: String, required: true },
    activities: [activitySchema], // Array of activity objects
    locations: { type: [String], required: true },
    timeline: { type: String, required: true },
    languageOfTour: { type: String, required: true }, // Correct field name
    priceOfTour: { type: Number, required: true }, // Correct field name
    availableDates: { type: [Date], required: true },
    availableTimes: { type: [String], required: true },
    accessibility: { type: Boolean, default: false },
    pickupDropoffLocations: [pickupDropoffSchema], 
    bookings: {type: Boolean, default: false},// Array of pickup/dropoff objects
    guide: { type: mongoose.Types.ObjectId, ref: 'TourGuide', required: true } // Reference to the tour guide
    
}, { timestamps: true });

const Itinerary = mongoose.model('Itinerary', itinerarySchema);
module.exports = Itinerary;
