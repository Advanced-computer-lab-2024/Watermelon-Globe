const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourismGovernorSchema = new Schema({
  name: {
    type: String,
    required: true,
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
  museumsAndHistoricalPlaces: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MuseumHistoricalPlace', // References the Museums & Historical Places model
    }
  ]
}, { timestamps: true });

const TourismGovernor = mongoose.model('TourismGovernor', tourismGovernorSchema);
module.exports = TourismGovernor;