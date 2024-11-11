const express = require("express");
const {
  createSeller,
  getAllSellers,
  getSeller,
  deleteSeller,
  updateSeller,
  createProduct,
  getAllProducts,
  getAllProductIds,
  searchProductbyName,
  updateProduct,
  getSellerStatus,
  sortProducts,
  updateRatingProduct,
  changePasswordSeller,
  reviewProduct,
  acceptTermsAndConditions,
  getProductById,
  getProductReviews,
  getPassword,
  getQuantity,
  archiveProduct,
  unarchiveProduct,
  getProductImageByName
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

router.get("/getPassword",getPassword);

router.get('/sellerStatus/:id', getSellerStatus);

//////////////// Products ////////////////

//Get all products
router.get("/GetAllProducts", getAllProducts);

//Get all products ids
router.get("/GetProductsIDs", getAllProductIds);

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

router.get("/getProductReviews/:productId",getProductReviews);

module.exports = router
//archive a product
router.put('/archiveProduct', archiveProduct)

//unarchive a product
router.put('/unarchiveProduct', unarchiveProduct)

//upload product image
router.get('/uploadImage',getProductImageByName)


// view product's available quantity
router.get('/getQuantity',getQuantity);

module.exports = router;
