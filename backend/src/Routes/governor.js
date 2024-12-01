const express = require('express');
const router = express.Router();

//governor imports
const { createSite, getSite, getAllSites, updateSite, deleteSite, getMySites,changePasswordGovernor,getPassword} =
  require('../Controller/governorController');

//tourism governor/sites routes
router.post("/addSite/:id", createSite);
router.get("/getSite/:id", getSite);
router.get("/getAllSites", getAllSites);
router.put("/updateSite/:id", updateSite);
router.delete("/deleteSite/:id", deleteSite);
router.get("/getMySites/:governorID", getMySites);
router.put("/changePasswordGovernor/:id",changePasswordGovernor);
router.get("/getPassword",getPassword);


// router.post("/addGov", createGov);

module.exports = router;