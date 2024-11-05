const express = require('express');
const router = express.Router();

const {filterActivities} = require ("../Controller/activityController");
const{filterItineraries,filterByPreferenceItineraries}= require('../Controller/guideController');
const {filterByTags } = require('../Controller/governorController');
const{filterProduct} = require('../Controller/AdminController');
const{filterItineraryRating,filterActivityByBudget,filterItineraryByBudget,filterByLanguage,filterByDate}
 = require("../Controller/guestController");


router.get("/filterActivities",filterActivities);
router.get("/filterByTags/:id",filterByTags);
router.get("/itineraryFilterLanguage",filterByLanguage);
router.get("/filterByDate",filterByDate);
router.get("/filterActivityByBudget",filterActivityByBudget);
router.get('/filterProductPrice/:price', filterProduct)
router.get("/itineraryFilterRating",filterItineraryRating);
router.get("/itineraryFilterBudget",filterItineraryByBudget);
router.get("/itineraryFilter",filterItineraries);
router.get("/filterByPreferenceItineraries/:id",filterByPreferenceItineraries);
router.get("/filterByTags/:id",filterByTags);

module.exports = router;