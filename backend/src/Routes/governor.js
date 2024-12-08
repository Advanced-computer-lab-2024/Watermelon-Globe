const express = require("express");
const router = express.Router();

//governor imports
const {
  createSite,
  getSite,
  getAllSites,
  updateSite,
  deleteSite,
  getMySites,
  changePasswordGovernor,
  getPassword,
  loginGovernor,
  getAllGovernors,
  getGovernorById,
} = require("../Controller/governorController");

//tourism governor/sites routes
router.get("/getAllGovernors", getAllGovernors);
router.get("/getGovernorById/:id", getGovernorById);
router.post("/addSite", createSite);
router.get("/getSite", getSite);
router.post("/addSite/:id", createSite);
router.get("/getSite/:id", getSite);
router.get("/getAllSites", getAllSites);
router.put("/updateSite", updateSite);
router.delete("/deleteSite/:id", deleteSite);
router.get("/getMySites/:id", getMySites);
router.get("/getMySites/:governorID", getMySites);
router.put("/changePasswordGovernor/:id", changePasswordGovernor);
router.get("/getPassword", getPassword);
router.post("/loginGovernor", loginGovernor);

// router.post("/addGov", createGov);

module.exports = router;
