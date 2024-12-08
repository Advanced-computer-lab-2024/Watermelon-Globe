const express = require("express");
const router = express.Router();

const {
  createActivity,
  getActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
  updateActivityRating,
  createActivityNew,
  getActivitiesNew,
  getAllTags,
  getActivitiesByAdvertiserId,
} = require("../Controller/activityController");

router.post("/newActivity", createActivity); //duplicate
router.get("/activities", getActivities); //duplicate
router.get("/getActivityById/:id", getActivityById);

router.get("/getActivitiesByAdvertiserId/:id", getActivitiesByAdvertiserId);
router.post("/addActivity", createActivity); //duplicate
router.put("/updateActivityRating/:id", updateActivityRating);
router.put("/updateActivity/:id", updateActivity);
router.delete("/deleteActivity/:id", deleteActivity);
router.post("/createActivityNew", createActivityNew); //duplicate
router.get("/getActivitiesNew", getActivitiesNew); //duplicate
// router.post('/createHistoricalTags',createTags);
// router.get('/getHistoricalTags',getTags);
router.get("/getAllTags", getAllTags);

module.exports = router;
