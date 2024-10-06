const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const pickupDropoffSchema = new Schema({
    pickup: { type: String, required: true },
    dropoff: { type: String, required: true }
});

const itinerarySchema = new Schema({
    name: { type: String, required: true },
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }], // Array of activity objects
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tag'}],
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
const pickup = mongoose.model('pickup', pickupDropoffSchema);
module.exports = {Itinerary, pickup};
