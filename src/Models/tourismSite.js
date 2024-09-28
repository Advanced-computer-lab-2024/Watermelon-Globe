const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const museumHistoricalPlaceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pictures: [
    {
      type: String, // Array of URLs or paths to pictures
      required: true,
    }
  ],
  location: {
    type: String,
    required: true,
  },
  openingHours: {
    type: String, // Example: "9:00 AM - 5:00 PM"
    required: true,
  },
  ticketPrices: {
    type: Number,
    required: true,
  },
  tourismGovernor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TourismGovernor', // References the Tourism Governor model
    required: true,
  }
}, { timestamps: true });

const MuseumHistoricalPlace = mongoose.model('MuseumHistoricalPlace', museumHistoricalPlaceSchema);
module.exports = MuseumHistoricalPlace;