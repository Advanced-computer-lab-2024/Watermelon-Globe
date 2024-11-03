const express = require('express');
const router = express.Router();

//governor imports
const { createSite, getSite, getAllSites, updateSite, deleteSite, getMySites } =
  require('../Controller/governorController');

//tourism governor/sites routes
router.post("/addSite", createSite);
router.get("/getSite/:id", getSite);
router.get("/getAllSites", getAllSites);
router.put("/updateSite/:id", updateSite);
router.delete("/deleteSite/:id", deleteSite);
router.get("/getMySites", getMySites);


// router.post("/addGov", createGov);

module.exports = router;