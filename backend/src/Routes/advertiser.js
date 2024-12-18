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
  getAllProfiles,
  getCompanyProfileById,
  ActivityRevenue,
  advertiserMonthlyRevenue,
  filterRevenueByDateAdvertiser,
  getAllActivitiesByAdvertiser,
  getTotalTouristsForActivity,
  getMonthlyTouristsForActivity
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
router.get("/getCompanyProfileById/:id", getCompanyProfileById);
router.put("/acceptTermsAndConditions/:id", acceptTermsAndConditions);
router.get("/profiles/:id?", getProfiles);
router.get("/AllProfiles", getAllProfiles);
router.put("/changePasswordAdvertiser/:id", changePasswordAdvertiser);
router.get("/lastApprovedAdvertiser", getLastApprovedAdvertiser);
router.put("/approve/:id", approveAdvertiser);
router.get("/getPassword", getPassword);
router.get("/sales-report/:advertiserId", getSalesReport);
router.put("/requestDeletionAdvertiser/:id", requestDeletionAdvertiser);
router.get("/getNotificationsAdvertiser/:id", getNotificationsAdvertiser);

router.get("/getAllActivitiesByAdvertiser/:advertiserId", getAllActivitiesByAdvertiser);

router.get("/ActivityRevenue/:advertiserId", ActivityRevenue);

router.get("/advertiserMonthlyRevenue/:advertiserId", advertiserMonthlyRevenue);

router.get("/filterRevenueByDateAdvertiser/:advertiserId", filterRevenueByDateAdvertiser);

router.get("/getTotalTouristsForActivity/:activityId", getTotalTouristsForActivity);

router.get("/getMonthlyTouristsForActivity/:activityId", getMonthlyTouristsForActivity);
// router.post("/addAdvertiser", createAdvertiser);

module.exports = router;
