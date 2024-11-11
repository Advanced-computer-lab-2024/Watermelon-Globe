const express = require("express");
const router = express.Router();
const touristController = require("../Controller/touristController");

const {
  createTourist,
  getTourists,
  getTourist,
  deleteTourist,
  updateTourist,
  fileComplaint,
  changePasswordTourist,
  updateRating,
  getAllProducts,
  searchProductbyName,
  buyProduct,
  getPurchasedProducts,
  getMyCompletedItineraries,
  rateItinerary,
  commentOnItinerary,
  rateTourGuide,
  commentOnTourGuide,
  createActivityBooking,
  getAllActivityBookings,
  getMyCompletedActivities,
  rateActivity,
  commentOnActivity
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

//POST a new complaint
router.post("/Complaint", fileComplaint);

router.put("/changePasswordTourist/:id",changePasswordTourist);
router.put("/updateRating/:id", updateRating);

//Get all products
router.get('/GetAllProducts', getAllProducts)

//search a product 
router.get('/searchProductName', searchProductbyName)

router.put('/buyProduct/:touristId/:productId',buyProduct);

router.get('/getPurchasedProducts/:touristId',getPurchasedProducts)


//sprint 2
router.get('/getMyCompletedItineraries/:buyerId',getMyCompletedItineraries);

router.post('/itineraries/:itineraryId/rate',rateItinerary);
router.post('/itineraries/:itineraryId/comment', commentOnItinerary);

// Route to rate a tour guide
router.post('/tourGuide/:tourGuideId/rate',rateTourGuide);

// Route to comment on a tour guide
router.post('/tourGuide/:tourGuideId/comment',commentOnTourGuide);

router.post('/createActivityBooking', createActivityBooking);
router.get('/getAllActivityBookings', getAllActivityBookings);
router.get('/getMyCompletedActivities/:touristId', getMyCompletedActivities);

router.post('/activities/:activityId/rate', rateActivity);
router.post('/activities/:activityId/comment', commentOnActivity);



module.exports = router;
