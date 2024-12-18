const express = require("express");
const router = express.Router();

const guideController = require("../Controller/guideController"); // Import the controller

router.get("/frontendGuidesTable", guideController.frontendGuidesTable);
router.get(
  "/frontendPendingGuidesTable",
  guideController.frontendPendingGuidesTable
);

router.post("/addGuide", guideController.createTourGuide);
router.get("/getGuide/:id", guideController.getTourGuide);
router.get("/getAllGuides", guideController.getAllGuides);
router.put("/updateGuide/:id", guideController.updateTourGuide);
router.put(
  "/changePasswordTourGuide/:id",
  guideController.changePasswordTourGuide
);
router.put("/requestDeletionGuide/:id", guideController.requestDeletionGuide);
router.get("/getPassword", guideController.getPassword);
router.put("/updateTourGuideNew/:id", guideController.updateTourGuideNew);
router.delete("/deleteGuide/:id", guideController.deleteTourGuide);
router.get("/getNotificationsGuide/:id", guideController.getNotificationsGuide);
router.get("/getAllItineraries", guideController.getAllItineraries);
router.get("/getMyItineraries/:id", guideController.getMyItineraries);
//accept terms and conditions
router.put(
  "/acceptTermsAndConditions/:id",
  guideController.acceptTermsAndConditions
);

router.get("/getAllItineraries", guideController.getAllItineraries);

router.get("/getAllItinerariesByGuide/:guideId", guideController.getAllItinerariesByGuide);

router.get("/ItineraryRevenue/:guideId", guideController.ItineraryRevenue);

router.get("/guideMonthlyRevenue/:guideId", guideController.guideMonthlyRevenue);

router.get("/filterRevenueByDateGuide/:guideId", guideController.filterRevenueByDateGuide);

router.get("/myItineraries/:id",guideController.myItineraries);
router.get("/getTotalTouristsForItinerary/:itineraryId", guideController.getTotalTouristsForItinerary);

router.get("/getMonthlyTouristsForItinerary/:itineraryId", guideController.getMonthlyTouristsForItinerary);



module.exports = router;
