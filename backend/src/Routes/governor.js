const express = require('express');
const router = express.Router();

//governor imports
const { createSite, getSite, getAllSites, updateSite, deleteSite, getMySites,changePasswordGovernor,getPassword} =
  require('../Controller/governorController');

//tourism governor/sites routes
router.post("/addSite", createSite);
router.get("/getSite", getSite);
router.get("/getAllSites", getAllSites);
router.put("/updateSite", updateSite);
router.delete("/deleteSite/:id", deleteSite);
router.get("/getMySites/:id", getMySites);
router.put("/changePasswordGovernor/:id",changePasswordGovernor);
router.get("/getPassword",getPassword);


// router.post("/addGov", createGov);

module.exports = router;