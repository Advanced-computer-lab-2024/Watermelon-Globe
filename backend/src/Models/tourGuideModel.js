const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourGuideSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: false,
  },
  nationality: {
    type: String,
    required: false,
  },
  yearsOfExperience: {
    type: Number,
    required: false,
  },
  itineraries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'itinerary', // References the Itinerary model
    }
  ],
  idProof: { 
    type: String, 
    required: false 
  },
  certificates: {
    type: [String],
    required: false 
  },
}, { timestamps: true });

const TourGuide = mongoose.model('TourGuide', tourGuideSchema);
module.exports = TourGuide;