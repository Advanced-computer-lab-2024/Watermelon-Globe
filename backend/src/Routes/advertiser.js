const express = require('express');
const router = express.Router();

//company profile imports
const { createProfile, updateProfile, getProfiles,changePasswordAdvertiser, getLastApprovedAdvertiser, approveAdvertiser} = require("../Controller/companyProfileController");

// //tags

// router.get("/getTags",getTags);
// router.post("/createTags",createTags);
router.post("/createProfile", createProfile);
router.put("/updateProfile/:id", updateProfile);
router.get("/profiles/:id?", getProfiles);
router.put("/changePasswordAdvertiser:/id",changePasswordAdvertiser);
router.get("/lastApprovedAdvertiser", getLastApprovedAdvertiser);
router.put("/approve/:id", approveAdvertiser);


// router.post("/addAdvertiser", createAdvertiser);

module.exports = router;