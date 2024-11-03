const express = require('express');
const router = express.Router();

//company profile imports
const { createProfile, updateProfile, getProfiles } = require("../Controller/companyProfileController");

//activity imports
const { createActivity, getActivities, getActivityById, updateActivity, deleteActivity,
createTags, getTags, updateActivityRating,createActivityNew,getActivitiesNew } = require ("../Controller/activityController");

//tags

router.get("/getTags",getTags);
router.post("/createTags",createTags);

//profile/adverstiser
router.post("/createProfile", createProfile);
router.put("/updateProfile/:id", updateProfile);
router.get("/profiles", getProfiles);
// router.post("/addAdvertiser", createAdvertiser);

//activities
router.post('/newActivity', createActivity); //duplicate
router.get('/activities', getActivities); //duplicate
router.get('/activities/:id', getActivityById);
router.post("/addActivity",createActivity); //duplicate
router.put("/updateActivityRating/:id",updateActivityRating); 
router.put('/updateActivity/:id', updateActivity);
router.delete('/deleteActivity/:id', deleteActivity);
router.post("/createActivityNew",createActivityNew); //duplicate
router.get("/getActivitiesNew",getActivitiesNew); //duplicate

module.exports = router;