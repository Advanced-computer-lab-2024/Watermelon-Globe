const express = require("express");
const router = express.Router();

const {
  createTourist,
  getTourists,
  getTourist,
  deleteTourist,
  updateTourist,
  changePasswordTourist
} = require("../Controller/touristController");

//GET all tourists
router.get("/getTourists", getTourists);

//GET a single tourist
router.get("/getTourist/:id", getTourist);

//POST a new tourist
router.post("/createTourist", createTourist);

//DELETE a tourist
router.delete("/deleteTourist/:id", deleteTourist);

//UPDATE a tourist
router.put("/updateTourist/:id", updateTourist);

router.put("/changePasswordTourist/:id",changePasswordTourist);

module.exports = router;
