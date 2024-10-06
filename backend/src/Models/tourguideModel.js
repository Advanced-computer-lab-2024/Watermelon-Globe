const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TourguideSchema = new Schema({
  Username: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true,
  }
 
}, { timestamps: true });

const Tourguide = mongoose.model('Tourguide', TourguideSchema);
module.exports = Tourguide;