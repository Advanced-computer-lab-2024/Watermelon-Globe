const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companyProfileSchema = new Schema({
  Name: {
    type: String,
    required: false
  },
  About: {
    type: String,
    required: false
  },
  Hotline: {
    type: String, // Changed from Number to String
    required: false
  },
  Link: {
    type: String,
    required: false
  },
}, { timestamps: true });

const CompanyProfile = mongoose.model('CompanyProfile', companyProfileSchema);
module.exports = CompanyProfile;
