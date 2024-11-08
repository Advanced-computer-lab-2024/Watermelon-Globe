const express = require("express");
const router = express.Router();

const guideController = require("../Controller/guideController"); // Import the controller

router.post("/addGuide", guideController.createTourGuide);
router.get("/getGuide/:id", guideController.getTourGuide);
router.get("/getAllGuides", guideController.getAllGuides);
router.put("/updateGuide/:id", guideController.updateTourGuide);

//accept terms and conditions
router.put(
  "/acceptTermsAndConditions/:id",
  guideController.acceptTermsAndConditions
);

module.exports = router;
