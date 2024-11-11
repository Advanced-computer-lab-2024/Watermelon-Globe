const express = require("express");
const router = express.Router();

const guideController = require("../Controller/guideController");
const guestController = require("../Controller/guestController");
const touristController = require('../Controller/touristController');

router.post("/createItinerary", guideController.createItinerary); // Create a new itinerary
router.get("/getAllItineraries", guideController.getAllItineraries); // Get all itineraries
router.get("/getItinerary/:id", guideController.getItineraryById); // Get a single itinerary by ID
router.put("/updateItinerary/:id", guideController.updateItinerary); // Update an itinerary
router.delete("/deleteItinerary/:id", guideController.deleteItineraryById); // Delete an itinerary
router.get("/getMyItineraries/:guideID", guideController.getMyItineraries);



//Sprint 2 -- malak
router.put(
  "/updateActivateItinarary/:id",
  guideController.activateItineraryAccessibility
);
router.put(
  "/updateDeactivateItinarary/:id",
  guideController.deactivateItineraryAccessibility
);

router.get("/activeItineraries", guestController.getAccessibleItineraries);
router.get(
  "/getActiveAndUnflaggedItineraries",
  guestController.getActiveAndUnflaggedItineraries
);

//used for testing reasons
router.get(
  "/notActiveItineraries",
  guestController.getNotAccessibleItineraries
);
router.get(
  "/getInappropriateItineraries",
  guestController.getInappropriateItineraries
);


module.exports = router;
