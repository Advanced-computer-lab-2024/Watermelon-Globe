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
  requestDeletionTourist,
  getTouristComplaints,
  getPassword,
  bookFlight,
  redeemPoints,
  addPoints,
  bookHotel,
  BookedActivities,
  BookedItineraries,
  updateLoyaltyPoints,
  getHotelBookingsByTouristId,
  getFlightBookingsByTouristId,
  deleteActivity,
  deleteItinerary,
  getMyCompletedItineraries,
  rateItinerary,
  commentOnItinerary,
  rateTourGuide,
  commentOnTourGuide,
  createActivityBooking,
  getAllActivityBookings,
  getMyCompletedActivities,
  rateActivity,
  commentOnActivity,
  getAllTransportations,
  getTransportation,
  bookTransportation,
  addProductToCart,
  removeProductFromCart,
  changeCartItemQuantity,
  viewCart,
  updateAddress,
  viewAllOrders,
  viewOrderDetails,
  cancelOrder,
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
//router.post("/Complaint", fileComplaint);
router.post("/Complaint/:touristId", fileComplaint);
// 672e8691b1734606b4982fc2

router.put("/changePasswordTourist/:id", changePasswordTourist);
router.put("/updateRating/:id", updateRating);

//Get all products
router.get('/GetAllProducts', getAllProducts)

//search a product 
router.get('/searchProductName', searchProductbyName)

router.put('/buyProduct/:touristId/:productId', buyProduct);

router.get('/getPurchasedProducts/:touristId', getPurchasedProducts)

router.put('/requestDeletionTourist/:id', requestDeletionTourist);


// router.get("/myComplaints/:touristId", getTouristComplaints);

router.get("/getPassword", getPassword);

router.post("/bookFlight/:touristId", bookFlight);

router.post("/bookHotel/:touristId", bookHotel);

router.get("/getHotelBookingsByTouristId/:touristId", getHotelBookingsByTouristId);
router.get("/getFlightBookingsByTouristId/:touristId", getFlightBookingsByTouristId);


router.get("/myComplaints/:touristId", getTouristComplaints);

router.put("/redeemPoints/:id", redeemPoints);
router.put("/addPoints/:id", addPoints);

router.get('/bookedActivities/:id/', BookedActivities);
router.get('/BookedItineraries/:id/', BookedItineraries);


router.put('/updateLoyaltyPoints/:id', updateLoyaltyPoints)

router.delete('/deleteActivity/:touristId/:activityId', deleteActivity);
router.delete('/deleteItinerary/:touristId/:itineraryId', deleteItinerary);

//sprint 2
router.get('/getMyCompletedItineraries/:buyerId', getMyCompletedItineraries);

router.post('/itineraries/:itineraryId/rate', rateItinerary);
router.post('/itineraries/:itineraryId/comment', commentOnItinerary);

// Route to rate a tour guide
router.post('/tourGuide/:tourGuideId/rate', rateTourGuide);

// Route to comment on a tour guide
router.post('/tourGuide/:tourGuideId/comment', commentOnTourGuide);

router.post('/createActivityBooking', createActivityBooking);
router.get('/getAllActivityBookings', getAllActivityBookings);
router.get('/getMyCompletedActivities/:touristId', getMyCompletedActivities);

router.post('/activities/:activityId/rate', rateActivity);
router.post('/activities/:activityId/comment', commentOnActivity);

router.get('/getAllTransportations', getAllTransportations);

router.get('/getTransportation/:id', getTransportation);

router.put('/bookTransportation/:id', bookTransportation);

router.post('/addProductToCart/:id', addProductToCart);

router.delete('/removeProductFromCart/:id', removeProductFromCart);

router.put('/changeCartItemQuantity/:id', changeCartItemQuantity);

router.get('/viewCart/:id', viewCart);

router.put('/updateAddress/:id', updateAddress);

router.get('/viewAllOrders/:id', viewAllOrders);

router.get('/viewOrderDetails/:touristId/:orderId', viewOrderDetails);

router.put('/cancelOrder/:touristId/:orderId', cancelOrder);


module.exports = router;
