const express = require("express");
const router = express.Router();

const guideController = require("../Controller/guideController"); // Import the controller

router.post("/addGuide", guideController.createTourGuide);
router.get("/getGuide/:id", guideController.getTourGuide);
router.get("/getAllGuides", guideController.getAllGuides);
router.put("/updateGuide/:id", guideController.updateTourGuide);
router.put("/changePasswordTourGuide/:id",guideController.changePasswordTourGuide);
router.put("/requestDeletionGuide/:id",guideController.requestDeletionGuide);
router.get("/getPassword",guideController.getPassword);

//accept terms and conditions
router.put(
  "/acceptTermsAndConditions/:id",
  guideController.acceptTermsAndConditions
);

module.exports = router;
