const express = require("express");
const {
  createTourist,
  getTourists,
  getTourist,
  deleteTourist,
  updateTourist,
} = require("../Controllers/touristController");
const router = express.Router();

//GET all tourists
router.get("/", getTourists);

//GET a single tourist
router.get("/:id", getTourist);

//POST a new tourist
router.post("/", createTourist);

//DELETE a tourist
router.delete("/:id", deleteTourist);

//UPDATE a tourist
router.patch("/:id", updateTourist);

module.exports = router;