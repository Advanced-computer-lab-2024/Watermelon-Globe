const TourGuide = require("../Models/tourGuideModel.js");
const Admin = require("../Models/AdminModel");
const Governer = require("../Models/tourismGovernorModel");
const Tourist = require("../Models/touristModel");
const Seller = require("../Models/SellerModel");
const Advertiser = require("../Models/advertiserModel");


const loginUser = async (req, res) => {
    const { username, password, userType } = req.body;
  
    // Validate input fields
    if (!username || !password || !userType) {
      return res
        .status(400)
        .json({ error: "Username, password, and userType are required" });
    }
  
    // Map userType to models
    const userTypeMap = {
      tourguide: TourGuide,
      admin: Admin,
      governor: Governer,
      tourist: Tourist,
      seller: Seller,
      advertiser: Advertiser,
    };
  
    // Check if the provided userType is valid
    const Model = userTypeMap[userType.toLowerCase()];
    if (!Model) {
      return res.status(400).json({ error: "Invalid userType" });
    }
  
    try {
      // Find the user by username
      const user = await Model.findOne({ username });
  
      // Check if user exists
      if (!user) {
        return res.status(404).json({ error: `${userType} not found` });
      }
  
      // Validate the password
      if (user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      // Login successful, return the user's ID
      res.status(200).json({ id: user._id, message: `${userType} login successful` });
    } catch (error) {
      console.error(`Error during ${userType} login:`, error);
      res.status(500).json({ error: "Server error" });
    }
  };
  
  module.exports = { loginUser };
  

