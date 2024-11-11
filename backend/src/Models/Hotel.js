// models/hotel.js
const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  roomTypes: [{
    type: String, // e.g. 'Single', 'Double', 'Suite'
    required: true,
  }],
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  // Additional hotel details as required
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
