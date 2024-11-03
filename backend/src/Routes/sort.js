const express = require('express');
const router = express.Router();

const {sortByPriceActivity,sortByRatingsActivity} = require ("../Controller/activityController");
const guideController = require('../Controller/guideController'); // Import the controller
const{sortProducts} = require('../Controller/adminController')


router.get("/sortByPrice",guideController.sortByPrice);
router.get("/sortByRating",guideController.sortByRatings);
router.get("/sortByPriceActivity",sortByPriceActivity);
router.get("/sortByRatingActivity",sortByRatingsActivity);
router.get('/sortProducts', sortProducts)

module.exports = router;

