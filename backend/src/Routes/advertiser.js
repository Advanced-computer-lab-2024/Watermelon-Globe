const express = require("express");
const router = express.Router();

//company profile imports
const {
  createProfile,
  updateProfile,
  getProfiles,
  changePasswordAdvertiser,
  getLastApprovedAdvertiser,
  approveAdvertiser,
  getPassword,
  acceptTermsAndConditions,
  requestDeletionAdvertiser,
  getNotificationsAdvertiser,
  frontendPendingAdvertiserTable,
  frontendAdvertiserTable,
  deleteProfile,
} = require("../Controller/companyProfileController");

const { getSalesReport } = require("../Controller/companyProfileController");

router.get("/frontendAdvertiserTable", frontendAdvertiserTable);
router.get("/frontendPendingAdvertiserTable", frontendPendingAdvertiserTable);
// //tags

// router.get("/getTags",getTags);
// router.post("/createTags",createTags);
router.post("/createProfile", createProfile);
router.put("/updateProfile/:id", updateProfile);
router.get("/profiles", getProfiles);
router.delete("/deleteProfile/:id", deleteProfile);

router.put("/acceptTermsAndConditions/:id", acceptTermsAndConditions);
router.get("/profiles/:id?", getProfiles);
router.put("/changePasswordAdvertiser/:id", changePasswordAdvertiser);
router.get("/lastApprovedAdvertiser", getLastApprovedAdvertiser);
router.put("/approve/:id", approveAdvertiser);
router.get("/getPassword", getPassword);
router.get("/sales-report/:advertiserId", getSalesReport);
router.put("/requestDeletionAdvertiser/:id", requestDeletionAdvertiser);
router.get("/getNotificationsAdvertiser/:id", getNotificationsAdvertiser);

// router.post("/addAdvertiser", createAdvertiser);

module.exports = router;
