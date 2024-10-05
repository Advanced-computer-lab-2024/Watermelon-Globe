const express = require('express');
const Activity = require('../Models/activityModel'); // Adjust the path to your activity model

//create Activity
const createActivity = async (req, res) => {
    const {
      date,
      time,
      location,
      priceRange,
      category,
      tags,
      specialDiscounts,
      bookingAvailable
    } = req.body;
  
    // Validate required fields
    if (!date || !time || !location || !priceRange || !category || !tags || !specialDiscounts || bookingAvailable === undefined) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    try {
      // Create a new activity instance
      const newActivity = new Activity({
        date,
        time,
        location,
        priceRange,
        category,
        tags,
        specialDiscounts,
        bookingAvailable
      });
  
      // Save the activity to the database
      await newActivity.save();
  
      return res.status(201).json(newActivity); // Respond with the created activity and a 201 status
    } catch (error) {
      console.error("Error creating activity:", error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
 // filter by Budget
const filterActivityByBudget = async (req, res) => {
    const { priceRange } = req.query;
  
    // Validate query parameter
    if (!priceRange) {
      return res.status(400).json({ error: 'Price range is required.' });
    }
  
    // Parse the price range (assuming it's passed as a comma-separated string)
    const [minPrice, maxPrice] = priceRange.split(',').map(Number);
  
    // Validate min and max prices
    if (isNaN(minPrice) || isNaN(maxPrice)) {
      return res.status(400).json({ error: 'Invalid price range.' });
    }
  
    try {
      const activities = await Activity.find({
        'priceRange.min': { $gte: minPrice },
        'priceRange.max': { $lte: maxPrice }
      });
  
      return res.status(200).json(activities);
    } catch (error) {
      console.error("Error fetching activities:", error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  

//filter by one date
const filterByDate = async (req, res) => {
    const { date } = req.query;
  
    // Validate query parameter
    if (!date) {
      return res.status(400).json({ error: 'Date is required.' });
    }
  
    try {
      // Create a date object and set time to the start of the day
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0); // Set to midnight (start of the day)
  
      // Create another date object for the end of the day
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999); // Set to the end of the day
  
      const activities = await Activity.find({
        date: {
          $gte: startDate, // Start of the specified date
          $lte: endDate     // End of the specified date
        }
      });
  
      return res.status(200).json(activities);
    } catch (error) {
      console.error("Error fetching activities:", error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

// filter by rating 



module.exports = { createActivity, filterActivityByBudget, filterByDate};
