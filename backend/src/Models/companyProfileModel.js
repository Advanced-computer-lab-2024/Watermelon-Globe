const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companyProfileSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Email:{
    type:String,
    required:true
  },
  Password:{
    type:String,
    required:true
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
  }
}, { timestamps: true });

const CompanyProfile = mongoose.model('CompanyProfile', companyProfileSchema);
module.exports = CompanyProfile;