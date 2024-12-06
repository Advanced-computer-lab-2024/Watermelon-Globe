const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pickupDropoffSchema = new Schema({
  pickup: { type: String, required: true },
  dropoff: { type: String, required: true },
});

const itinerarySchema = new Schema(
  {
    name: { type: String, required: true },
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }], // Array of activity objects
    tag: [{ type: mongoose.Schema.Types.ObjectId, ref: "PreferenceTag" }],
    locations: { type: [String], required: true },
    timeline: { type: String, required: true },
    languageOfTour: { type: String, required: true }, // Correct field name
    priceOfTour: { type: Number, required: true }, // Correct field name
    availableDates: { type: [Date], required: true },
    availableTimes: { type: [String], required: true },
    accessibility: { type: Boolean, default: false },
    pickupDropoffLocations: [pickupDropoffSchema], 
    bookings: {type: Boolean, default: false},// Array of pickup/dropoff objects
    guide: { type: mongoose.Types.ObjectId, ref: 'TourGuide', required: true } ,


    ratings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'Tourist', required: true },
        rating: { type: Number, required: true, min: 1, max: 5 }
      }
    ],
    rating: { type: Number, default: 0 },
    noOfRatings: {type:Number ,required:false},
    ratingsSum:{type:Number,required:false},// Reference to the tour guide

    comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tourist', // Reference to the user model
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }]
  ,
  inappropriate: {
    type: Boolean,
    default: false },
    
    bookingsList: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'Tourist', required: true },
      }
    ],
  notifyRequests: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tourist'
  }]

}, { timestamps: true });

const Itinerary = mongoose.model("Itinerary", itinerarySchema);
const pickup = mongoose.model("pickup", pickupDropoffSchema);
module.exports = { Itinerary, pickup };


 