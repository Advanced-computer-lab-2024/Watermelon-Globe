const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const siteSchema = new Schema({
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
      type: String,
      required: true,
    }
  ],
  location: {
    type: String,
    required: true,
  },
  openingHours: {
    type: String,
    required: true,
  },
  ticketPrices: {
    type: Number,
    required: true,
  },
  tourismGovernor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tourismGovernor', // References the Tourism Governor model
    required: true,
  }
}, { timestamps: true });

const tourismSite = mongoose.model('tourismSite', siteSchema);
module.exports = tourismSite;
