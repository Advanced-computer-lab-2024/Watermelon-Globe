const express = require('express');
const router = express.Router();

//guest imports
const {createTourist,createTourguide, createAdvertiser,getTourists,
    filterByLanguage,filterByDate,updateTourist,filterActivityByBudget,filterItineraryRating,getItineraryDetails} = require("../Controller/guestController"); 

router.post("/addTourist",createTourist);
router.post("/addTourguide", createTourguide);
router.get("/getTourists",getTourists);

router.put("/updateTourist/:id",updateTourist);
router.post("/addAdvertiser", createAdvertiser);

module.exports = router;