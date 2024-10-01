const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  Date: {
    type: Date,
    required: false
  },
  Time: {
    type: Time,
    required: false
  },
  Location: {
    type: String,
    required: false
  },
  Price: {
    type: Number,
    required: false
  },
  Category: {
    type: String,
    required: false
  },
  Tags: {
    type: String,
    required: false
  },
  Discount: {
    type: Number,
    required: false
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;