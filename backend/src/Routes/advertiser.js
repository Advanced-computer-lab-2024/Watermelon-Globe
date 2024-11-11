const express = require("express");
const router = express.Router();

//company profile imports
const { createProfile, updateProfile, getProfiles,changePasswordAdvertiser, getLastApprovedAdvertiser, approveAdvertiser,getPassword} = require("../Controller/companyProfileController");
const { requestDeletionAdvertiser} = require("../Controller/companyProfileController");

// //tags

// router.get("/getTags",getTags);
// router.post("/createTags",createTags);
router.post("/createProfile", createProfile);
router.put("/updateProfile/:id", updateProfile);
router.get("/profiles", getProfiles);

router.put("/acceptTermsAndConditions/:id", acceptTermsAndConditions);
router.get("/profiles/:id?", getProfiles);
router.put("/changePasswordAdvertiser/:id",changePasswordAdvertiser);
router.get("/lastApprovedAdvertiser", getLastApprovedAdvertiser);
router.put("/approve/:id", approveAdvertiser);
router.get("/getPassword",getPassword);

router.put("/requestDeletionAdvertiser:/id",requestDeletionAdvertiser);

// router.post("/addAdvertiser", createAdvertiser);

module.exports = router;
