const express = require('express');
const router = express.Router();

const guideController = require('../Controller/guideController'); // Import the controller

router.post("/createItinerary", guideController.createItinerary); // Create a new itinerary
router.get("/getAllItineraries", guideController.getAllItineraries); // Get all itineraries
router.get("/getItinerary/:id", guideController.getItineraryById); // Get a single itinerary by ID
router.put("/updateItinerary/:id", guideController.updateItinerary); // Update an itinerary
router.delete("/deleteItinerary/:id", guideController.deleteItineraryById); // Delete an itinerary
router.get("/getMyItineraries", guideController.getMyItineraries);



module.exports = router;