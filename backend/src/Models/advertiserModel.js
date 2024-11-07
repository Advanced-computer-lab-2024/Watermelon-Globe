const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advertiserSchema = new Schema({
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
  },
  idProof: { 
    type: String, 
    required: false 
  },
  taxationRegistryCard: { 
    type: String, 
    required: false 
  },
}, { timestamps: true });

const Advertiser = mongoose.model('Advertiser', advertiserSchema);
module.exports = Advertiser;