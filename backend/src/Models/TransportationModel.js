// models/TransportationModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransportationSchema = new Schema({
  type: {
    type: String,
    required: true,  // E.g., "bus", "train", "flight", etc.
    trim: true
  },
  destination: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true  // Price of the transportation ticket
  },
  booked:{
    type: Boolean,
    default: false
  },
  bookingDate: {
    type: Date,      // The date the booking was made
    default: Date.now  
  }
}, {
  timestamps: true // Automatically creates `createdAt` and `updatedAt` fields
});

// Export the model
module.exports = mongoose.model('Transportation', TransportationSchema);
