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
  requestDeletionSeller,
  getProductReviews,
  getPassword,
  getQuantity,
  archiveProduct,
  unarchiveProduct,
  uploadPicture,
  getProductsBySeller,
  frontendSellersTable,
  frontendPendingSellersTable,
  getProducts,
  deleteProductById,
} = require("../Controller/SellerController");

const router = express.Router();

//////////////// Seller ////////////////
router.get("/frontendDatatable", frontendSellersTable);
router.get("/frontendPendingSellersTable", frontendPendingSellersTable);
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

router.get("/getPassword", getPassword);

router.get("/sellerStatus/:id", getSellerStatus);

//////////////// Products ////////////////

router.get("/getProducts", getProducts);
//Get all products
router.get("/GetAllProducts", getAllProducts);

router.get("/getProductsBySeller/:sellerId", getProductsBySeller);
//Get all products ids
router.get("/GetProductsIDs", getAllProductIds);

//post a new product
router.post("/CreateProduct/:sellerId", createProduct);

router.delete("/deleteProductById/:id", deleteProductById);
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

router.post("/getProductById", getProductById);

// router.get("/getProductById/:id",getProductById);
router.put("/requestDeletionSeller/:id", requestDeletionSeller);
router.get("/getProductReviews/:productId", getProductReviews);

//archive a product
router.put("/archiveProduct/:id", archiveProduct);

//unarchive a product
router.put("/unarchiveProduct/:id", unarchiveProduct);

//upload product image
router.put("/uploadPicture", uploadPicture);

// view product's available quantity
router.get("/getQuantity/:id", getQuantity);

module.exports = router;
