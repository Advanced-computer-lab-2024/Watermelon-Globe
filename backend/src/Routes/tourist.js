  const express = require("express");
  const router = express.Router();

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
    getTouristComplaints,
    getPassword,
    bookFlight,
    redeemPoints,
    addPoints,
    bookHotel
    
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

  router.put("/changePasswordTourist/:id",changePasswordTourist);
  router.put("/updateRating/:id", updateRating);

  //Get all products
  router.get('/GetAllProducts', getAllProducts)

  //search a product 
  router.get('/searchProductName', searchProductbyName)

router.put('/buyProduct/:touristId/:productId',buyProduct);

router.get('/getPurchasedProducts/:touristId',getPurchasedProducts)

// router.get("/myComplaints/:touristId", getTouristComplaints);

router.get("/getPassword",getPassword);

router.post("/bookFlight/:touristId" , bookFlight);

router.post("bookHotel/:touristId", bookHotel)
  

router.get("/myComplaints/:touristId", getTouristComplaints);

router.put("/redeemPoints/:id",redeemPoints);
router.put("/addPoints/:id",addPoints);

  module.exports = router;
