const express = require('express');
const router = express.Router();

const touristItineraryController = require('../Controller/touristItineraryController')

router.post('/createChildItinerary', touristItineraryController.createChildItinerary);
router.get('/getChildItinerary/:id', touristItineraryController.getChildItineraryById);
router.get('/getAllChildIitineraries', touristItineraryController.getAllChildItineraries);
router.put('/updateChildItinerary/:id', touristItineraryController.updateChildItineraryById);
router.delete('/deleteChildItinerary/:id', touristItineraryController.deleteChildItineraryById);

//create activity booking
router.post('/createActivityBooking', touristItineraryController.createActivityBooking);
router.put('/cancelActivityBooking/:id', touristItineraryController.cancelActivityBooking);

router.put('/cancelItineraryBooking/:id', touristItineraryController.cancelChildItinerary);

module.exports = router;
