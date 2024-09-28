const tourGuide = require('../Models/tourGuide.js');
const { default: mongoose } = require('mongoose');

const createTourGuide = async (req, res) => {

    const { name, email, password, mobileNumber, nationality, yearsOfExperience, itineraries } = req.body;
    console.log(req.body);
    try {
        const newTourGuide = await tourGuide.create({name, email, password, mobileNumber, nationality, yearsOfExperience, itineraries})
        const savedTourGuide = await newTourGuide.save();
        res.status(201).json(savedTourGuide);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  };

  const getTourGuide = async (req, res) => {

    const { name, email, password, mobileNumber, nationality, yearsOfExperience, itineraries } = req.body;
    console.log(req.body);
    try {
        const retreivedTourGuide = await tourGuide.find({name, email, password, mobileNumber, nationality, yearsOfExperience, itineraries})
        res.status(200).json(retreivedTourGuide);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  };

  const updateTourGuide = async (req, res) => {
    const { name, email, password, mobileNumber, nationality, yearsOfExperience, itineraries } = req.body;
    console.log(req.body);
    try {
        const updatedTourGuide = await tourGuide.findOneAndUpdate(
            { email }, 
            { name, password, mobileNumber, nationality, yearsOfExperience, itineraries },
            { new: true }
        );
        
        if (!updatedTourGuide) {
            return res.status(404).json({ message: "Tour guide not found" });
        }

        res.status(200).json(updatedTourGuide); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



  module.exports = { createTourGuide,getTourGuide,updateTourGuide};