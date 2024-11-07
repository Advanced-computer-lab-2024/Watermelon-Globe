const express = require('express');
const router = express.Router();

//company profile imports
const { createProfile, updateProfile, getProfiles } = require("../Controller/companyProfileController");

// //tags

// router.get("/getTags",getTags);
// router.post("/createTags",createTags);

router.post("/createProfile", createProfile);
router.put("/updateProfile/:id", updateProfile);
router.get("/profiles", getProfiles);
// router.post("/addAdvertiser", createAdvertiser);

module.exports = router;