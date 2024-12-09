const express = require("express");
const router = express.Router();

const {
  getAllAdmin,
  createAdmin,
  deleteAdmin,
  getAllGoverner,
  createGoverner,
  deleteGoverner,
  getAllPreferenceTag,
  getPreferenceTag,
  createPreferenceTag,
  deletePreferenceTag,
  updatePreferenceTag,
  getAllActivityCategory,
  getActivityCategory,
  createActivityCategory,
  deleteActivityCategory,
  updateActivityCategory,
  createProduct,
  getAllProducts,
  getAllProductIds,
  searchProductbyName,
  updateProduct,
  changePasswordAdmin,
  getAllComplaints,
  getComplaint,
  updateComplaint,
  replyComplaint,
  deleteTourist,
  deleteGuide,
  deleteCompany,
  deleteSeller,
  acceptAdvertiser,
  acceptSeller,
  acceptTourGuide,
  rejectAdvertiser,
  rejectSeller,
  rejectTourGuide,
  sortComplaintsByDate,
  filterComplaintsByStatus,
  getUploadedDocuments,
  getPassword,
  getQuantity,
  archiveProduct,
  unarchiveProduct,
  uploadPicture,
  markItineraryInappropriate,
  createTransportation,
  totalProductRevenue,
  totalItineraryRevenue,
  totalActivityRevenue,
  markActivityInappropriate,
  countTotalUsers,
  getUsersPerMonth,
  createPromoCode,
  getAllPromoCodes,
  deletePromoCode,
  filterRevenueByProduct,
  getNotificationsAdmin,
  getUploadedDocumentsByID,
  markActivityAppropriate,
  markItineraryAppropriate,
  getMonthlyRevenue,
  filterRevenueByDate,
  getAdmin,
  getPromoCodeByCode,
} = require("../Controller/AdminController");

router.get("/GetAllAdmin", getAllAdmin);
router.post("/CreateAdmin", createAdmin);
router.get("/getAdmin/:id", getAdmin);
router.delete("/DeleteAdmin/:id", deleteAdmin);
router.put("/changePasswordAdmin/:id", changePasswordAdmin),
  router.get("/GetAllGoverner", getAllGoverner);
router.post("/CreateGoverner", createGoverner);
router.delete("/DeleteGoverner/:id", deleteGoverner);
router.get("/GetAllPreferenceTag", getAllPreferenceTag);
router.get("/GetPreferenceTag/:id", getPreferenceTag);
router.post("/CreatePreferenceTag", createPreferenceTag);
router.delete("/DeletePreferenceTag/:id", deletePreferenceTag);
router.put("/UpdatePreferenceTag/:id", updatePreferenceTag);
router.get("/GetAllActivityCategory/", getAllActivityCategory);
router.get("/GetActivityCategory/:id", getActivityCategory);
router.post("/CreateActivityCategory", createActivityCategory);
router.delete("/DeleteActivityCategory/:id", deleteActivityCategory);
router.put("/UpdateActivityCategory/:id", updateActivityCategory);
router.get("/GetAllProducts", getAllProducts);
router.get("/GetProductsIDs", getAllProductIds);
router.get("/getPassword", getPassword);

//post a new product
router.post("/CreateProduct", createProduct);

//search a product by its name
router.get("/SearchProductName", searchProductbyName);

// update a product
router.put("/EditProduct", updateProduct);

//get All Complaints
router.get("/Complaint", getAllComplaints);

//sort single Complaint
router.get("/Complaint/:id", getComplaint);

//update Complaint status
router.put("/Complaint/:id", updateComplaint);

//reply to a Complaint
router.put("/replyComplaint/:id", replyComplaint);

router.delete("/deleteTourist/:id", deleteTourist);
router.delete("/deleteGuide/:id", deleteGuide);
router.delete("/deleteCompany/:id", deleteCompany);
router.delete("/deleteSeller/:id", deleteSeller);

//sort and filter for the complaint
router.get("/ComplaintsSortByDate", sortComplaintsByDate);
router.get("/ComplaintsFilterByStatus", filterComplaintsByStatus);

//view uploaded documents
router.get("/uploaded-documents", getUploadedDocuments);
router.get("/uploaded-documents-by-id/:id", getUploadedDocumentsByID);

// accept or reject user
router.put("/acceptAdvertiser/:id", acceptAdvertiser);
router.put("/acceptSeller/:id", acceptSeller);
router.put("/acceptTourGuide/:id", acceptTourGuide);

router.put("/rejectAdvertiser/:id", rejectAdvertiser);
router.put("/rejectSeller/:id", rejectSeller);
router.put("/rejectTourGuide/:id", rejectTourGuide);

//archive a product
router.put("/archiveProduct", archiveProduct);

//unarchive a product
router.put("/unarchiveProduct", unarchiveProduct);

//upload product image
router.put("/uploadPicture", uploadPicture);

// view product's available quantity
router.get("/getQuantity", getQuantity);

//mark Itinerary Inappropriate
router.put("/markItineraryInappropriate/:id", markItineraryInappropriate);
router.put("/markItineraryAppropriate/:id", markItineraryAppropriate);
//mark Itinerary Inappropriate
router.put("/markActivityInappropriate/:id", markActivityInappropriate);
router.put("/markActivityAppropriate/:id", markActivityAppropriate);
//post a new transportation
router.post("/createTransportation", createTransportation);

//products revenue
router.get("/productrevenue", totalProductRevenue);

//itineray revenue
router.get("/itineraryrevenue", totalItineraryRevenue);

//itineray revenue
router.get("/activityrevenue", totalActivityRevenue);

//count users
router.get("/countUsers", countTotalUsers);

//count users per month
router.get("/getUsersPerMonth", getUsersPerMonth);

//promoCode
router.get("/getPromoCodes", getAllPromoCodes);
router.post("/createPromoCode", createPromoCode);
router.delete("/deletePromoCode/:id", deletePromoCode);

//count users per month
router.get("/filterRevenueByProduct/:productId", filterRevenueByProduct);

router.get("/getNotificationsAdmin", getNotificationsAdmin);

router.get("/getMonthlyRevenue", getMonthlyRevenue);

router.get("/filterRevenueByDate", filterRevenueByDate);

module.exports = router;
