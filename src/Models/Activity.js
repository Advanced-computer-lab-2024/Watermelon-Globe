const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  Date: {
    type: Date,
    required: true
  },
  Time: {
    type: String,
    required: true
  },
  Location: {
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    },
  },
  Price: {
    type: Number,
    required: true
  },
  priceRange: {
    type: [Number],
    required: false
  },
  Category: {
    type: String,
    required: false
  },
  Tags: {
    type: [String],
    required: false
  },
  Discount: {
    type: Number,
    required: true
  },
  bookingOpen: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

ActivitySchema.index({ Location: '2dsphere' });
const Activity = mongoose.model('Activity', ActivitySchema);
module.exports = Activity;