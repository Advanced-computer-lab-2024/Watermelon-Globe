const express = require("express");
const {
  createSeller,
  getAllSellers,
  getSeller,
  deleteSeller,
  updateSeller,
  createProduct,
  getAllProducts,
  searchProductbyName,
  updateProduct,
  sortProducts,
  updateRatingProduct,
  changePasswordSeller,
  reviewProduct,
  acceptTermsAndConditions,
  getProductById,
  requestDeletionSeller
} = require("../Controller/SellerController");

const router = express.Router();

//////////////// Seller ////////////////

//Get all sellers
router.get("/GetAllSeller", getAllSellers);

//Get single seller
router.get("/GetSeller/:id", getSeller);

//post a new seller
router.post("/CreateSeller", createSeller);

//delete a seller
router.delete("/DeleteSeller/:id", deleteSeller);

//update a seller
router.put("/UpdateSeller/:id", updateSeller);

router.put("/changePasswordSeller/:id", changePasswordSeller);

//////////////// Products ////////////////

//Get all products
router.get("/GetAllProducts", getAllProducts);

//Get single product

//post a new product
router.post("/CreateProduct", createProduct);

//delete a product
router.get("/searchProductName", searchProductbyName);

//update a product
router.put("/editProduct", updateProduct);

//accept terms and conditions
router.put("/acceptTermsAndConditions/:id", acceptTermsAndConditions);

//sort Products according to Ratings
router.get("/sortProducts", sortProducts);

router.put("/updateRatingProduct/:id", updateRatingProduct);

router.put("/reviewProduct/:ReviewerId/:ProductId", reviewProduct);

router.post("/getProductById",getProductById);

router.put("/requestDeletionSeller/:id", requestDeletionSeller);

module.exports = router
