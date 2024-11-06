const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const governorSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tourismSite: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tourismSite', // References the Museums & Historical Places model
    }
  ]
}, { timestamps: true });

const tourismGovernor = mongoose.model('tourismGovernor', governorSchema);
module.exports = tourismGovernor;