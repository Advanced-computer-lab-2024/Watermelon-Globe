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
  Rating: {
    type: Number,
    required: false
  },
  noOfRatings: {type:Number ,required:false},
  ratingsSum:{type:Number,required:false},
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tourist', // Reference to the user model
      required: true
    },
    text: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });

const TourGuide = mongoose.model('TourGuide', tourGuideSchema);
module.exports = TourGuide;