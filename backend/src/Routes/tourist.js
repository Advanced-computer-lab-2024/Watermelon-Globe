const express = require("express");
const router = express.Router();

const {
<<<<<<< Updated upstream
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
  getPurchasedProducts
} = require("../Controller/touristController");
=======
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
    getPassword
  } = require("../Controller/touristController");
  
  //GET all tourists
  router.get("/getTourists", getTourists);
>>>>>>> Stashed changes

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

router.get("/myComplaints/:touristId", getTouristComplaints);

router.get("/getPassword",getPassword);
module.exports = router;
<<<<<<< Updated upstream
=======
  //get own complaints
  

  

>>>>>>> Stashed changes
